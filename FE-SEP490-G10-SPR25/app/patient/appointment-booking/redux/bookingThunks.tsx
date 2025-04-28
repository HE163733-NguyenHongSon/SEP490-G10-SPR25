import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; 

import {
  setSuggestionData,
  setSpecialtyId,
  setServiceId,
  setDoctorId,
  setIsShowRestoreSuggestion,
  setLoading,
  setServices,
  setSpecialties,
  setDoctors,
  setAvailableDates,
  setSelectedDate,
  setSelectedTime,
} from "./bookingSlice";
import api from "@/services/api";

export const restoreSuggestion = createAsyncThunk(
  "booking/restoreSuggestion",
  async (_, { dispatch }) => {
    const storedSuggestion = localStorage.getItem("bookingSuggestion");
    if (storedSuggestion) {
      try {
        const parsedData: IBookingSuggestion = JSON.parse(storedSuggestion);
        dispatch(setSuggestionData(parsedData));
        dispatch(setSpecialtyId(String(parsedData?.specialty?.specialtyId)));

        dispatch(setServiceId(parsedData?.service?.serviceId ?? ""));
        dispatch(
          setDoctorId(String(parsedData?.availableSchedules?.[0]?.doctorId))
        );
        dispatch(
          setSelectedDate(
            parsedData?.availableSchedules?.[0]?.appointmentDate.split(
              "T"
            )[0] ?? ""
          )
        );
        dispatch(
          setSelectedTime(
            parsedData?.availableSchedules?.[0]?.slotStartTime ?? ""
          )
        );
        dispatch(setIsShowRestoreSuggestion(false));
      } catch (error) {
        console.error(
          "Error parsing suggestion data from localStorage:",
          error
        );
      }
    }
  }
);
export const addPatientAsync = createAsyncThunk(
  "booking/addPatientAsync",
  async (patient: IAddedPatient, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/Patients/AddPatient", patient);
      return response.data;
    } catch (error: unknown) { 
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Unknown error");
      }
    }
  }
);
export const fetchServices = createAsyncThunk(
  "booking/fetchServices",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await api.get("/services");
      dispatch(setServices(response.data));
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchSpecialties = createAsyncThunk(
  "booking/fetchSpecialties",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await api.get("/specialties");
      dispatch(setSpecialties(response.data));
    } catch (error) {
      console.error("Error fetching specialties:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchDoctors = createAsyncThunk(
  "booking/fetchDoctors",
  async (specialtyId: number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await api.get(`/doctors?specialtyId=${specialtyId}`);
      dispatch(setDoctors(response.data));
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchAvailableDates = createAsyncThunk(
  "booking/fetchAvailableDates",
  async (
    { doctorId, date }: { doctorId: string; date: string },
    { dispatch }
  ) => {
    try {
      dispatch(setLoading(true));
      const response = await api.get(
        `/schedules/available?doctorId=${doctorId}&date=${date}`
      );
      dispatch(setAvailableDates(response.data));
    } catch (error) {
      console.error("Error fetching available dates:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const submitBooking = createAsyncThunk(
  "booking/submitBooking",
  async (bookingData: IPayment, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await api.post("/appointments", bookingData);
      return response.data;
    } catch (error) {
      console.error("Error submitting booking:", error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
