import React from "react";
import Image from "next/image";
import moment from "moment";
import { formatTimeWithPeriod } from "@/utils/timeUtils";
interface ReservationListProps {
  items: IReservation[];
}

const ReservationList = ({ items }: ReservationListProps) => {
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;

  const canCancel = (reservation: IReservation): boolean => {
    if (reservation.status !== "Đang chờ") return false;

    const now = moment();
    const appointmentTime = moment(
      `${reservation.appointmentDate} ${reservation.startTime}`,
      "DD/MM/YYYY hh:mm A"
    );

    if (appointmentTime.isBefore(now)) return false;
    const hoursUntilAppointment = appointmentTime.diff(now, "hours", true);
    return hoursUntilAppointment >= 24;
  };

  return (
    <div className="reservation-list">
      <table className="border-separate border border-gray-300 rounded-md">
        <thead>
          <tr>
            <th className="border border-gray-300 rounded-md font-medium">
              Mã đặt lịch
            </th>
            <th className="border border-gray-300 rounded-md font-medium">
              Thông tin đặt lịch
            </th>
            <th className="border border-gray-300 rounded-md font-medium">
              Lý do đặt lịch
            </th>
            <th className="border border-gray-300 rounded-md font-medium">
              Ngày cập nhật
            </th>
            <th className="border border-gray-300 rounded-md font-medium">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((reservation: IReservation) => {
            const canCancelReservation = canCancel(reservation);

            return (
              <tr key={reservation.reservationId}>
                <td className="border border-gray-300 rounded-md px-10">
                  {reservation.reservationId}
                </td>
                <td className="border border-gray-300 rounded-md">
                  <div className="grid grid-cols-3 py-3 px-8">
                    <div className="service col-span-1 gap-2 grid grid-cols-3 border-r-2 border-gray-300">
                      <div className="col-span-1 flex justify-center items-center">
                        <Image
                          className="border border-gray-300 rounded-md"
                          width={200}
                          height={100}
                          src={`${imgUrl}/${reservation.serviceImage}`}
                          alt=""
                        />
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
                    <div className="flex justify-center flex-col col-span-2 w-fit mx-6">
                      <p>
                        Khám bởi bác sĩ{" "}
                        <span className="font-semibold">
                          {reservation.doctorName}
                        </span>
                      </p>
                      <p>
                        Khám vào{" "}
                        <span className="font-semibold">
                          {reservation.appointmentDate}
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
                <td className="border border-gray-300 rounded-md px-2">
                  {reservation.reason}
                </td>
                <td className="border border-gray-300 rounded-md px-2">
                  {reservation.updatedDate}
                </td>
                <td className="border border-gray-300 rounded-md px-2">
                  <button
                    disabled={!canCancelReservation}
                    className={`px-3 rounded-full ${
                      canCancelReservation
                        ? "hover:bg-cyan-600 hover:text-white border border-gray-300 bg-white shadow-md"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Hủy
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
