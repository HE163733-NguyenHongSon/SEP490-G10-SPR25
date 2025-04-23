"use client";
import React, { useEffect } from "react";
import { User as UserIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { StylesConfig } from "react-select";
import { doctorScheduleService } from "@/services/doctorScheduleService";
import {
  setDoctors,
  setDoctorId,
  setLoading,
  setSelectedDate,
  setSelectedTime,
} from "../bookingSlice";
import { RootState } from "../store";

// Custom styles for the select component
const customStyles: StylesConfig<{ value: string; label: string }, false> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "white",
    borderColor: state.isFocused ? "#67e8f9" : "#d1d5db",
    borderRadius: "0.5rem",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#67e8f9",
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected || state.isFocused ? "#f3f4f6" : "white",
    color: "#374151",
    padding: "10px 12px",
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#374151",
    display: "flex",
    alignItems: "center",
  }),
  input: (base) => ({
    ...base,
    color: "#374151",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9ca3af",
  }),
};

const DoctorSelector = () => {
  const dispatch = useDispatch();
  const { doctors, doctorId, serviceId, suggestionData } = useSelector(
    (state: RootState) => state.booking
  );

  useEffect(() => {
    const fetchDoctors = async () => {
      console.log("Current serviceId:", serviceId);
      dispatch(setLoading(true));
      try {
        const doctorList = (
          await doctorScheduleService.getAvailableSchedulesByServiceId(
            serviceId
          )
        ).map((ds) => ({
          value: String(ds.doctorId ?? ""),
          label: ds.doctorName ?? "Unknown Doctor",
        }));

        const suggestedDoctors = Array.from(
          new Map(
            (suggestionData?.availableSchedules ?? []).map((ds) => [
              String(ds.doctorId),
              {
                value: String(ds.doctorId),
                label: ds.doctorName ?? "Unknown Doctor",
              },
            ])
          ).values()
        );
        const hasSuggestions =
          Array.isArray(suggestionData?.availableSchedules) &&
          suggestionData.availableSchedules.length > 0;

        dispatch(setDoctors(hasSuggestions ? suggestedDoctors : doctorList));

        if (hasSuggestions) {
          console.log("sddsd", hasSuggestions);
          dispatch(setDoctorId(suggestedDoctors[0]?.value));
          dispatch(  setSelectedDate(  suggestionData.availableSchedules[0]?.appointmentDate?.split(
                "T"
              )[0] ?? ""
            )
          );
          dispatch(
            setSelectedTime(
              `${suggestionData.availableSchedules[0]?.slotStartTime}-${suggestionData.availableSchedules[0]?.slotEndTime}`
            )
          );
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

    if (serviceId) {
      fetchDoctors();
    }
  }, [serviceId, suggestionData?.availableSchedules, dispatch]);

  const currentDoctor = doctorId
    ? doctors.find((d) => String(d.value) === String(doctorId))
    : null;

  const handleChange = (option: { value: string; label: string } | null) => {
    if (option) {
      const selectedDoctorId = String(option.value);
      dispatch(setDoctorId(selectedDoctorId));

      const doctorSchedules = suggestionData?.availableSchedules
        ?.filter((s) => String(s.doctorId) === selectedDoctorId)
        ?.sort(
          (a, b) =>
            new Date(a.appointmentDate).getTime() -
            new Date(b.appointmentDate).getTime()
        );

      const nearestDate = doctorSchedules?.[0]?.appointmentDate;
      const isoDate = nearestDate
        ? new Date(nearestDate).toISOString().split("T")[0]
        : "";

      dispatch(setSelectedDate(isoDate));
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center">
        <UserIcon className="w-4 h-4 mr-2" />
        Chọn bác sĩ
      </label>
      <Select
        value={currentDoctor}
        onChange={handleChange}
        options={doctors.map((doctor) => ({
          value: doctor.value,
          label: doctor.label,
        }))}
        isDisabled={!doctors.length}
        placeholder="Chọn bác sĩ"
        noOptionsMessage={() => "Không có bác sĩ nào"}
        styles={customStyles} // Apply custom styles here
      />
    </div>
  );
};

export default DoctorSelector;
