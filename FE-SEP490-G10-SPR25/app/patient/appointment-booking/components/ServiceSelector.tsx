"use client";
import React, { useEffect } from "react";
import Select from "react-select";
import { User } from "lucide-react";
import { useBookingContext } from "@/patient/contexts/BookingContext";
import { serviceService } from "@/services/serviceService";

const ServiceSelector = () => {
  const {
    services,
    setServices,
    serviceId,
    setServiceId,
    customStyles,
    suggestionData,
    setLoading,
    specialtyId,
  } = useBookingContext();

  const getSelectedOption = () => {
    if (suggestionData?.service?.serviceId) {
      const { serviceName, serviceId, price } = suggestionData.service;
      return {
        value: serviceId,
        label: `${serviceName} - ${Number(price).toLocaleString("vi-VN")} VND`,
      };
    }

    const selected = services.find(s => s.serviceId.toString() === serviceId);
    return selected
      ? {
          value: selected.serviceId,
          label: `${selected.serviceName} - ${Number(selected.price).toLocaleString("vi-VN")} VND`,
        }
      : null;
  };

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const data = await serviceService.getServicesBySpecialty(specialtyId);
        setServices(data);
        setServiceId(data.length ? data[0].serviceId.toString() : "");
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    if (specialtyId && !suggestionData?.service?.serviceId) {
      fetchServices();
    }
  }, [specialtyId]);

  const options = services.map(s => ({
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
        styles={customStyles}
        value={getSelectedOption()}
        onChange={opt => setServiceId(opt?.value?.toString() ?? "")}
        options={options}
        isClearable
        isDisabled={!options.length}
        placeholder="Chọn dịch vụ"
        noOptionsMessage={() => "Không có dịch vụ khả dụng"}
      />
    </div>
  );
};

export default ServiceSelector;
