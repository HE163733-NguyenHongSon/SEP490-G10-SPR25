"use client";

import { useUser } from "@/contexts/UserContext";
import { patientService } from "@/services/patientService";
import { useQuery } from "@tanstack/react-query";
import BookingForm from "./components/BookingForm";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  setSymptoms,
  setLoading,
  setPatients,
  setShowBookingForm,
} from "./redux/bookingSlice";
import { RootState } from "../store";

const PopupBody = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { symptoms, isLoading } = useSelector(
    (state: RootState) => state.booking
  );

  const { data: patientDetail } = useQuery({
    queryKey: ["patientDetail", user],
    queryFn: async () => {
      const data = await patientService.getPatientDetailById(user?.userId);
      return data;
    },
    enabled: !!user,
    staleTime: 30000,
  });

  const handleSubmit = async () => {
    if (symptoms.trim().length > 2) {
      dispatch(setSymptoms(symptoms.trim()));
      dispatch(
        setPatients([user as IPatient, ...(patientDetail?.dependents || [])])
      );
      dispatch(setLoading(true));
      dispatch(setShowBookingForm(true));
    }
  };

  return (
    <div className="relative w-full max-w-full p-4">
      <div className="relative w-full h-15">
        <input
          type="text"
          placeholder="Nhập triệu chứng..."
          value={symptoms}
          onChange={(e) => dispatch(setSymptoms(e.target.value))}
          className="pl-4 pr-10 py-4 w-full h-full rounded bg-gray-100 text-gray-500 focus:outline-none"
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || symptoms.trim().length < 2}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <PaperAirplaneIcon className="w-6 h-6 text-cyan-500" />
        </button>
      </div>
      <BookingForm />
    </div>
  );
};

export default PopupBody;
