import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { useUser } from "@/contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import { patientService } from "@/services/patientService";
import reservationService from "@/services/reservationService";
import { specialtyService } from "@/services/specialtyService";
import { StylesConfig, SingleValue } from "react-select";

interface BookingContextType {
  // Form state
  symptoms: string;
  setSymptoms: (val: string) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;

  // Booking flow
  showBookingForm: boolean;
  setShowBookingForm: (val: boolean) => void;
  currentStep: number;
  setCurrentStep: (val: number) => void;
  closeBookingForm: () => void;
  prevStep: () => void;
  nextStep: () => void;

  // Patient data
  patients: IPatient[];
  setPatients: (val: IPatient[]) => void;
  selectedPatient: IPatient | null;
  setSelectedPatient: (val: IPatient | null) => void;
  addingPatient: boolean;
  setAddingPatient: (val: boolean) => void;

  // Booking suggestion
  suggestionData: IBookingSuggestion | null;
  setSuggestionData: (val: IBookingSuggestion | null) => void;

  // Service selection
  services: IService[];
  setServices: (val: IService[]) => void;
  serviceId: number | string;
  setServiceId: (val: number | string) => void;

  // Specialty selection
  specialties: ISpecialty[];
  setSpecialties: (val: ISpecialty[]) => void;
  specialtyId: number;
  setSpecialtyId: (val: number) => void;
  showRestoreSuggestion: boolean;
  setShowRestoreSuggestion: (val: boolean) => void;
  handleSpecialtyChange: (
    option: SingleValue<{ value: number | string; label: string }>
  ) => void;
  restoreSuggestion?: () => void;

  // Doctor selection
  doctors: IDoctorOption[];
  setDoctors: (val: IDoctorOption[]) => void;
  doctorId: string | undefined;
  setDoctorId: (val: string | undefined) => void;

  // Date/time selection
  availableDates: IAvailableDate[];
  setAvailableDates: (dates: IAvailableDate[]) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  selectedSlotId: string;
  setSelectedSlotId: (id: string) => void;
  formatAppointmentDate: (date: string) => string;

  // UI Styles
  customStyles: StylesConfig<{ value: string | number; label: string }, false>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({
  children,
}) => {
  // Form state
  const [symptoms, setSymptoms] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Booking flow
  const [showBookingForm, setShowBookingForm] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Patient data
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);
  const [addingPatient, setAddingPatient] = useState<boolean>(false);

  // Booking suggestion
  const [suggestionData, setSuggestionData] =
    useState<IBookingSuggestion | null>(null);

  // Service selection
  const [services, setServices] = useState<IService[]>([]);
  const [serviceId, setServiceId] = useState<number | string>("");

  // Specialty selection
  const [specialties, setSpecialties] = useState<ISpecialty[]>([]);
  const [specialtyId, setSpecialtyId] = useState<number>(0);
  const [showRestoreSuggestion, setShowRestoreSuggestion] = useState(false);

  // Doctor selection
  const [doctors, setDoctors] = useState<IDoctorOption[]>([]);
  const [doctorId, setDoctorId] = useState<string | undefined>(undefined);

  // Date/time selection
  const [availableDates, setAvailableDates] = useState<IAvailableDate[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");

  const { user } = useUser();

  // Slot selection

  // Format date for display
  const formatAppointmentDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, []);

  // Default select styles
  const customStyles = useMemo<
    StylesConfig<{ value: string | number; label: string }, false>
  >(
    () => ({
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
        backgroundColor:
          state.isSelected || state.isFocused ? "#f3f4f6" : "white",
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
    }),
    []
  );

  // Fetch patient data
  const { data: patientList } = useQuery({
    queryKey: ["patients", user?.userId],
    queryFn: async () => {
      if (!user?.userId) return [];
      const pd = await patientService.getPatientDetailById(user.userId);
      return pd?.dependents
        ? [pd as IPatient, ...pd.dependents]
        : [pd as IPatient];
    },
    staleTime: 30000,
    enabled: !!user?.userId,
  });

  // Update patients when data is fetched
  useEffect(() => {
    if (patientList) {
      setPatients(patientList);
    }
  }, [patientList]);

