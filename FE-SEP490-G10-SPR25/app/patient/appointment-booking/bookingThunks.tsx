import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setSuggestionData,
  setSpecialtyId,
  setServiceId,
  setDoctorId,
  setShowRestoreSuggestion,
  setLoading,
  setServices,
  setSpecialties,
  setDoctors,
  setAvailableDates,
} from "./bookingSlice";
import api from "@/services/api";

export const restoreSuggestion = createAsyncThunk(
  "booking/restoreSuggestion",
  async (_, { dispatch }) => {
    const storedSuggestion = localStorage.getItem("bookingSuggestion");
    if (storedSuggestion) {
      try {
        const parsedData = JSON.parse(storedSuggestion);
        dispatch(setSuggestionData(parsedData));
        dispatch(setSpecialtyId(Number(parsedData?.specialty?.specialtyId ?? 0)));
        dispatch(setServiceId(parsedData?.service?.serviceId ?? ""));
        dispatch(setDoctorId(parsedData?.availableSchedules?.[0]?.doctorScheduleId ?? ""));
        dispatch(setShowRestoreSuggestion(false));
      } catch (error) {
        console.error("Error parsing suggestion data from localStorage:", error);
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
  async ({ doctorId, date }: { doctorId: string; date: string }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await api.get(`/schedules/available?doctorId=${doctorId}&date=${date}`);
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
  async (bookingData: any, { dispatch }) => {
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
