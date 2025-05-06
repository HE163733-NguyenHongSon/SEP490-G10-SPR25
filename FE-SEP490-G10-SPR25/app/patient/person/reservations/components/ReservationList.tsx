/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from "react";
import Image from "next/image";
import moment from "moment";
import ReactDOMServer from "react-dom/server";
import { formatTimeWithPeriod } from "@/common/utils/timeUtils";
import reservationService from "@/common/services/reservationService";
import { Modal } from "./Modal";
import CancelReservationMessage from "./CancelReservationMessage";
import { emailService } from "@/common/services/emailService";
import { paymentService } from "@/common/services/paymentService";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useUser } from "@/common/contexts/UserContext";
interface ReservationListProps {
  items: IReservation[];
  onCancelSuccess: (reservationId: string) => void;
  onCancelFailed?: (error: Error) => void;
}

const ReservationList: React.FC<ReservationListProps> = ({
  items,
  onCancelSuccess,
  onCancelFailed,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [reservationToCancel, setReservationToCancel] =
    useState<IReservation | null>();

  const [cancellationReason, setCancellationReason] = useState("");
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
  const [cancelInfo, setCancelInfo] = useState<Record<string, boolean>>({});
  const [cancelCountThisMonth, setCancelCountThisMonth] = useState<number>(0);
  const { user } = useUser();
  useEffect(() => {
    const checkAllCancelConditions = async () => {
      const { count } = await reservationService.getCancelCountThisMonth(
        user?.userId
      );
      console.log("Cancel count this month:", count);
      setCancelCountThisMonth(count);
      const updatedMap: Record<string, boolean> = {};

      for (const reservation of items) {
        const now = moment();
        const created = moment(reservation.createdDate);

        const canCancel =
          count < 3 &&
          reservation.status === "Đang chờ" &&
          now.diff(created, "hours", true) <= 2;

        updatedMap[reservation.reservationId] = canCancel;
      }
      setCancelInfo(updatedMap);
    };

    checkAllCancelConditions();
  }, [items, reservationToCancel?.patient.userId]);

  const handleModalConfirm = async (reason: string) => {
    if (!reservationToCancel) return;

    try {
      await reservationService.updateReservationStatus({
        reservationId: reservationToCancel.reservationId,
        cancellationReason: reason,
        status: "Đã hủy",
        updatedByUserId: reservationToCancel.patient.userId || "",
        updatedDate: new Date().toISOString(),
      });
      await paymentService.updatePaymentStatusByReservationId(
        Number(reservationToCancel.reservationId),
        "Đang xử lý"
      );
      const htmlMessage = ReactDOMServer.renderToStaticMarkup(
        <CancelReservationMessage
          userName={user?.userName}
          reservation={reservationToCancel}
          cancelledCountThisMonth={cancelCountThisMonth}
        />
      );
      await emailService.sendEmail({
        toEmail: user?.email || "",
        subject: "Cảnh báo hủy hẹn lịch!",
        message: htmlMessage,
      });
      await onCancelSuccess(reservationToCancel.reservationId);
    } catch (error) {
      onCancelFailed?.(error as Error);
    } finally {
      setShowModal(false);
      setCancellationReason("");
      setReservationToCancel(null);
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setCancellationReason("");
    setReservationToCancel(null);
  };

  return (
    <>
      {items.length > 0 ? (
        <div className="reservation-list">
          <table className="border-separate border border-gray-300 rounded-md w-full">
            <thead>
              <tr>
                {[
                  "Mã đặt lịch",
                  "Thông tin đặt lịch",
                  "Lý do đặt lịch",
                  "Ngày tạo",
                  items.some((item) => item.status === "Đã hủy")
                    ? "Lý do hủy"
                    : "Ảnh phác đồ điều trị trước",
                  "Trạng thái thanh toán",
                  "Hành động",
                ].map((header) => (
                  <th
                    key={header}
                    className="border border-gray-300 rounded-md font-medium px-4 py-2"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {items.map((reservation) => (
                <tr key={reservation.reservationId}>
                  <td className="border border-gray-300 px-4">
                    {reservation.reservationId}
                  </td>

                  <td className="border border-gray-300 rounded-md">
                    <div className="grid grid-cols-2 py-3 px-5">
                      <div className="service col-span-1 gap-2 grid grid-cols-3 border-r-2 border-gray-300">
                        <div className="col-span-1 flex justify-center items-center">
                          <div className="w-[100px] h-[50px] overflow-hidden rounded-lg">
                            <Image
                              className="border border-gray-300 rounded-md object-cover w-full h-full"
                              width={100}
                              height={50}
                              src={`${imgUrl}/${reservation.doctorSchedule.serviceImage}`}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="col-span-2 flex justify-center flex-col">
                          <p className="text-base w-fit">
                            {reservation.doctorSchedule.serviceName}
                          </p>
                          <p className="text-sm font-semibold">
                            {reservation.doctorSchedule.servicePrice}
                          </p>
                        </div>
                      </div>

                      <div className="col-span-1 pl-4">
                        <p>
                          Khám bởi bác sĩ{" "}
                          <span className="font-semibold">
                            {reservation.doctorSchedule.doctorName}
                          </span>
                        </p>
                        <p>
                          Khám vào{" "}
                          <span className="font-semibold">
                            {new Date(
                              reservation.appointmentDate
                            ).toLocaleDateString("vi-VN")}
                          </span>{" "}
                          từ{" "}
                          <span className="font-semibold">
                            {formatTimeWithPeriod(
                              reservation.doctorSchedule.slotStartTime
                            )}
                          </span>{" "}
                          đến{" "}
                          <span className="font-semibold">
                            {formatTimeWithPeriod(
                              reservation.doctorSchedule.slotEndTime
                            )}
                          </span>{" "}
                          tại{" "}
                          <span className="font-semibold">
                            {reservation.doctorSchedule.roomName}
                          </span>
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="border border-gray-300 px-4">
                    {reservation.reason}
                  </td>
                  <td className="border border-gray-300 px-4">
                    {(() => {
                      const date = new Date(reservation.createdDate);
                      const day = date.getDate().toString().padStart(2, "0");
                      const month = (date.getMonth() + 1)
                        .toString()
                        .padStart(2, "0");
                      const year = date.getFullYear();
                      const hour = date.getHours();
                      const minute = date
                        .getMinutes()
                        .toString()
                        .padStart(2, "0");
                      const period =
                        hour < 12 ? "sáng" : hour < 18 ? "chiều" : "tối";
                      const hourStr = hour.toString().padStart(2, "0");
                      return `${day}-${month}-${year} ${hourStr}:${minute} ${period}`;
                    })()}
                  </td>

                  <td className="border border-gray-300 px-4 ">
                    <div className=" overflow-hidden rounded-md  flex items-center justify-center">
                      {reservation.status === "Đã hủy" ? (
                        <div className="flex items-center justify-center w-full h-full">
                          <span className="text-sm text-gray-700 text-center px-2">
                            {reservation.cancellationReason ||
                              "Không có lý do hủy"}
                          </span>
                        </div>
                      ) : reservation.priorExaminationImg ? (
                        <Zoom>
                          <img
                            className="object-cover w-30 h-20"
                            src={`${imgUrl}/${reservation.priorExaminationImg}`}
                            alt="Phác đồ điều trị"
                            width={120}
                            height={80}
                          />
                        </Zoom>
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <svg
                            className="w-6 h-6 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 3l18 18M4.5 4.5h15v15h-15v-15zm3 3l3 3 2-2 4 4"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="border border-gray-300 px-4 text-center   ">
                    {reservation.paymentStatus === "Đã thanh toán" ? (
                      <span className="inline-flex items-center text-green-600 font-medium">
                        <svg
                          className="w-5 h-5 mr-1 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Đã thanh toán
                      </span>
                    ) : reservation.paymentStatus === "Đang xử lý" ? (
                      <span className="inline-flex items-center text-yellow-500 font-medium">
                        <svg
                          className="w-5 h-5 mr-1 text-yellow-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4l3 3"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                        Đang xử lý
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-blue-500 font-medium">
                        <svg
                          className="w-5 h-5 mr-1 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                        Đã hoàn tiền
                      </span>
                    )}
                  </td>

                  <td className="border border-gray-300 px-4">
                    <button
                      onClick={() => {
                        setReservationToCancel(reservation);
                        setShowModal(true);
                      }}
                      className={`px-4 py-1 rounded-full transition-all duration-200 ${
                        !cancelInfo[reservation.reservationId]
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white text-black border border-gray-300 hover:bg-cyan-600 hover:text-white"
                      }`}
                      disabled={!cancelInfo[reservation.reservationId]}
                    >
                      Hủy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && reservationToCancel && (
            <Modal
              message="Nhập lý do hủy lịch hẹn. "
              onConfirm={(reason) => handleModalConfirm(reason)}
              onCancel={handleModalCancel}
              onChangeReason={setCancellationReason}
              cancellationReason={cancellationReason}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500 space-y-4">
          <div className="bg-gray-100 rounded-full p-6 shadow-md">
            <svg
              className="w-14 h-14 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75h.008v.008H9.75V9.75zm0 4.5h.008v.008H9.75v-.008zM12 2.25c-5.385 0-9.75 4.365-9.75 9.75S6.615 21.75 12 21.75 21.75 17.385 21.75 12 17.385 2.25 12 2.25z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-600">
            Hiện tại chưa có lịch hẹn nào
          </h2>
          <p className="text-sm text-gray-400 max-w-md">
            Khi bạn có lịch hẹn, thông tin sẽ hiển thị tại đây. Hãy đặt lịch để
            được phục vụ nhanh chóng.
          </p>
        </div>
      )}
    </>
  );
};

export default ReservationList;
