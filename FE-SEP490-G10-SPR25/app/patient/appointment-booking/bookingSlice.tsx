import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { restoreSuggestion } from "./bookingThunks";

// Định nghĩa interface cho state của booking
interface BookingState {
  symptoms: string;
  loading: boolean;
  showBookingForm: boolean;
  currentStep: number;
  patients: IPatient[];
  selectedPatient: IPatient | null;
  addingPatient: boolean;
  suggestionData: IBookingSuggestion | null;
  services: IService[];
  serviceId: number | string;
  specialties: ISpecialty[];
  specialtyId: number;
  doctors: IDoctorOption[];
  doctorId: string | undefined;
  availableDates: IAvailableDate[];
  selectedDate: string;
  selectedTime: string;
  selectedSlotId: string;
  showRestoreSuggestion: boolean;
  priorExaminationImg: string | null;
  schedules: IAvailableDate[];
  isSubmitting: boolean;
  showConfirmModal: boolean;
  customSelectStyles: React.CSSProperties;
}

const initialState: BookingState = {
  symptoms: "",
  loading: false,
  showBookingForm: false,
  currentStep: 1,
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
  showRestoreSuggestion: false,
  priorExaminationImg: null,
  schedules: [],
  isSubmitting: false,
  showConfirmModal: false,
  customSelectStyles: {},
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setCustomSelectStyles(state, action: PayloadAction<React.CSSProperties>) {
      state.customSelectStyles = action.payload;
    },
    setSymptoms: (state, action: PayloadAction<string>) => {
      state.symptoms = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setShowBookingForm: (state, action: PayloadAction<boolean>) => {
      state.showBookingForm = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setPatients: (state, action: PayloadAction<IPatient[]>) => {
      state.patients = action.payload;
    },
    setSelectedPatient: (state, action: PayloadAction<IPatient | null>) => {
      state.selectedPatient = action.payload;
    },
    setAddingPatient: (state, action: PayloadAction<boolean>) => {
      state.addingPatient = action.payload;
    },
    setSuggestionData: (
      state,
      action: PayloadAction<IBookingSuggestion | null>
    ) => {
      state.suggestionData = action.payload;
    },
    setServices: (state, action: PayloadAction<IService[]>) => {
      state.services = action.payload;
    },
    setServiceId: (state, action: PayloadAction<number | string>) => {
      state.serviceId = action.payload;
    },
    setSpecialties: (state, action: PayloadAction<ISpecialty[]>) => {
      state.specialties = action.payload;
    },
    setSpecialtyId: (state, action: PayloadAction<number>) => {
      state.specialtyId = action.payload;
    },
    setDoctors: (state, action: PayloadAction<IDoctorOption[]>) => {
      state.doctors = action.payload;
    },
    setDoctorId: (state, action: PayloadAction<string | undefined>) => {
      state.doctorId = action.payload;
    },
    setAvailableDates: (state, action: PayloadAction<IAvailableDate[]>) => {
      state.availableDates = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setSelectedTime: (state, action: PayloadAction<string>) => {
      state.selectedTime = action.payload;
    },
    setSelectedSlotId: (state, action: PayloadAction<string>) => {
      state.selectedSlotId = action.payload;
    },
    setShowRestoreSuggestion: (state, action: PayloadAction<boolean>) => {
      state.showRestoreSuggestion = action.payload;
    },
    setPriorExaminationImg: (state, action: PayloadAction<string | null>) => {
      state.priorExaminationImg = action.payload;
    },
    setSchedules: (state, action: PayloadAction<IAvailableDate[]>) => {
      state.schedules = action.payload;
    },
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setShowConfirmModal: (state, action: PayloadAction<boolean>) => {
      state.showConfirmModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(restoreSuggestion.fulfilled, (state) => {
      state.showRestoreSuggestion = false;
    });
  },
});

export const {
  setSymptoms,
  setLoading,
  setShowBookingForm,
  setCurrentStep,
  setPatients,
  setSelectedPatient,
  setAddingPatient,
  setSuggestionData,
  setServices,
  setServiceId,
  setSpecialties,
  setSpecialtyId,
  setDoctors,
  setDoctorId,
  setAvailableDates,
  setSelectedDate,
  setSelectedTime,
  setSelectedSlotId,
  setShowRestoreSuggestion,
  setPriorExaminationImg,
  setSchedules,
  setIsSubmitting,
  setShowConfirmModal,
} = bookingSlice.actions;

export default bookingSlice.reducer;
