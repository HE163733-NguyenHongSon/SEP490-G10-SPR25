

using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AutoMapper;
using Castle.Components.DictionaryAdapter.Xml;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace AppointmentSchedulingApp.Application.Services

{
    public class VnPayService : IVnPayService
    {
        private readonly IConfiguration _config;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public IReservationService _reservationService;
        private readonly IDistributedCache _cache;
        private readonly INotificationService _notificationService;

        public VnPayService(
            IConfiguration config,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IReservationService reservationService,
            IDistributedCache cache,
            INotificationService notificationService)
        {
            _config = config;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _reservationService = reservationService;
            _cache = cache;
            _notificationService = notificationService;
        }

        public async Task<string> CreatePaymentUrl(HttpContext context, PaymentDTO model)
        {
            string lockKey = $"hold_schedule_{model.Reservation.DoctorScheduleId}_{model.Reservation.AppointmentDate:yyyyMMddHHmm}";
            var existing = await _cache.GetStringAsync(lockKey);

            if (existing != null)
            {
                await _notificationService.NotifyScheduleConflictAsync(
                    model.Reservation.PatientId.ToString(),
                    "Lịch hẹn này đã được giữ chỗ. Vui lòng chọn thời gian khác.");

                throw new InvalidOperationException("Lịch hẹn đã được người khác chọn. Vui lòng thử lại với thời gian khác.");
            }


            await _cache.SetStringAsync(lockKey, "locked", new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
            });

            var tick = DateTime.Now.Ticks.ToString();

            var vnpay = new VnPayLibrary();
            vnpay.AddRequestData("vnp_Version", _config["VnPay:Version"]);
            vnpay.AddRequestData("vnp_Command", _config["VnPay:Command"]);
            vnpay.AddRequestData("vnp_TmnCode", _config["VnPay:TmnCode"]);
            vnpay.AddRequestData("vnp_Amount", ((int)(model.Amount * 100)).ToString());
            //Số tiền thanh toán. Số tiền không mang các ký tự phân tách thập phân, phần nghìn, ký tự tiền tệ. Để gửi số tiền thanh toán là 100,000 VND (một trăm nghìn VNĐ) thì merchant cần nhân thêm 100 lần (khử phần thập phân), sau đó gửi sang VNPAY là: 10000000

            vnpay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));
            vnpay.AddRequestData("vnp_CurrCode", _config["VnPay:CurrCode"]);
            vnpay.AddRequestData("vnp_IpAddr", Utils.GetIpAddress(context));
            vnpay.AddRequestData("vnp_Locale", _config["VnPay:Locale"]);

            string orderInfo = string.Join("|",
                model.PayerId,
                model.Reservation.PatientId,
                model.Reservation.DoctorScheduleId,
                model.Reservation.Reason ?? "",
                model.Reservation.AppointmentDate.ToString("yyyyMMddHHmmss"),
                model.Reservation.CreatedByUserId,
                model.Reservation.UpdatedByUserId


            ); vnpay.AddRequestData("vnp_OrderInfo", orderInfo);
            vnpay.AddRequestData("vnp_OrderType", "other"); //default value: other


            vnpay.AddRequestData("vnp_ReturnUrl", _config["VnPay:PaymentBackReturnUrl"]);

            vnpay.AddRequestData("vnp_TxnRef", tick); // Mã tham chiếu của giao dịch tại hệ thống của merchant. Mã này là duy nhất dùng để phân biệt các đơn hàng gửi sang VNPAY. Không được trùng lặp trong ngày

            var paymentUrl = vnpay.CreateRequestUrl(_config["VnPay:BaseUrl"], _config["VnPay:HashSecret"]);

            return paymentUrl;
        }

        public async Task<PaymentDTO> PaymentExecuteAsync(IQueryCollection collections)
        {
            var vnpay = new VnPayLibrary();

            // Lấy dữ liệu từ callback
            foreach (var (key, value) in collections)
            {
                if (!string.IsNullOrEmpty(key) && key.StartsWith("vnp_"))
                {
                    vnpay.AddResponseData(key, value.ToString());
                }
            }

            var vnp_orderId = Convert.ToInt64(vnpay.GetResponseData("vnp_TxnRef"));
            var vnp_TransactionId = Convert.ToInt64(vnpay.GetResponseData("vnp_TransactionNo"));
            var vnp_SecureHash = collections.FirstOrDefault(p => p.Key == "vnp_SecureHash").Value;
            var vnp_ResponseCode = vnpay.GetResponseData("vnp_ResponseCode");
            var vnp_Amount = decimal.Parse(vnpay.GetResponseData("vnp_Amount")) / 100;
            bool checkSignature = vnpay.ValidateSignature(vnp_SecureHash, _config["VnPay:HashSecret"]);

            string rawOrderInfo = vnpay.GetResponseData("vnp_OrderInfo");
            string decodedOrderInfo = Uri.UnescapeDataString(rawOrderInfo);
            var parts = decodedOrderInfo.Split('|');

            // Nếu chữ ký không hợp lệ
            if (!checkSignature)
            {
                return new PaymentDTO
                {
                    PaymentStatus = "Chữ ký không hợp lệ",
                    VnPayResponseCode = vnp_ResponseCode
                };
            }

            // Nếu giao dịch không thành công
            if (vnp_ResponseCode != "00")
            {
                if (parts.Length >= 5)
                {
                    int doctorScheduleId = int.Parse(parts[2]);
                    DateTime appointmentDate = DateTime.ParseExact(parts[4], "yyyyMMddHHmmss", null);
                    string lockKey = $"hold_schedule_{doctorScheduleId}_{appointmentDate:yyyyMMddHHmm}";
                    await _cache.RemoveAsync(lockKey);
                }

                return new PaymentDTO
                {
                    PaymentStatus = GetPaymentStatusMessage(vnp_ResponseCode),
                    VnPayResponseCode = vnp_ResponseCode,
                    Amount = vnp_Amount,
                    TransactionId = vnp_TransactionId.ToString(),
                    PaymentMethod = "VNPay"
                };
            }

            string finalLockKey = null;

            if (parts.Length >= 7)
            {
                int doctorScheduleId = int.Parse(parts[2]);
                DateTime appointmentDate = DateTime.ParseExact(parts[4], "yyyyMMddHHmmss", null);
                finalLockKey = $"hold_schedule_{doctorScheduleId}_{appointmentDate:yyyyMMddHHmm}";

                try
                {
                    await _unitOfWork.BeginTransactionAsync();

                    int payerId = int.Parse(parts[0]);
                    int patientId = int.Parse(parts[1]);
                    string reason = parts[3];
                    int createdByUserId = int.Parse(parts[5]);
                    int updatedByUserId = int.Parse(parts[6]);

                    var reservationDto = new AddedReservationDTO
                    {
                        PatientId = patientId,
                        DoctorScheduleId = doctorScheduleId,
                        Reason = reason,
                        AppointmentDate = appointmentDate,
                        CreatedByUserId = createdByUserId,
                        UpdatedByUserId = updatedByUserId
                    };

                    var reservation = _mapper.Map<Reservation>(reservationDto);
                    await _unitOfWork.ReservationRepository.AddAsync(reservation);
                    await _unitOfWork.CommitAsync();
                    await _reservationService.UpdatePriorExaminationImg(reservation.ReservationId, $"lichhen_{reservation.ReservationId}.jpg");

                    var payment = new Payment
                    {
                        PayerId = payerId,
                        ReservationId = reservation.ReservationId,
                        TransactionId = vnp_TransactionId.ToString(),
                        Amount = vnp_Amount,
                        PaymentMethod = "VNPay",
                        PaymentStatus = "Đã thanh toán"
                    };

                    await _unitOfWork.PaymentRepository.AddAsync(payment);
                    await _unitOfWork.CommitTransactionAsync();

                    return new PaymentDTO
                    {
                        ReservationId = reservation.ReservationId,
                        VnPayResponseCode = vnp_ResponseCode,
                        Amount = vnp_Amount,
                        PaymentStatus = "Giao dịch thành công",
                        TransactionId = vnp_TransactionId.ToString(),
                        PaymentMethod = "VNPay"
                    };
                }
                catch (Exception)
                {
                    await _unitOfWork.RollbackTransactionAsync();
                    throw;
                }
                finally
                {
                    if (!string.IsNullOrEmpty(finalLockKey))
                    {
                        await _cache.RemoveAsync(finalLockKey);
                    }
                }
            }

            return new PaymentDTO
            {
                PaymentStatus = "Thông tin đơn hàng không hợp lệ",
                VnPayResponseCode = vnp_ResponseCode
            };
        }


        private string GetPaymentStatusMessage(string responseCode)
        {
            return responseCode switch
            {
                "00" => "Giao dịch thành công",
                "24" => "Khách hàng hủy giao dịch",
                "75" => "Ngân hàng thanh toán đang bảo trì",
                "79" => "Nhập sai mật khẩu quá số lần quy định",
                _ => "Giao dịch không thành công"
            };
        }

    }
}
