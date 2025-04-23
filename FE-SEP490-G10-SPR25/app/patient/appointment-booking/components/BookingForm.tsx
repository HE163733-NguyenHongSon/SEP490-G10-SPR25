// BookingForm.tsx
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useCallback, useState } from "react";
import {
  setShowBookingForm,
  setCurrentStep,
  setServices,
  setServiceId,
  setIsSubmitting,
  setShowConfirmModal,
  setSpecialties,
  setSpecialtyId,
  setDoctors,
  setDoctorId,
  setSelectedDate,
  setSelectedTime,
  setSelectedPatient,
  setSuggestionData,
  setIsShowRestoreSuggestion,
} from "../redux/bookingSlice";
import PatientInfor from "./PatientInfor";
import BookingInfor from "./BookingInfor";
import BookingConfirmation from "./BookingConfirmation";
import BookingStepper from "./BookingStepper";
import { doctorScheduleService } from "@/services/doctorScheduleService";
import { handleVNPayPayment } from "@/services/vnPayService";

const BookingForm = () => {
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);

  const {
    isShowBookingForm,
    currentStep,
    selectedPatient,
    selectedDate,
    selectedTime,
    symptoms,
    priorExaminationImg,
    services,
    serviceId,
    doctorId,
    isSubmitting,
    isShowConfirmModal,
  } = useSelector((state: RootState) => state.booking);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(setIsSubmitting(true));

      try {
        const schedules =
          await doctorScheduleService.getAvailableSchedulesByServiceId(
            serviceId ?? ""
          );
        const matchedSchedule = schedules.find(
          (s) =>
            s.doctorId === doctorId &&
            s.appointmentDate === `${selectedDate}T${selectedTime}`
        );

        const amount = services.find((s) => s.serviceId === serviceId)?.price;

        const bookingPayload = {
          paymentId: 0,
          payerId: selectedPatient?.userId,
          reservation: {
            patientId: selectedPatient?.userId,
            doctorScheduleId:
              matchedSchedule?.doctorScheduleId?.toString() || "",
            reason: symptoms,
            priorExaminationImg: priorExaminationImg || "",
            appointmentDate: matchedSchedule?.appointmentDate,
            createdByUserId: selectedPatient?.userId || "",
            updatedByUserId: selectedPatient?.userId || "",
          },
          paymentMethod: "VNPay",
          amount,
        };

        const bookingRes = await handleVNPayPayment(bookingPayload);
        if (
          !bookingRes ||
          typeof bookingRes !== "object" ||
          !("ok" in bookingRes)
        ) {
          throw new Error("Không thể lưu lịch hẹn.");
        }
      } catch (err) {
        console.error("Lỗi khi đặt lịch:", err);
        alert("Đã xảy ra lỗi khi đặt lịch.");
      } finally {
        dispatch(setIsSubmitting(false));
      }
    },
    [
      dispatch,
      selectedPatient,
      doctorId,
      serviceId,
      selectedDate,
      selectedTime,
      symptoms,
      priorExaminationImg,
      services,
    ]
  );

  const handleBack = useCallback(() => {
    if (currentStep === 1) {
      dispatch(setShowConfirmModal(true));
    } else {
      if (currentStep === 2) dispatch(setServices([]));
      dispatch(setCurrentStep(currentStep - 1));
    }
  }, [dispatch, currentStep]);

  const confirmCancel = useCallback(() => {
    dispatch(setShowBookingForm(false));
    dispatch(setShowConfirmModal(false));
    dispatch(setCurrentStep(1));
    dispatch(setServices([]));
    dispatch(setServiceId(""));
    dispatch(setIsSubmitting(false));
    dispatch(setSpecialties([]));
    dispatch(setSpecialtyId(0));
    dispatch(setDoctors([]));
    dispatch(setDoctorId(""));
    dispatch(setSelectedDate(""));
    dispatch(setSelectedTime(""));
    dispatch(setSelectedPatient(null));
    dispatch(setSuggestionData(null));
    dispatch(setIsShowRestoreSuggestion(false));
  }, [dispatch]);

  if (!isShowBookingForm) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isMounted ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => dispatch(setShowConfirmModal(true))}
      />
      <div
        className={`relative z-50 top-12 w-[90%] md:w-2/3 lg:w-1/2 h-[90vh] bg-white rounded-2xl shadow-2xl p-6 flex flex-col transition-opacity duration-300 ${
          isMounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBack}
            className="text-cyan-600 hover:text-cyan-800 font-semibold flex items-center"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Quay lại
          </button>
          {currentStep < 3 && (
            <button
              onClick={() => dispatch(setCurrentStep(currentStep + 1))}
              className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition"
            >
              Tiếp theo
            </button>
          )}
          {currentStep === 3 && (
            <button
              type="submit"
              onClick={() =>
                handleSubmit(
                  new Event(
                    "submit"
                  ) as unknown as React.FormEvent<HTMLFormElement>
                )
              }
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-md transition text-white ${
                isSubmitting
                  ? "bg-cyan-300 cursor-not-allowed"
                  : "bg-cyan-600 hover:bg-cyan-700"
              }`}
            >
              {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt lịch"}
            </button>
          )}
        </div>

        <BookingStepper />

        <div className="flex-1 mt-6 min-h-[400px] overflow-y-auto">
          {currentStep === 1 && <PatientInfor />}
          {currentStep === 2 && <BookingInfor />}
          {currentStep === 3 && <BookingConfirmation />}
        </div>
      </div>

      {isShowConfirmModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-xl p-8 w-[90%] max-w-[550px] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Bạn có chắc chắn muốn hủy đặt lịch?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Thao tác này sẽ xóa tất cả thông tin bạn đã nhập...
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => dispatch(setShowConfirmModal(false))}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:underline"
              >
                Không
              </button>
              <button
                onClick={confirmCancel}
                className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600"
              >
                Hủy đặt lịch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
