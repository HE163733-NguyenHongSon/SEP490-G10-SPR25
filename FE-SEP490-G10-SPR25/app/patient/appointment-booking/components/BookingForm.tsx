// BookingForm.tsx
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useCallback, useState, useEffect } from "react";
import { emailService } from "@/common/services/emailService";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useRouter } from "next/navigation";
import { useUser } from "@/common/contexts/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setIsShowBookingForm,
  setCurrentStep,
  setServiceId,
  setServices,
  setSpecialties,
  setSpecialtyId,
  setDoctors,
  setDoctorId,
  setSelectedPatient,
  setIsShowRestoreSuggestion,
  setIsSubmitting,
  setIsShowConfirmModal,
  setSuggestionData,
  setSelectedDate,
  setSelectedTime,
  setSymptoms,
  setIsLoading,
} from "../redux/bookingSlice";
import PatientInfor from "./PatientInfor";
import BookingInfor from "./BookingInfor";
import BookingConfirmation from "./BookingConfirmation";
import BookingStepper from "./BookingStepper";
import { handleVNPayPayment } from "@/common/services/vnPayService";
import { toast } from "react-toastify";
import ReactDOMServer from "react-dom/server";
import * as signalR from "@microsoft/signalr";

const BookingForm = () => {
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user?.userId) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`/hubs/notifications?userId=${user.userId}`)
      .withAutomaticReconnect()
      .build();

    connection.on("ScheduleConflict", (data) => {
      alert(data.message);
    });

    connection
      .start()
      .catch((err) => console.error("SignalR connection error:", err));

    return () => {
      connection.stop();
    };
  }, [user?.userId]);

  const {
    isShowBookingForm,
    currentStep,
    selectedPatient,
    selectedDate,
    selectedTime,
    symptoms,
    services,
    serviceId,
    doctorId,
    isSubmitting,
    isShowConfirmModal,
    availableSchedules,
    isFormValid,
  } = useSelector((state: RootState) => state.booking);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    dispatch(setIsSubmitting(true));

    try {
      const scheduleDateTime = `${selectedDate}T${selectedTime}`;
      const matchedSchedule = availableSchedules?.find(
        (s) =>
          s.doctorId?.toString() === doctorId &&
          s.appointmentDate === scheduleDateTime
      );

      const service = services.find(
        (s) => String(s.serviceId) === String(serviceId)
      );

      const reservation: IAddedReservation = {
        patientId: selectedPatient?.userId,
        doctorScheduleId: matchedSchedule?.doctorScheduleId?.toString(),
        reason: symptoms || "",
        appointmentDate: matchedSchedule?.appointmentDate,
        createdByUserId: selectedPatient?.userId,
        updatedByUserId: selectedPatient?.userId,
      };
      await handleVNPayPayment({
        payerId: selectedPatient?.userId,
        reservation,
        paymentMethod: "VNPay",
        amount: service?.price,
      });
      toast.info("Đang chuyển hướng đến cổng thanh toán VNPay...");

      setTimeout(() => confirmCancel(), 1000);
    } catch (err) {
      toast.error(error || "Đã xảy ra lỗi");
    } finally {
      dispatch(setIsSubmitting(false));
    }
  };

  const handleBack = useCallback(() => {
    if (currentStep === 1) {
      dispatch(setIsShowConfirmModal(true));
    } else {
      if (currentStep === 2) dispatch(setServices([]));
      dispatch(setCurrentStep(currentStep - 1));
    }
  }, [dispatch, currentStep]);

  const confirmCancel = useCallback(() => {
    dispatch(setIsShowBookingForm(false));
    dispatch(setIsShowConfirmModal(false));
    dispatch(setCurrentStep(1));
    dispatch(setServices([]));
    dispatch(setServiceId(""));
    dispatch(setIsSubmitting(false));
    dispatch(setSpecialties([]));
    dispatch(setSpecialtyId(""));
    dispatch(setDoctors([]));
    dispatch(setDoctorId(""));
    dispatch(setSelectedDate(""));
    dispatch(setSelectedTime(""));
    dispatch(setSelectedPatient(null));
    dispatch(setSuggestionData(null));
    dispatch(setSymptoms(""));
    dispatch(setIsLoading(false));
    dispatch(setIsShowRestoreSuggestion(false));
    router.push("/patient");
  }, [dispatch]);

  if (!isShowBookingForm) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isMounted ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => dispatch(setIsShowConfirmModal(true))}
      />
      <div
        className={`relative z-50 top-14 w-full md:w-2/3 lg:w-2/3 h-[90vh] bg-white rounded-2xl shadow-2xl p-6 flex flex-col transition-opacity duration-300 ${
          isMounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBack}
            className="text-cyan-600 hover:text-cyan-800 font-semibold flex items-center"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Quay lại
          </button>
          {currentStep < 3 && isFormValid && (
            <button
              onClick={() => dispatch(setCurrentStep(currentStep + 1))}
              className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition"
            >
              Tiếp theo
            </button>
          )}
          {currentStep === 3 && (
            <button
              type="submit"
              onClick={() =>
                handleSubmit(
                  new Event(
                    "submit"
                  ) as unknown as React.FormEvent<HTMLFormElement>
                )
              }
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-md transition text-white ${
                isSubmitting
                  ? "bg-cyan-300 cursor-not-allowed"
                  : "bg-cyan-600 hover:bg-cyan-700"
              }`}
            >
              {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt lịch"}
            </button>
          )}
        </div>

        <BookingStepper />

        <div className="flex-1 mt-6 min-h-[400px] overflow-y-auto">
          {currentStep === 1 && <PatientInfor />}
          {currentStep === 2 && <BookingInfor />}
          {currentStep === 3 && <BookingConfirmation />}
        </div>
      </div>

      {isShowConfirmModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-xl p-8 w-[90%] max-w-[550px] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Bạn có chắc chắn muốn hủy đặt lịch?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Thao tác này sẽ xóa tất cả thông tin bạn đã nhập...
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => dispatch(setIsShowConfirmModal(false))}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:underline"
              >
                Không
              </button>
              <button
                onClick={confirmCancel}
                className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600"
              >
                Hủy đặt lịch
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Lỗi!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
