"use client";
import React, { useEffect } from "react";
import Select from "react-select";
import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { serviceService } from "@/services/serviceService";
import {
  setServices,
  setServiceId,
  setLoading,
  setDoctorId,
} from "../bookingSlice";
import { RootState } from "../store";
import { StylesConfig } from "react-select";  

const ServiceSelector = () => d
  const dispatch = useDispatch();

  const { services, serviceId, suggestionData, specialtyId } = useSelector(
    (state: RootState) => state.booking
  );

  const getSelectedOption = () => {
    const selected = services.find((s) => s.serviceId.toString() === serviceId);
    return selected
      ? {
          value: selected.serviceId,
          label: `${selected.serviceName} - ${Number(
            selected.price
          ).toLocaleString("vi-VN")} VND`,
        }
      : null;
  };

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
      backgroundColor:
        state.isSelected || state.isFocused ? "#f3f4f6" : "white",
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

  useEffect(() => {
    const fetchServices = async () => {
      dispatch(setLoading(true));
      try {
        const data = await serviceService.getServicesBySpecialty(specialtyId);
        dispatch(setServices(data));
        dispatch(setDoctorId(""));
        dispatch(setServiceId("")); // Reset lựa chọn dịch vụ khi đổi chuyên khoa
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (specialtyId) {
      fetchServices();
    }
  }, [specialtyId]);

  const options = services.map((s) => ({
    value: s.serviceId,
    label: `${s.serviceName} - ${Number(s.price).toLocaleString("vi-VN")} VND`,
  }));

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center">
        <User className="w-4 h-4 mr-2" />
        Dịch vụ y tế
      </label>
      <Select
        value={getSelectedOption()}
        onChange={(opt) => dispatch(setServiceId(opt?.value?.toString() ?? ""))}
        options={options}
        isClearable
        isDisabled={!options.length}
        placeholder="Chọn dịch vụ"
        noOptionsMessage={() => "Không có dịch vụ khả dụng"}
        styles={customStyles}
      />
    </div>
  );
};

export default ServiceSelector;
