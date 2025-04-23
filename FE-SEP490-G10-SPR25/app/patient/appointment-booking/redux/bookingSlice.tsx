import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// import {
//   restoreSuggestion,
//   fetchServices,
//   fetchSpecialties,
//   fetchDoctors,
//   fetchAvailableDates,
//   submitBooking,
// } from "./bookingThunks";

const initialState: IBookingState = {
  symptoms: "",
  isLoading: false,
  error: null,
  isShowBookingForm: false,
  currentStep: 1,
  addedPatient: null,
  patients: [],
  selectedPatient: null,
  addingPatient: false,
  suggestionData: null,
  services: [],
  serviceId: "",
  specialties: [],
  specialtyId: 0,
  doctors: [],
  doctorId: undefined,
  availableDates: [],
  selectedDate: "",
  selectedTime: "",
  selectedSlotId: "",
  isShowRestoreSuggestion: false,
  priorExaminationImg: null,
  // schedules: [],
  isSubmitting: false,
  isShowConfirmModal: false,
  customSelectStyles: {},
  availableSchedules: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setSymptoms: (state, action: PayloadAction<string>) => {
      state.symptoms = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },

    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setSelectedTime: (state, action: PayloadAction<string>) => {
      state.selectedTime = action.payload;
    },
    setShowBookingForm: (state, action: PayloadAction<boolean>) => {
      state.isShowBookingForm = action.payload;
    },
    setSelectedSlotId: (state, action: PayloadAction<string>) => {
      state.selectedSlotId = action.payload;
    },
    setPriorExaminationImg: (
      state,
      action: PayloadAction<string | null | File>
    ) => {
      state.priorExaminationImg = action.payload;
    },
    setIsShowRestoreSuggestion: (state, action: PayloadAction<boolean>) => {
      state.isShowRestoreSuggestion = action.payload;
    },
    setServices: (state, action: PayloadAction<IService[]>) => {
      state.services = action.payload;
    },
    setSpecialties: (state, action: PayloadAction<ISpecialty[]>) => {
      state.specialties = action.payload;
    },
    // setPatient: (state, action: PayloadAction<IPatient>) => {
    //   state.patient = action.payload;
    // },
    setPatients: (state, action: PayloadAction<IPatient[]>) => {
      state.patients = action.payload;
    },
    setDoctors: (state, action: PayloadAction<IDoctorOption[]>) => {
      state.doctors = action.payload;
    },
    setAvailableSchedules: (
      state,
      action: PayloadAction<IAvailableSchedule[]>
    ) => {
      state.availableSchedules = action.payload;
    },
    setAvailableDates: (state, action: PayloadAction<IAvailableDate[]>) => {
      state.availableDates = action.payload;
    },
    setSuggestionData: (
      state,
      action: PayloadAction<IBookingSuggestion | null>
    ) => {
      state.suggestionData = action.payload;
    },
    setSpecialtyId: (state, action: PayloadAction<number>) => {
      state.specialtyId = action.payload;
    },
    setServiceId: (state, action: PayloadAction<string>) => {
      state.serviceId = action.payload;
    },
    setDoctorId: (state, action: PayloadAction<string | undefined>) => {
      state.doctorId = action.payload;
    },
    resetBookingState(state) {
      return { ...initialState, customSelectStyles: state.customSelectStyles };
    },
    addPatient: (state, action: PayloadAction<IAddedPatient>) => {
      state.addedPatient = action.payload;
    },
    setAddingPatient: (state, action: PayloadAction<boolean>) => {
      state.addingPatient = action.payload;
    },
    setSelectedPatient: (state, action: PayloadAction<IPatient | null>) => {
      state.selectedPatient = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setShowConfirmModal: (state, action: PayloadAction<boolean>) => {
      state.isShowConfirmModal = action.payload;
    },
    clearPriorExaminationImg: (state) => {
      state.priorExaminationImg = [];
    },
  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(restoreSuggestion.fulfilled, (state) => {
  //       state.showRestoreSuggestion = false;
  //     })
  //     .addMatcher(
  //       (action) =>
  //         action.type.startsWith("booking/") &&
  //         action.type.endsWith("/pending"),
  //       (state) => {
  //         state.loading = true;
  //         state.error = null;
  //       }
  //     )
  //     .addMatcher(
  //       (action) =>
  //         action.type.startsWith("booking/") &&
  //         action.type.endsWith("/fulfilled"),
  //       (state) => {
  //         state.loading = false;
  //       }
  //     )
  //     .addMatcher(
  //       (action) =>
  //         action.type.startsWith("booking/") &&
  //         action.type.endsWith("/rejected"),
  //       (state, action) => {
  //         state.loading = false;
  //         state.error = action.error?.message || "Something went wrong";
  //       }
  //     )
  //     .addCase(submitBooking.pending, (state) => {
  //       state.isSubmitting = true;
  //       state.error = null;
  //     })
  //     .addCase(submitBooking.fulfilled, (state) => {
  //       state.isSubmitting = false;
  //       state.showConfirmModal = true;
  //     })
  //     .addCase(submitBooking.rejected, (state, action) => {
  //       state.isSubmitting = false;
  //       state.error = action.error.message || "Failed to submit booking";
  //     });
  // },
});

export const {
  setSymptoms,
  setLoading,
  setStep,
  // setPatient,
  setSelectedDate,
  setSelectedTime,
  setShowBookingForm,
  setSelectedSlotId,
  setPriorExaminationImg,
  setIsShowRestoreSuggestion,
  resetBookingState,
  setServices,
  setSpecialties,
  setDoctors,
  setAvailableDates,
  setAvailableSchedules,
  setSuggestionData,
  setSpecialtyId,
  setServiceId,
  setDoctorId,
  setPatients,
  addPatient,
  setAddingPatient,
  setSelectedPatient,
  setCurrentStep,
  setIsSubmitting,
  setShowConfirmModal,
  clearPriorExaminationImg,
} = bookingSlice.actions;

export const symptoms = (state: RootState) => state.booking.symptoms;
export const isLoading = (state: RootState) => state.booking.isLoading;
export const error = (state: RootState) => state.booking.error;
export const isShowBookingForm = (state: RootState) =>
  state.booking.isShowBookingForm;
export const currentStep = (state: RootState) => state.booking.currentStep;
export const patients = (state: RootState) => state.booking.patients;
export const selectedPatient = (state: RootState) =>
  state.booking.selectedPatient;
export const addingPatient = (state: RootState) => state.booking.addingPatient;
export const suggestionData = (state: RootState) =>
  state.booking.suggestionData;
export const services = (state: RootState) => state.booking.services;
export const serviceId = (state: RootState) => state.booking.serviceId;
export const specialties = (state: RootState) => state.booking.specialties;
export const specialtyId = (state: RootState) => state.booking.specialtyId;
export const doctors = (state: RootState) => state.booking.doctors;
export const doctorId = (state: RootState) => state.booking.doctorId;
export const availableDates = (state: RootState) =>
  state.booking.availableDates;
export const selectedDate = (state: RootState) => state.booking.selectedDate;
export const selectedTime = (state: RootState) => state.booking.selectedTime;
export const selectedSlotId = (state: RootState) =>
  state.booking.selectedSlotId;
export const showRestoreSuggestion = (state: RootState) =>
  state.booking.isShowRestoreSuggestion;
export const priorExaminationImg = (state: RootState) =>
  state.booking.priorExaminationImg;
// export const schedules = (state: RootState) => state.booking.schedules;
export const isSubmitting = (state: RootState) => state.booking.isSubmitting;
export const isShowConfirmModal = (state: RootState) =>
  state.booking.isShowConfirmModal;
export const customSelectStyles = (state: RootState) =>
  state.booking.customSelectStyles;

export default bookingSlice.reducer;
