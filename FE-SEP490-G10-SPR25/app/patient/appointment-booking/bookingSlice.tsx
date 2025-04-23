import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { restoreSuggestion, fetchServices, fetchSpecialties, fetchDoctors, fetchAvailableDates, submitBooking } from "./bookingThunks";

// Định nghĩa interface cho state của booking
interface BookingState {
  symptoms: string;
  loading: boolean;
  error: string | null;
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
  error: null,
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
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
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
    resetBookingState: (state) => {
      return { ...initialState, customSelectStyles: state.customSelectStyles };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreSuggestion.fulfilled, (state) => {
        state.showRestoreSuggestion = false;
      })
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch services";
      })
      .addCase(fetchSpecialties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecialties.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchSpecialties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch specialties";
      })
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch doctors";
      })
      .addCase(fetchAvailableDates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableDates.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchAvailableDates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch available dates";
      })
      .addCase(submitBooking.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(submitBooking.fulfilled, (state) => {
        state.isSubmitting = false;
        state.showConfirmModal = true;
      })
      .addCase(submitBooking.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.error.message || "Failed to submit booking";
      });
  },
});

export const {
  setSymptoms,
  setLoading,
  setError,
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
  resetBookingState,
} = bookingSlice.actions;

// Add selectors
export const selectBooking = (state: { booking: BookingState }) => state.booking;
export const selectSpecialties = (state: { booking: BookingState }) => state.booking.specialties;
export const selectServices = (state: { booking: BookingState }) => state.booking.services;
export const selectDoctors = (state: { booking: BookingState }) => state.booking.doctors;
export const selectSymptoms = (state: { booking: BookingState }) => state.booking.symptoms;

export default bookingSlice.reducer;
