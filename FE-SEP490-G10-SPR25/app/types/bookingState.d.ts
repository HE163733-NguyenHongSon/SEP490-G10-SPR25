interface IBookingState {
  symptoms: string;
  isLoading: boolean;
  error: string | null;
  isShowBookingForm: boolean;
  currentStep: number;
  addedPatient: IAddedPatient | null;
  patients: IPatient[];
  selectedPatient: IPatient | null;
  addingPatient: boolean;
  suggestionData: IBookingSuggestion | null;
  services: IService[];
  serviceId: string;
  specialties: ISpecialty[];
  specialtyId: number;
  doctors: IDoctorOption[];
  doctorId: string;
  availableDates: IAvailableDate[];
  selectedDate: string;
  selectedTime: string;
  selectedSlotId: string;
  isShowRestoreSuggestion: boolean;
  priorExaminationImg: File | null;
  isSubmitting: boolean;
  isShowConfirmModal: boolean;
  availableSchedules: IAvailableSchedule[];
  customSelectStyles: React.CSSProperties;
}
