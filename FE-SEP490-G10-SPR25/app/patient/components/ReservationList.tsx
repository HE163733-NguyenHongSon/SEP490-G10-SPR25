import React from "react";
import Image from "next/image";

interface ReservationListProps {
  items: IReservation[];
}

const ReservationList = ({ items }: ReservationListProps) => {
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
          {items.map((reservation: IReservation) => (
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
                        src={
                          // reservation.serviceImage
                           "https://th.bing.com/th/id/OIP.Km2gGBfVnlIr5JhRhgiuQgHaD4?w=305&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                          }
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
                      Khám bởi{" "}
                      <span className="font-semibold">
                        {reservation.doctorName}
                      </span>{" "}
                      bác sĩ
                    </p>
                    <p>
                      Khám vào{" "}
                      <span className="font-semibold">
                        {reservation.appointmentDate}
                      </span>{" "}
                      từ{" "}
                      <span className="font-semibold">
                        {reservation.startTime}
                      </span>{" "}
                      đến{" "}
                      <span className="font-semibold">
                        {reservation.endTime}
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
                  className="px-3 text-#635F5F rounded-full hover:bg-cyan-600 hover:text-white flex items-center justify-start min-w-fit h-fit gap-4 border border-gray-300 bg-white shadow-md"
                >
                  Hủy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