  useEffect(() => {
    const fetchSuggestionData = async () => {
      setLoading(true);
      try {
        const data = await reservationService.getBookingSuggestion(
          selectedPatient?.userId,
          symptoms
        );
        const specialties = await specialtyService.getSpecialtyList();
        localStorage.setItem("bookingSuggestion", JSON.stringify(data));
        setSuggestionData(data);

        setSpecialtyId(Number(data?.specialty?.specialtyId ?? specialtyId));
        setSpecialties(specialties);
      } catch (error) {
        console.error("Lỗi khi lấy gợi ý lịch khám:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedPatient?.userId && symptoms) {
      fetchSuggestionData();
    }
  }, [selectedPatient, symptoms]);

  // Form control functions
  const closeBookingForm = useCallback(() => {
    setShowBookingForm(false);
    setSelectedPatient(null);
    setAddingPatient(false);
    setCurrentStep(1);
    // Reset date/time selection
    setSelectedDate("");
    setSelectedTime("");
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  }, []);

  const handleSpecialtyChange = useCallback(
    (option: SingleValue<{ value: number | string; label: string }>) => {
      if (option) {
        setSpecialtyId(Number(option.value));
        setSuggestionData(null);
        setShowRestoreSuggestion(true);
      }
    },
    [setSpecialtyId, setSuggestionData, setShowRestoreSuggestion]
  );
  const restoreSuggestion = () => {
    const storedSuggestion = localStorage.getItem("bookingSuggestion");
    console.log("storedSuggestion", storedSuggestion);
    if (storedSuggestion) {
      const parsedData = JSON.parse(storedSuggestion);
      setSuggestionData(parsedData);
      setSpecialtyId(Number(parsedData?.specialty?.specialtyId ?? specialtyId));
      setServiceId(parsedData?.service?.serviceId || "");
      setDoctorId(parsedData?.availableSchedules[0]?.doctorScheduleId || "");
      setShowRestoreSuggestion(false);
    }
  };

  // Example usage of restoreSuggestion
  useEffect(() => {
    restoreSuggestion();
  }, []);

  // Context value
  const contextValue = useMemo<BookingContextType>(
    () => ({
      symptoms,
      setSymptoms,
      loading,
      setLoading,
      showBookingForm,
      setShowBookingForm,
      currentStep,
      setCurrentStep,
      patients,
      setPatients,
      selectedPatient,
      setSelectedPatient,
      addingPatient,
      setAddingPatient,
      closeBookingForm,
      prevStep,
      nextStep,
      suggestionData,
      setSuggestionData,
      services,
      setServices,
      serviceId,
      setServiceId,
      specialties,
      setSpecialties,
      specialtyId,
      setSpecialtyId,
      doctors,
      setDoctors,
      doctorId,
      setDoctorId,
      availableDates,
      setAvailableDates,
      selectedDate,
      setSelectedDate,
      selectedTime,
      setSelectedTime,
      formatAppointmentDate,
      selectedSlotId,
      setSelectedSlotId,
      customStyles,
      showRestoreSuggestion,
      setShowRestoreSuggestion,
      handleSpecialtyChange,
      restoreSuggestion,
    }),
    [
      symptoms,
      setSymptoms,
      loading,
      setLoading,
      showBookingForm,
      setShowBookingForm,
      currentStep,
      setCurrentStep,
      patients,
      setPatients,
      selectedPatient,
      setSelectedPatient,
      addingPatient,
      setAddingPatient,
      suggestionData,
      setSuggestionData,
      services,
      setServices,
      serviceId,
      setServiceId,
      specialties,
      setSpecialties,
      specialtyId,
      setSpecialtyId,
      doctors,
      setDoctors,
      doctorId,
      setDoctorId,
      availableDates,
      setAvailableDates,
      selectedDate,
      setSelectedDate,
      selectedTime,
      setSelectedTime,
      formatAppointmentDate,
      selectedSlotId,
      setSelectedSlotId,
      customStyles,
      closeBookingForm,
      prevStep,
      nextStep,
      showRestoreSuggestion,
      setShowRestoreSuggestion,
      handleSpecialtyChange,
      restoreSuggestion,
    ]
  );

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
};
