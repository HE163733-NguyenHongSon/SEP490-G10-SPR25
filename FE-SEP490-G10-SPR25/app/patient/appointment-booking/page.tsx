"use client";
import { useUser } from "@/common/contexts/UserContext";
import { patientService } from "@/common/services/patientService";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import BookingForm from "./components/BookingForm";

import {
  setIsLoading,
  setPatients,
  setIsShowBookingForm,
  setIsUseSuggestion,
} from "./redux/bookingSlice";

const BookingPage = () => {
  const { user } = useUser();
  const dispatch = useDispatch();

  const { data: patientDetail } = useQuery({
    queryKey: ["patientDetail", user],
    queryFn: async () =>
      await patientService.getPatientDetailById(user?.userId),
    enabled: !!user,
    staleTime: 0,
  });

  useEffect(() => {
    const initBooking = async () => {
      if (!patientDetail) return;

      dispatch(setIsLoading(true));

      const guardian: IPatient = {
        userId: patientDetail.userId,
        userName: patientDetail.userName,
        avatarUrl: patientDetail.avatarUrl,
        relationship: "Người giám hộ",
        dob: patientDetail.dob,
        phone: patientDetail.phone,
        address: patientDetail.address,
        gender: patientDetail.gender,
        email: patientDetail.email,
      };

      dispatch(setPatients([guardian, ...(patientDetail.dependents || [])]));
      dispatch(setIsShowBookingForm(true));
      dispatch(setIsUseSuggestion(false));
    };

    initBooking();
  }, [patientDetail, dispatch]);

  return <BookingForm />;
};
   
export default BookingPage;
