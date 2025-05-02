import React from "react";
import PaginatedItems from "@/common/components/PaginatedItems";
import SearchForReceptionist from "../components/SearchForReceptionist";
import { doctorScheduleService } from "@/common/services/doctorScheduleService";
import { DoctorScheduleList } from "../components/DoctorScheduleList";
import Link from "next/link";

const DoctorSchedulesPage = async ({
  searchParams,
}: {
  searchParams: {
    ranks?: string;
    searchField?: string;
    doctorName?: string;
    displayView?: string;
    serviceId?: string;
    day?: string;
    roomId?: string;
    slotId?: string;
  };
}) => {
  let doctorSchedules: IDoctorSchedule[] = [];

  // doctorSchedules = await doctorScheduleService.getDoctorScheduleList();
  doctorSchedules = await doctorScheduleService.filterDoctorSchedules({
    doctorName: searchParams.doctorName,
    // Ví dụ nếu bạn định nghĩa `serviceId`, `day`, `roomId`, `slotId` trong `searchParams`
    serviceId: searchParams.serviceId
      ? Number(searchParams.serviceId)
      : undefined,
    day: searchParams.day,
    roomId: searchParams.roomId ? Number(searchParams.roomId) : undefined,
    slotId: searchParams.slotId ? Number(searchParams.slotId) : undefined,
  });

  // day cung chua sua xong

  return (
    <div className="flex flex-col h-screen mt-10 gap-5">
      <div className="flex flex-row flex-wrap items-center justify-between gap-5 px-4">
        <div className="flex gap-5">
          {/* <SearchForReceptionist
          placeholder="Tìm kiếm lịch làm việc"
          path="/receptionist/doctor-schedules"
        /> */}
        </div>

        <Link
          href="/receptionist/doctorSchedule-add"
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Thêm lịch mới
        </Link>
      </div>

      <div className="overflow-y-auto px-4">
        {doctorSchedules.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            Không có kết quả phù hợp.
          </p>
        ) : (
          <PaginatedItems
            items={doctorSchedules}
            itemsPerPage={10}
            RenderComponent={DoctorScheduleList}
            displayView={searchParams.displayView || "grid"}
          />
        )}
      </div>
    </div>
  );
};

export default DoctorSchedulesPage;
