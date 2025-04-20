"use client";
import React, { useEffect } from "react";
import Select from "react-select";
import { User as UserIcon } from "lucide-react";
import { useBookingContext } from "@/patient/contexts/BookingContext";
import type { SingleValue } from "react-select";
import { doctorService } from "@/services/doctorService";
import { set, setDate } from "date-fns";

const DoctorSelector = () => {
  const {
    serviceId,
    doctors,
    setDoctors,
    doctorId,
    setDoctorId,
    suggestionData,
    customStyles,
    setLoading,
    setSelectedDate,
    setSelectedTime,
  } = useBookingContext();

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const doctorList = (
          await doctorService.getDoctorListByServiceId(serviceId)
        ).map((ds) => ({
          value: String(ds.userId ?? ""),
          label: ds.userName,
        }));

        const suggestedDoctors: IDoctorOption[] = [
          ...new Map(
            (suggestionData?.availableSchedules ?? []).map(
              (ds: IAvailableSchedules) => [
                String(ds.doctorId),
                {
                  value: String(ds.doctorId),
                  label: ds.doctorName ?? "Unknown Doctor",
                },
              ]
            )
          ).values(),
        ];

        setDoctors(suggestedDoctors.length > 0 ? suggestedDoctors : doctorList);
        setDoctorId(suggestedDoctors[0]?.value ?? doctorList[0]?.value);
        setSelectedDate(
          suggestionData?.availableSchedules[0]?.appointmentDate.split( "T" )[0] || ""
        );
        setSelectedTime(
          `${suggestionData?.availableSchedules[0]?.slotStartTime}-${suggestionData?.availableSchedules[0]?.slotEndTime}` ||
            ""
        );
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchDoctors();
    }
  }, [serviceId, suggestionData?.availableSchedules]);

  const currentDoctor =
    doctors.find((d) => String(d.value) === String(doctorId)) || null;

  const handleChange = (
    option: SingleValue<{ value: number | string; label: string }>
  ) => {
    if (option) {
      const selectedDoctorId = String(option.value);
      setDoctorId(selectedDoctorId);

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

      setSelectedDate(isoDate);
      console.log("Selected date:", isoDate);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center">
        <UserIcon className="w-4 h-4 mr-2" />
        Chọn bác sĩ
      </label>
      <Select
        styles={customStyles}
        value={currentDoctor}
        onChange={handleChange}
        options={doctors.map((doctor) => ({
          value: doctor.value,
          label: doctor.label,
        }))}
        isDisabled={!doctors.length}
        placeholder="Chọn bác sĩ"
        noOptionsMessage={() => "Không có bác sĩ nào"}
      />
    </div>
  );
};

export default DoctorSelector;
