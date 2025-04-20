"use client";
import React, { useEffect } from "react";
import Select, { SingleValue } from "react-select";
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

  const getSelectedValue = () => {
    if (suggestionData && suggestionData.service.serviceId) {
      const { serviceName, serviceId, price } = suggestionData.service;
      return {
        value: serviceId,
        label: `${serviceName} - ${Number(price).toLocaleString("vi-VN")} VND`,
      };
    }

    const selected = services.find((s) => s.serviceId.toString() === serviceId);
    if (selected) {
      return {
        value: selected.serviceId,
        label: `${selected.serviceName} - ${Number(selected.price).toLocaleString("vi-VN")} VND`,
      };
    }

    return null;
  };

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const data = await serviceService.getServicesBySpecialty(specialtyId);
        setServices(data);
        const newServiceId =
          data.length > 0 ? data[0].serviceId.toString() : "";
        setServiceId(newServiceId);
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

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center">
        <User className="w-4 h-4 mr-2" />
        Dịch vụ y tế
      </label>
      <Select
        styles={customStyles}
        value={getSelectedValue()}
        onChange={(
          newValue: SingleValue<{ value: string | number; label: string }>
        ) => {
          setServiceId(newValue?.value?.toString() ?? "");
        }}
        options={services.map((s) => ({
          value: s.serviceId,
          label: `${s.serviceName} - ${Number(s.price).toLocaleString("vi-VN")} VND`,
        }))}
        isClearable
        isDisabled={!services.length}
        placeholder="Chọn dịch vụ"
        noOptionsMessage={() => "Không có dịch vụ khả dụng"}
      />
    </div>
  );
};

export default ServiceSelector;
