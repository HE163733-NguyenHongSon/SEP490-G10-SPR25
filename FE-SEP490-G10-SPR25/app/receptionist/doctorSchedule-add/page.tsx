"use client";
import React, { useState, useEffect } from "react";
import { doctorScheduleService } from "@/common/services/doctorScheduleService";
import { doctorService } from "@/common/services/doctorService";
import { serviceService } from "@/common/services/serviceService";
import { roomService } from "@/common/services/roomService";
import { slotService } from "@/common/services/slotService";

import { useRouter } from "next/navigation";

export default function AddDoctorSchedulePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    doctorId: 0,
    serviceId: 0,
    dayOfWeek: "",
    roomId: 0,
    slotId: 0,
  });
  const [loading, setLoading] = useState({
    submit: false,
    initial: true,
  });
  const [error, setError] = useState<string | null>(null);

  // Thêm state cho các danh sách lựa chọn
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [slots, setSlots] = useState<ISlot[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [doctorsRes, servicesRes, roomsRes, slotsRes] = await Promise.all(
          [
            doctorService.getDoctorList(),
            serviceService.getAllServices(),
            roomService.getRoomList(),
            slotService.getSlotList(),
          ]
        );

        setDoctors(doctorsRes);
        setServices(servicesRes);
        setRooms(roomsRes);
        setSlots(slotsRes);
      } catch (err) {
        setError("Không tải được dữ liệu khởi tạo");
      } finally {
        setLoading((prev) => ({ ...prev, initial: false }));
      }
    };

    fetchInitialData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn thêm lịch làm việc mới?"
    );
    if (!isConfirmed) return;

    setLoading((prev) => ({ ...prev, submit: true }));
    setError(null);

    try {
      const newSchedule = await doctorScheduleService.createDoctorSchedule(
        formData
      );
      router.push(`/receptionist/doctorSchedule`);
    } catch (err) {
      console.error("Create error:", err);
      setError(err instanceof Error ? err.message : "Thêm mới thất bại");
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "dayOfWeek" ? value : Number(value),
    }));
  };

  if (loading.initial) {
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
      <h1 className="text-2xl font-bold mb-6">Thêm lịch làm việc mới</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Doctor Selection */}
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
              {doctors.map((doctor) => (
                <option key={doctor.userId} value={doctor.userId}>
                  {doctor.userName} - {doctor.userId}
                </option>
              ))}
            </select>
          </div>

          {/* Service Selection */}
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
              {services.map((service) => (
                <option key={service.serviceId} value={service.serviceId}>
                  {service.serviceName}
                </option>
              ))}
            </select>
          </div>

          {/* Room Selection */}
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
              {rooms.map((room) => (
                <option key={room.roomId} value={room.roomId}>
                  {room.roomName} ({room.roomType})
                </option>
              ))}
            </select>
          </div>

          {/* Day of Week */}
          <div className="form-group">
            <label className="block text-sm font-medium mb-2">
              Ngày trong tuần <span className="text-red-500">*</span>
            </label>
            <select
              name="dayOfWeek"
              value={formData.dayOfWeek}
              onChange={handleChange}
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

          {/* Slot Selection */}
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
              {slots.map((slot) => (
                <option key={slot.slotId} value={slot.slotId}>
                  {slot.slotStartTime} - {slot.slotEndTime}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={() => router.push("/receptionist/doctorSchedule")}
            className="px-4 py-2 border rounded hover:bg-gray-50"
            disabled={loading.submit}
          >
            Hủy bỏ
          </button>
          {/* <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            disabled={loading.submit}
          >
            Quay lại
          </button> */}
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            disabled={loading.submit}
          >
            {loading.submit ? "Đang tạo..." : "Thêm mới"}
          </button>
        </div>
      </form>
    </div>
  );
}
