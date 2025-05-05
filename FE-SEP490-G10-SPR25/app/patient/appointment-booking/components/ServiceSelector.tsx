"use client";
import React, { useEffect } from "react";
import Select from "react-select";
import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { serviceService } from "@/common/services/serviceService";
import { setServices, setServiceId, setIsLoading } from "../redux/bookingSlice";
import { RootState } from "@/store";

const ServiceSelector = () => {
  const dispatch = useDispatch();

  const { services, serviceId, suggestionData, specialtyId,isShowRestoreSuggestion,customSelectStyles } = useSelector(
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

 

  useEffect(() => {
    const fetchServices = async () => {
      dispatch(setIsLoading(true));
      console.log(serviceId);
      try {
        const data = await serviceService.getServicesBySpecialty(
          Number(specialtyId)
        );
        dispatch(setServices(data));
        if (suggestionData && !isShowRestoreSuggestion) {
          dispatch(setServiceId(String(suggestionData?.service.serviceId)));
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        dispatch(setIsLoading(false));
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
        styles={customSelectStyles}
      />
    </div>
  );
};

export default ServiceSelector;
