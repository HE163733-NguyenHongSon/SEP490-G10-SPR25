"use client";
import { useUser } from "@/common/contexts/UserContext";
import { patientService } from "@/common/services/patientService";
import { useQuery } from "@tanstack/react-query";
import BookingForm from "./components/BookingForm";
import { useDispatch } from "react-redux";
import {
  setIsLoading,
  setPatients,
  setShowBookingForm,
} from "./redux/bookingSlice";
import { useEffect } from "react";

const BookingPage = () => {
  const { user } = useUser();
  const dispatch = useDispatch();

  const { data: patientDetail } = useQuery({
    queryKey: ["patientDetail", user],
    queryFn: async () => {
      const data = await patientService.getPatientDetailById(user?.userId);
      return data;
    },
    enabled: !!user,
    staleTime: 30000,
  });

  useEffect(() => {
    if (patientDetail) {
      const guardian: IPatient = {
        userId: patientDetail?.userId,
        userName: patientDetail?.userName,
        avatarUrl: patientDetail?.avatarUrl,
        relationship: "Người giám hộ",
        dob: patientDetail?.dob,
        phone: patientDetail?.phone,
        address: patientDetail?.address,
        gender: patientDetail?.gender,
        email: patientDetail?.email,
      };

      dispatch(setPatients([guardian, ...(patientDetail?.dependents || [])]));

      dispatch(setIsLoading(true));
      dispatch(setShowBookingForm(true));
    }
  }, [patientDetail, dispatch]);

  return <BookingForm isUseSuggestion={false}/>;
};

export default BookingPage;
