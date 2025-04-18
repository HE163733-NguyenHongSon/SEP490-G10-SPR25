import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUser } from "@/contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import { patientService } from "@/services/patientService";


interface BookingContextType {
  symptoms: string;
  setSymptoms: (val: string) => void;
  suggestionData: any;
  setSuggestionData: (val: any) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
  showBookingForm: boolean;
  setShowBookingForm: (val: boolean) => void;
  currentStep: number;
  setCurrentStep: (val: number) => void;
  patients: IPatient[];
  setPatients: (val: IPatient[]) => void;
  selectedPatient: IPatient | null;
  setSelectedPatient: (val: IPatient | null) => void;
  addingPatient: boolean;
  setAddingPatient: (val: boolean) => void;
  closeBookingForm: () => void;
  prevStep: () => void;
  nextStep: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBookingContext = () => {
  

  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }

  return context;
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [symptoms, setSymptoms] = useState<string>("");
  const [suggestionData, setSuggestionData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showBookingForm, setShowBookingForm] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);
  const [addingPatient, setAddingPatient] = useState<boolean>(false);
  const { user } = useUser();

  const { data: patientList, isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const pd = await patientService.getPatientDetailById(user?.userId);
      return pd?.dependents ? [pd as IPatient , ...pd.dependents] : [pd as IPatient]; // Merging dependents
    },
    staleTime: 30000,
    enabled: !!user?.userId,
  });
  useEffect(() => {
    if (patientList) {
      setPatients(patientList); // Set patients after fetching
    }
  }, [patientList]);

  const closeBookingForm = () => {
    setShowBookingForm(false);
    setSelectedPatient(null);
    setAddingPatient(false);
    setCurrentStep(1); // Reset step on close
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1)); // Prevent going below step 1
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3)); // Prevent going beyond step 3
  };

  return (
    <BookingContext.Provider
      value={{
        symptoms,
        setSymptoms,
        suggestionData,
        setSuggestionData,
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
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
