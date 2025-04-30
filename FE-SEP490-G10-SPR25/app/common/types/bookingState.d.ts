interface IBookingState {
  symptoms: string;
  isLoading: boolean;
  error: string | null;
  isShowBookingForm: boolean;
  currentStep: number;
  addedPatient: IAddedPatient | null;
  patients: IPatient[];
  selectedPatient: IPatient | null;
  isAddingPatient: boolean;
  suggestionData: IBookingSuggestion | null;
  services: IService[];
  serviceId: string;
  specialties: ISpecialty[];
  specialtyId: string;
  doctors: IDoctorOption[];
  doctorId: string;
  availableDates: IAvailableDate[];
  selectedDate: string;
  selectedTime: string;
  selectedSlotId: string;
  isShowRestoreSuggestion: boolean;
  priorExaminationImgUrl: string | null;
  isSubmitting: boolean;
  isShowConfirmModal: boolean;
  availableSchedules: IAvailableSchedule[];
  customSelectStyles: StylesConfig<{ value: string; label: string }, false>;
}
