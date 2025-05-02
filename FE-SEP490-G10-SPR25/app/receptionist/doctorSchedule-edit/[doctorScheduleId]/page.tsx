"use client";
import React, { useEffect, useState } from "react";
import { doctorScheduleService } from "@/common/services/doctorScheduleService";
import { doctorService } from "@/common/services/doctorService";
import { serviceService } from "@/common/services/serviceService";
import { roomService } from "@/common/services/roomService";
import { slotService } from "@/common/services/slotService";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditDoctorSchedulePage({
  params,
}: {
  params: { doctorScheduleId: string };
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    doctorScheduleId: 0,
    doctorId: 0,
    serviceId: 0,
    dayOfWeek: "",
    roomId: 0,
    slotId: 0,
  });
  const [loading, setLoading] = useState({ get: true, submit: false });
  const [error, setError] = useState<string | null>(null);
  const [originalData, setOriginalData] = useState<any>(null);
  const [doctorList, setDoctorList] = useState<any[]>([]);
  const [serviceList, setServiceList] = useState<any[]>([]);
  const [roomList, setRoomList] = useState<any[]>([]);
  const [slotList, setSlotList] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorData, serviceData, roomData, slotData, scheduleData] =
          await Promise.all([
            doctorService.getDoctorList(),
            serviceService.getAllServices(),
            roomService.getRoomList(),
            slotService.getSlotList(),
            doctorScheduleService.getDoctorScheduleDetailById(
              params.doctorScheduleId
            ),
          ]);

        setDoctorList(doctorData);
        setServiceList(serviceData);
        setRoomList(roomData);
        setSlotList(slotData);

        setFormData({
          doctorScheduleId: scheduleData.doctorScheduleId,
          doctorId: scheduleData.doctorId,
          serviceId: scheduleData.serviceId,
          dayOfWeek: scheduleData.dayOfWeek,
          roomId: scheduleData.roomId,
          slotId: scheduleData.slotId,
        });
        setOriginalData(scheduleData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading((prev) => ({ ...prev, get: false }));
      }
    };

    fetchData();
  }, [params.doctorScheduleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn cập nhật lịch làm việc này?"
    );
    if (!isConfirmed) return;

    setLoading((prev) => ({ ...prev, submit: true }));
    setError(null);

    try {
      const updatedSchedule = await doctorScheduleService.updateDoctorSchedule(
        formData
      );
      router.push(
        `/receptionist/doctorSchedule-detail/${params.doctorScheduleId}`
      );
    } catch (err) {
      console.error("Update error:", err);
      setError(err instanceof Error ? err.message : "Cập nhật thất bại");
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  if (loading.get) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Đang tải dữ liệu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-4">
        <Link
          href={`/receptionist/doctorSchedule-detail/${formData.doctorScheduleId}`}
          className="inline-flex items-center text-blue-600 hover:underline"
        >
          ← Quay lại chi tiết lịch làm việc
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6">
        Chỉnh sửa lịch làm việc #{formData.doctorScheduleId}
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chọn bác sĩ */}
          <div className="form-group">
            <label className="block text-sm font-medium mb-2">
              Bác sĩ <span className="text-red-500">*</span>
            </label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Chọn bác sĩ</option>
              {doctorList.map((doctor) => (
                <option key={doctor.userId} value={doctor.userId}>
                  {doctor.userName} - {doctor.userId}
                </option>
              ))}
            </select>
          </div>

          {/* Chọn dịch vụ */}
          <div className="form-group">
            <label className="block text-sm font-medium mb-2">
              Dịch vụ <span className="text-red-500">*</span>
            </label>
            <select
              name="serviceId"
              value={formData.serviceId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Chọn dịch vụ</option>
              {serviceList.map((service) => (
                <option key={service.serviceId} value={service.serviceId}>
                  {service.serviceName}
                </option>
              ))}
            </select>
          </div>

          {/* Chọn phòng */}
          <div className="form-group">
            <label className="block text-sm font-medium mb-2">
              Phòng <span className="text-red-500">*</span>
            </label>
            <select
              name="roomId"
              value={formData.roomId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Chọn phòng</option>
              {roomList.map((room) => (
                <option key={room.roomId} value={room.roomId}>
                  {room.roomName}
                </option>
              ))}
            </select>
          </div>

          {/* Chọn ngày trong tuần */}
          <div className="form-group">
            <label className="block text-sm font-medium mb-2">
              Ngày trong tuần <span className="text-red-500">*</span>
            </label>
            <select
              name="dayOfWeek"
              value={formData.dayOfWeek}
              onChange={(e) =>
                setFormData({ ...formData, dayOfWeek: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Chọn ngày</option>
              <option value="Thứ Hai">Thứ Hai</option>
              <option value="Thứ Ba">Thứ Ba</option>
              <option value="Thứ Tư">Thứ Tư</option>
              <option value="Thứ Năm">Thứ Năm</option>
              <option value="Thứ Sáu">Thứ Sáu</option>
              <option value="Thứ Bảy">Thứ Bảy</option>
              <option value="Chủ Nhật">Chủ Nhật</option>
            </select>
          </div>

          {/* Chọn khung giờ */}
          <div className="form-group">
            <label className="block text-sm font-medium mb-2">
              Khung giờ <span className="text-red-500">*</span>
            </label>
            <select
              name="slotId"
              value={formData.slotId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Chọn khung giờ</option>
              {slotList.map((slot) => (
                <option key={slot.slotId} value={slot.slotId}>
                  {slot.slotStartTime} - {slot.slotEndTime}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Thông tin gốc */}
        {originalData && (
          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">Thông tin gốc:</h3>
            <p>Bác sĩ: {originalData.doctorName}</p>
            <p>Dịch vụ: {originalData.serviceName}</p>
            <p>Phòng: {originalData.roomName}</p>
            <p>Ngày trong tuần : {originalData.dayOfWeek}</p>
            <p>
              Khung giờ: {originalData.slotStartTime} -{" "}
              {originalData.slotEndTime}
            </p>
          </div>
        )}

        <div className="flex justify-end space-x-4 mt-8">
          <Link
            href={`/receptionist/doctorSchedule-detail/${formData.doctorScheduleId}`}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Hủy bỏ
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading.submit}
          >
            {loading.submit ? "Đang cập nhật..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
}
