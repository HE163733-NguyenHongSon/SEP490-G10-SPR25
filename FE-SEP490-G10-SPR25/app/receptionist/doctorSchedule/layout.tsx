"use client";

import OptionFilter from "@/common/components/OptionFilter";
import CollapsibleSection from "@/common/components/CollapsibleSection";
import SelectList from "@/common/components/SelectList";
import { serviceService } from "@/common/services/serviceService";
import { roomService } from "@/common/services/roomService";
import { slotService } from "@/common/services/slotService";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DoctorSchedulesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [services, setServices] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [slots, setSlots] = useState<any[]>([]);
  const [doctorName, setDoctorName] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const serviceData = await serviceService.getAllServices();
      const roomData = await roomService.getRoomList();
      const slotData = await slotService.getSlotList();

      setServices(
        serviceData.map((s) => ({
          label: s.serviceName,
          value: s.serviceId.toString(),
        }))
      );
      setRooms(
        roomData.map((r) => ({ label: r.roomName, value: r.roomId.toString() }))
      );
      setSlots(
        slotData.map((s) => ({
          label: `${s.slotStartTime} - ${s.slotEndTime}`,
          value: s.slotId.toString(),
        }))
      );
    };

    fetchData();
  }, []);

  const days = [
    { label: "Thứ 2", value: "Monday" },
    { label: "Thứ 3", value: "Tuesday" },
    { label: "Thứ 4", value: "Wednesday" },
    { label: "Thứ 5", value: "Thursday" },
    { label: "Thứ 6", value: "Friday" },
    { label: "Thứ 7", value: "Saturday" },
    { label: "Chủ nhật", value: "Sunday" },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (doctorName.trim()) {
      params.set("doctorName", doctorName.trim());
    } else {
      params.delete("doctorName");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center z-10"
      style={{ backgroundImage: 'url("/images/background_doctors.jpeg")' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>

      <div className="container mt-20 mb-5 z-30 grid grid-cols-5 bg-white rounded-xl shadow-2xl">
        {/* Sidebar filter */}
        <div className="col-span-1 border-r border-gray-300 text-gray-700">
          <div className="flex flex-col items-center border-b border-gray-300 gap-2 py-8 font-medium mx-5">
            <h1 className="text-xl font-semibold">Lọc lịch bác sĩ</h1>
            <input
              type="text"
              placeholder="Tìm bác sĩ..."
              className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded-md transition"
              onClick={handleSearch}
            >
              Tìm kiếm
            </button>
          </div>

          <div className="flex flex-col mx-5 h-[700px] overflow-y-auto">
            <CollapsibleSection
              title="Dịch vụ"
              content={<SelectList items={services} searchParam="serviceId" />}
              defaultExpanded={true}
            />

            <CollapsibleSection
              title="Ngày"
              content={<SelectList items={days} searchParam="day" />}
              defaultExpanded={true}
            />

            <CollapsibleSection
              title="Phòng"
              content={<SelectList items={rooms} searchParam="roomId" />}
              defaultExpanded={true}
            />

            <CollapsibleSection
              title="Ca khám"
              content={<SelectList items={slots} searchParam="slotId" />}
              defaultExpanded={true}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="w-full p-4 col-span-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
