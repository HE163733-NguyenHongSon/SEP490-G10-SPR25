"use client";
import React, { useEffect, useCallback, useMemo } from "react";
import { User as UserIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { doctorScheduleService } from "@/common/services/doctorScheduleService";
import {
  setDoctors,
  setDoctorId,
  setIsLoading,
  setSelectedDate,
  setSelectedTime,
  setAvailableSchedules,
} from "../redux/bookingSlice";
import { RootState } from "@/store";
import { useUser } from "@/common/contexts/UserContext";

const DoctorSelector = () => {
  const dispatch = useDispatch();

  const {
    doctors,
    doctorId,
    serviceId,
    isShowRestoreSuggestion,
    selectedDate,
    selectedTime,
    customSelectStyles,
  } = useSelector((state: RootState) => state.booking);

  const applyFirstSchedule = useCallback(
    (schedule: IAvailableSchedule) => {
      dispatch(setDoctorId(String(schedule.doctorId)));

      if (!isShowRestoreSuggestion) {
        const date = schedule.appointmentDate?.split("T")[0] ?? "";
        const time = `${schedule.slotStartTime}-${schedule.slotEndTime}`;
        if (!selectedDate) dispatch(setSelectedDate(date));
        if (!selectedTime) dispatch(setSelectedTime(time));
      } else {
        dispatch(setSelectedDate(""));
        dispatch(setSelectedTime(""));
      }
    },
    [dispatch, isShowRestoreSuggestion, selectedDate, selectedTime]
  );
  const { user } = useUser();
  useEffect(() => {
    if (!serviceId) return;

    const fetchDoctors = async () => {
      dispatch(setIsLoading(true));
      try {
        const schedules =
          await doctorScheduleService.getAvailableSchedulesByServiceIdAndPatientId(
            serviceId,
            user?.userId
          );

        dispatch(setAvailableSchedules(schedules));

        const uniqueDoctors = Array.from(
          new Map(
            schedules.map((s) => [
              s.doctorId,
              {
                value: String(s.doctorId),
                label: s.doctorName ?? "Unknown Doctor",
              },
            ])
          ).values()
        );

        dispatch(setDoctors(uniqueDoctors));

        if (schedules.length && !isShowRestoreSuggestion) {
          applyFirstSchedule(schedules[0]);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách bác sĩ:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchDoctors();
  }, [dispatch, serviceId, isShowRestoreSuggestion, applyFirstSchedule]);

  const currentDoctor = useMemo(
    () => doctors.find((d) => d.value === String(doctorId)) ?? null,
    [doctorId, doctors]
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center">
        <UserIcon className="w-4 h-4 mr-2" />
        Chọn bác sĩ
      </label>
      <Select
        value={currentDoctor}
        onChange={(v) => v && dispatch(setDoctorId(v.value))}
        options={doctors}
        isDisabled={!doctors.length}
        placeholder="Chọn bác sĩ"
        noOptionsMessage={() => "Không có bác sĩ nào"}
        styles={customSelectStyles}
      />
    </div>
  );
};

export default DoctorSelector;
