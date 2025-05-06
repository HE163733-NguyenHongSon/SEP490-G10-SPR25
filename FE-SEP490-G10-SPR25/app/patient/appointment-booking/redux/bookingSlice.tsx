import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { addPatientAsync } from "./bookingThunks";
import { StylesConfig } from "react-select";
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
    backgroundColor: state.isSelected || state.isFocused ? "#f3f4f6" : "white",
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

const initialState: IBookingState = {
  symptoms: "",
  isLoading: false,
  error: null,
  isShowBookingForm: false,
  currentStep: 1,
  addedPatient: null,
  patients: [],
  selectedPatient: null,
  isAddingPatient: false,
  suggestionData: null,
  services: [],
  serviceId: "",
  specialties: [],
  specialtyId: "",
  doctors: [],
  doctorId: "",
  availableDates: [],
  selectedDate: "",
  selectedTime: "",
  selectedSlotId: "",
  isShowRestoreSuggestion: false,
  isUseSuggestion: true,
  priorExaminationImgUrl: null,
  isSubmitting: false,
  isShowConfirmModal: false,
  isFormValid: true,
  availableSchedules: [],
  customSelectStyles: customStyles,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setSymptoms: (state, action: PayloadAction<string>) => {
      state.symptoms = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
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
    setIsShowBookingForm: (state, action: PayloadAction<boolean>) => {
      state.isShowBookingForm = action.payload;
    },
    setSelectedSlotId: (state, action: PayloadAction<string>) => {
      state.selectedSlotId = action.payload;
    },

    setIsShowRestoreSuggestion: (state, action: PayloadAction<boolean>) => {
      state.isShowRestoreSuggestion = action.payload;
    },
    setIsUseSuggestion: (state, action: PayloadAction<boolean>) => {
      state.isUseSuggestion = action.payload;
    },
    setIsFormValid: (state, action: PayloadAction<boolean>) => {
      state.isFormValid = action.payload;
    },
    setServices: (state, action: PayloadAction<IService[]>) => {
      state.services = action.payload;
    },
    setSpecialties: (state, action: PayloadAction<ISpecialty[]>) => {
      state.specialties = action.payload;
    },

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
    setSpecialtyId: (state, action: PayloadAction<string>) => {
      state.specialtyId = action.payload;
    },
    setServiceId: (state, action: PayloadAction<string>) => {
      state.serviceId = action.payload;
    },
    setDoctorId: (state, action: PayloadAction<string>) => {
      state.doctorId = action.payload;
    },
    resetBookingState(state) {
      return { ...initialState, customSelectStyles: state.customSelectStyles };
    },
    addPatient: (state, action: PayloadAction<IAddedPatient>) => {
      state.addedPatient = action.payload;
    },
    setIsAddingPatient: (state, action: PayloadAction<boolean>) => {
      state.isAddingPatient = action.payload;
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
    setIsShowConfirmModal: (state, action: PayloadAction<boolean>) => {
      state.isShowConfirmModal = action.payload;
    },
    setPriorExaminationImgUrl: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.priorExaminationImgUrl = action.payload;
    },
    clearPriorExaminationImgUrl: (state) => {
      state.priorExaminationImgUrl = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPatientAsync.fulfilled, (state, action) => {
        state.addedPatient = action.payload;
        state.isAddingPatient = false;
      })
      .addCase(addPatientAsync.pending, (state) => {
        state.isAddingPatient = true;
      })
      .addCase(addPatientAsync.rejected, (state) => {
        state.isAddingPatient = false;
      });
  },
});

export const {
  setSymptoms,
  setIsLoading,
  setStep,
  setSelectedDate,
  setSelectedTime,
  setIsShowBookingForm,
  setSelectedSlotId,
  setPriorExaminationImgUrl,
  setIsShowRestoreSuggestion,
  setIsUseSuggestion,
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
  setIsAddingPatient,
  setSelectedPatient,
  setCurrentStep,
  setIsSubmitting,
  setIsShowConfirmModal,
  clearPriorExaminationImgUrl,
  setIsFormValid,
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
export const isAddingPatient = (state: RootState) =>
  state.booking.isAddingPatient;
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

export const isShowRestoreSuggestion = (state: RootState) =>
  state.booking.isShowRestoreSuggestion;
export const isFormValid = (state: RootState) => state.booking.isFormValid;
export const priorExaminationImg = (state: RootState) =>
  state.booking.priorExaminationImgUrl;
// export const schedules = (state: RootState) => state.booking.schedules;
export const isSubmitting = (state: RootState) => state.booking.isSubmitting;
export const isShowConfirmModal = (state: RootState) =>
  state.booking.isShowConfirmModal;
export const customSelectStyles = (state: RootState) =>
  state.booking.customSelectStyles;

export default bookingSlice.reducer;
