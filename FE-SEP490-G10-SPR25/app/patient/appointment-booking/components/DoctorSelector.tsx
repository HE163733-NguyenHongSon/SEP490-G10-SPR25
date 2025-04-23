"use client";
import React, { useEffect, useCallback, useMemo } from "react";
import { User as UserIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Select, { StylesConfig } from "react-select";
import { doctorScheduleService } from "@/services/doctorScheduleService";
import {
  setDoctors,
  setDoctorId,
  setLoading,
  setSelectedDate,
  setSelectedTime,
  setAvailableSchedules,
} from "../redux/bookingSlice";
import { RootState } from "../../store";

const customStyles: StylesConfig<{ value: string; label: string }, false> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "white",
    borderColor: state.isFocused ? "#67e8f9" : "#d1d5db",
    borderRadius: "0.5rem",
    boxShadow: "none",
    "&:hover": { borderColor: "#67e8f9" },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected || state.isFocused ? "#f3f4f6" : "white",
    color: "#374151",
    padding: "10px 12px",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#374151",
    display: "flex",
    alignItems: "center",
  }),
  input: (base) => ({ ...base, color: "#374151" }),
  placeholder: (base) => ({ ...base, color: "#9ca3af" }),
};

const DoctorSelector = () => {
  const dispatch = useDispatch();
  const {
    doctors,
    doctorId,
    serviceId,
    specialtyId,
    suggestionData,
    isShowRestoreSuggestion,
  } = useSelector((state: RootState) => state.booking);

  useEffect(() => {
    const fetchDoctors = async () => {
      dispatch(setLoading(true));
      try {
        const availableSchedules =
          await doctorScheduleService.getAvailableSchedulesByServiceId(
            serviceId
          );
        dispatch(setAvailableSchedules(availableSchedules));
        const doctorList = availableSchedules
          .map((ds) => ({
            value: String(ds.doctorId ?? ""),
            label: ds.doctorName ?? "Unknown Doctor",
          }))
          .filter(
            (v, i, self) => self.findIndex((d) => d.value === v.value) === i
          );

        dispatch(setDoctors(doctorList));

        if (!isShowRestoreSuggestion) {
          const firstSchedule = suggestionData?.availableSchedules?.[0];
          if (firstSchedule) {
            dispatch(setDoctorId(String(firstSchedule.doctorId)));
            dispatch(
              setSelectedDate(
                firstSchedule.appointmentDate?.split("T")[0] ?? ""
              )
            );
            dispatch(
              setSelectedTime(
                `${firstSchedule.slotStartTime}-${firstSchedule.slotEndTime}`
              )
            );
          }
        } else {
          dispatch(setDoctorId(""));
          dispatch(setSelectedDate(""));
          dispatch(setSelectedTime(""));
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchDoctors();
  }, [serviceId, specialtyId, suggestionData?.availableSchedules, dispatch]);

  const currentDoctor = useMemo(() => {
    return doctorId
      ? doctors.find((d) => String(d.value) === String(doctorId))
      : null;
  }, [doctorId, doctors]);

  const handleChange = useCallback(
    (option: { value: string; label: string } | null) => {
      if (option) {
        const selectedDoctorId = String(option.value);
        dispatch(setDoctorId(selectedDoctorId));

        const doctorSchedules = (suggestionData?.availableSchedules ?? [])
          .filter((s) => String(s.doctorId) === selectedDoctorId)
          .sort(
            (a, b) =>
              new Date(a.appointmentDate).getTime() -
              new Date(b.appointmentDate).getTime()
          );

        const isoDate =
          doctorSchedules?.[0]?.appointmentDate?.split("T")[0] ?? "";
        dispatch(setSelectedDate(isoDate));
      }
    },
    [dispatch, suggestionData?.availableSchedules]
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center">
        <UserIcon className="w-4 h-4 mr-2" />
        Chọn bác sĩ
      </label>
      <Select
        value={currentDoctor}
        onChange={handleChange}
        options={doctors}
        isDisabled={!doctors.length}
        placeholder="Chọn bác sĩ"
        noOptionsMessage={() => "Không có bác sĩ nào"}
        styles={customStyles}
      />
    </div>
  );
};

export default DoctorSelector;
