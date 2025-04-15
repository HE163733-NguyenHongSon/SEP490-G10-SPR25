import React, { useState } from "react";
import Image from "next/image";
import moment from "moment";
import { formatTimeWithPeriod } from "@/utils/timeUtils";
import reservationService from "@/services/reservationService";
import { Modal } from "./Modal";

interface ReservationListProps {
  items: IReservation[];
  onCancelSuccess: (reservationId: string) => void;
  onCancelFailed?: (error: any) => void;
}

const ReservationList: React.FC<ReservationListProps> = ({
  items,
  onCancelSuccess,
  onCancelFailed,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [reservationToCancel, setReservationToCancel] =
    useState<IReservation | null>(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;

  const canCancel = async (reservation: IReservation): Promise<boolean> => {
    const { count } =
      await reservationService.getCancelledReservationsThisMonth(
        reservation.patient.userId
      );

    if (count >= 3 || reservation.status !== "Đang chờ") return false;

    const now = moment();

    // Gộp appointmentDate + startTime đúng định dạng
    const appointmentTime = moment(
      `${moment(reservation.appointmentDate).format("YYYY-MM-DD")} ${
        reservation.startTime
      }`,
      "YYYY-MM-DD hh:mm A"
    );

    const reservationTime = moment(
      reservation.createdDate,
      "DD/MM/YYYY HH:mm:ss"
    );

    const hoursUntilAppointment = appointmentTime.diff(now, "hours", true);
    const hoursSinceReservation = now.diff(reservationTime, "hours", true);

    return (
      hoursUntilAppointment >= 24 ||
      (hoursUntilAppointment < 24 && hoursSinceReservation <= 1)
    );
  };

  const handleCancel = async (reservation: IReservation) => {
    const isCancelable = await canCancel(reservation);

    if (!isCancelable) {
      onCancelFailed?.(
        new Error("Hủy thất bại vì bạn đã hủy quá 3 lần trên tháng !")
      );
      return;
    }

    setReservationToCancel(reservation);
    setShowModal(true);
  };

  const handleModalConfirm = async () => {
    if (!reservationToCancel) return;

    try {
      await reservationService.updateReservationStatus({
        reservationId: reservationToCancel.reservationId,
        cancellationReason,
        status: "Đã hủy",
      });
      onCancelSuccess(reservationToCancel.reservationId);
    } catch (error) {
      onCancelFailed?.(error);
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
    <div className="reservation-list">
      <table className="border-separate border border-gray-300 rounded-md w-full">
        <thead>
          <tr>
            {[
              "Mã đặt lịch",
              "Thông tin đặt lịch",
              "Lý do đặt lịch",
              "Ngày tạo",
              "Ngày cập nhật",
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
                  <div className="grid grid-cols-3 py-3 px-8">
                    <div className="service col-span-1 gap-2 grid grid-cols-3 border-r-2 border-gray-300">
                      <div className="col-span-1 flex justify-center items-center">
                        <div className="w-[100px] h-[50px] overflow-hidden rounded-lg">
                          <Image
                            className="border border-gray-300 rounded-md object-cover w-full h-full"
                            width={100}
                            height={50}
                            src={`${imgUrl}/${reservation.serviceImage}`}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col-span-2 flex justify-center flex-col">
                        <p className="text-base w-fit">
                          {reservation.serviceName}
                        </p>
                        <p className="text-sm font-semibold">
                          {reservation.servicePrice} VND
                        </p>
                      </div>
                    </div>

                  <div className="col-span-2 pl-4">
                    <p>
                      Khám bởi bác sĩ{" "}
                      <span className="font-semibold">
                        {reservation.doctorName}
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
                        {formatTimeWithPeriod(reservation.startTime)}
                      </span>{" "}
                      đến{" "}
                      <span className="font-semibold">
                        {formatTimeWithPeriod(reservation.endTime)}
                      </span>{" "}
                      tại{" "}
                      <span className="font-semibold">
                        {reservation.roomName}
                      </span>
                    </p>
                  </div>
                </div>
              </td>

              <td className="border border-gray-300 px-4">
                {reservation.reason}
              </td>
              <td className="border border-gray-300 px-4">
                {reservation.createdDate}
              </td>
              <td className="border border-gray-300 px-4">
                {reservation.updatedDate}
              </td>

              <td className="border border-gray-300 px-4">
                <button
                  onClick={() => handleCancel(reservation)}
                  className={`px-4 py-1 rounded-full transition-all duration-200 ${
                    reservation.status === "Đang chờ"
                      ? "bg-white text-black border border-gray-300 hover:bg-cyan-600 hover:text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={reservation.status !== "Đang chờ"}
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
          message="Nhập lý do hủy lịch hẹn"
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
          onChangeReason={setCancellationReason}
          cancellationReason={cancellationReason}
        />
      )}
    </div>
  );
};

export default ReservationList;
