"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { doctorService } from "../../../common/services/doctorService";
import { medicalRecordService } from "../../../common/services/medicalRecordService";
import { getCurrentUser } from "../../../common/services/authService";
import {
  Calendar,
  Clock,
  Award,
  ChevronLeft,
  CheckCircle,
  FilePlus,
  FileText,
  User,
  Users,
  Phone,
  Mail,
  MapPin,
  ClipboardList,
  Clock3,
  Calendar as CalendarIcon,
  Activity,
  AlertCircle,
  Search,
} from "lucide-react";
import dayjs from "dayjs";
import Image from "next/image";
import AppointmentCancellationModal from '../../components/AppointmentCancellationModal';
import { toast } from 'react-toastify';

export default function AppointmentDetails() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [appointment, setAppointment] = useState<IReservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [medicalHistory, setMedicalHistory] = useState<IMedicalRecord[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState<any>(null);
  const [existingMedicalRecord, setExistingMedicalRecord] =
    useState<IMedicalRecord | null>(null);
  const [checkingExistingRecord, setCheckingExistingRecord] = useState(false);
  const [showNewRecordForm, setShowNewRecordForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHistory, setFilteredHistory] = useState<IMedicalRecord[]>([]);
  const [expandedRecords, setExpandedRecords] = useState<string[]>([]);
  const [showPreviousRecordModal, setShowPreviousRecordModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<IMedicalRecord | null>(
    null
  );
  // New state for cancellation modal
  const [showCancellationModal, setShowCancellationModal] = useState(false);

  // Form state
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [noShowSuccess, setNoShowSuccess] = useState(false);

  // Get current user ID from auth
  useEffect(() => {
    const user = getCurrentUser();
    console.log("Current logged in user:", user);
    setCurrentDoctor(user);
  }, []);

  // Get current user ID if needed
  const getUserId = () => {
    if (currentDoctor && currentDoctor.userId) {
      return currentDoctor.userId;
    }
    // Fallback to hardcoded ID if auth fails
    console.warn("Failed to get user ID from auth, using fallback ID");
    return 33;
  };

  // Lọc lịch sử bệnh án theo tìm kiếm
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredHistory(medicalHistory);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = medicalHistory.filter(
      (record) =>
        (record.symptoms &&
          record.symptoms.toLowerCase().includes(searchLower)) ||
        (record.diagnosis &&
          record.diagnosis.toLowerCase().includes(searchLower)) ||
        (record.treatmentPlan &&
          record.treatmentPlan.toLowerCase().includes(searchLower)) ||
        (record.notes && record.notes.toLowerCase().includes(searchLower))
    );

    setFilteredHistory(filtered);
  }, [searchTerm, medicalHistory]);

  // Hàm kiểm tra bệnh án đã tồn tại
  const checkExistingMedicalRecord = async (reservationId: string) => {
    try {
      setCheckingExistingRecord(true);
      // Tìm bệnh án trong medical history nếu có
      const existingRecord = medicalHistory.find(
        (record) => record.reservationId === reservationId
      );

      if (existingRecord) {
        console.log(
          "Found existing medical record in history:",
          existingRecord
        );
        setExistingMedicalRecord(existingRecord);
        return;
      }

      // Nếu không tìm thấy trong history, thử lấy từ API
      try {
        console.log(`Starting to check for medical record with reservation ID: ${reservationId}`);
        // Tải bệnh án hiện tại nếu có
        const record = await medicalRecordService.getMedicalRecordDetailById(
          parseInt(reservationId)
        );
        console.log("Medical record API response:", record);
        
        // Chuyển đổi từ IMedicalRecordDetail sang IMedicalRecord
        const medicalRecord: IMedicalRecord = {
          reservationId: record.reservationId,
          appointmentDate: record.appointmentDate,
          symptoms: record.symptoms,
          diagnosis: record.diagnosis,
          treatmentPlan: record.treatmentPlan,
          followUpDate: record.followUpDate,
          notes: record.notes,
          patientName: record.patientName || record.reservation?.patient?.userName,
          patientGender: record.patientGender || record.reservation?.patient?.gender,
          patientDob: record.patientDob,
          patientId: record.patientId || 
                    (record.reservation?.patient?.userId ? 
                    parseInt(record.reservation.patient.userId.toString()) : undefined),
          // Đảm bảo cấu trúc của reservation phù hợp với IMedicalRecord
          reservation: record.reservation ? {
            ...record.reservation,
            patient: record.reservation.patient ? {
              ...record.reservation.patient,
              // Chuyển đổi string thành number nếu cần
              userId: record.reservation.patient.userId ? 
                     parseInt(record.reservation.patient.userId.toString()) : undefined
            } : undefined
          } : undefined
        };
        
        setExistingMedicalRecord(medicalRecord);
      } catch (error) {
        console.log(
          "No existing medical record found via API, this is expected if none exists"
        );
        // Không làm gì nếu không tìm thấy - đây là trường hợp bình thường nếu chưa có bệnh án
      }
    } catch (error) {
      console.error("Error checking existing medical record:", error);
    } finally {
      setCheckingExistingRecord(false);
    }
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        setLoading(true);
        // In a real app, you would get the appointment data from the API
        // For now, we'll just use a placeholder
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Reservations/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch appointment");

        const data = await response.json();
        setAppointment(data);

        // Check if first visit and get medical history
        if (data.patient?.patientId) {
          setHistoryLoading(true);
          try {
            const isFirst = await doctorService.isFirstTimePatient(
              data.patient.patientId
            );
            setIsFirstVisit(isFirst);

            if (!isFirst) {
              const history = await doctorService.getPatientMedicalHistory(
                data.patient.patientId
              );
              setMedicalHistory(history);
              setFilteredHistory(history);

              // Kiểm tra xem lịch hẹn hiện tại đã có bệnh án chưa
              if (
                history.some(
                  (record) => record.reservationId === data.reservationId
                )
              ) {
                const currentRecord = history.find(
                  (record) => record.reservationId === data.reservationId
                );
                if (currentRecord) {
                  setExistingMedicalRecord(currentRecord);
                }
              }
            }
          } catch (error) {
            console.error("Error fetching patient history:", error);
          } finally {
            setHistoryLoading(false);
          }
        }

        // Kiểm tra bệnh án hiện có cho lịch hẹn này
        if (data.reservationId) {
          await checkExistingMedicalRecord(data.reservationId);
        }
      } catch (error) {
        console.error("Error fetching appointment:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAppointment();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!appointment) return;

    try {
      setSubmitting(true);

      // Ensure reservationId is a number
      const reservationIdNumber = parseInt(appointment.reservationId);

      const medicalRecord: IMedicalRecord = {
        reservationId: appointment.reservationId,
        appointmentDate: appointment.appointmentDate,
        symptoms,
        diagnosis,
        treatmentPlan,
        followUpDate: followUpDate
          ? new Date(followUpDate).toISOString()
          : undefined,
        notes,
      };

      console.log("Submitting medical record:", medicalRecord);

      // Tạo medical record - backend tự động cập nhật trạng thái reservation
      const result = await doctorService.createMedicalRecord(
        reservationIdNumber,
        medicalRecord
      );
      console.log("Medical record created successfully:", result);

      setSuccess(true);

      // Cập nhật state để hiển thị bệnh án mới
      setExistingMedicalRecord(result);
      setShowNewRecordForm(false);

      // Redirect after short delay
      setTimeout(() => {
        router.push("/doctor/appointments");
      }, 2000);
    } catch (error) {
      console.error("Error creating medical record:", error);

      // Kiểm tra nếu lỗi là "bệnh án đã tồn tại"
      const errorMessage =
        error instanceof Error ? error.message : "Lỗi không xác định";
      if (errorMessage.includes("tồn tại") || errorMessage.includes("500")) {
        alert("Bệnh án đã tồn tại cho lịch hẹn này! Hãy kiểm tra lại.");
        // Thử tải lại bệnh án hiện tại
        if (appointment?.reservationId) {
          await checkExistingMedicalRecord(appointment.reservationId);
        }
      } else {
        alert(`Lỗi khi tạo hồ sơ y tế: ${errorMessage}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Format date và time để hiển thị
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return dayjs(dateString).format("DD/MM/YYYY");
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return "";
    return timeString.substring(0, 5);
  };

  // Hàm highlight text đang tìm kiếm
  const highlightText = (text: string, term: string) => {
    if (!term.trim() || !text) return text;

    const parts = text.split(new RegExp(`(${term})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === term.toLowerCase() ? (
            <span key={i} className="bg-yellow-200">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // Toggle expanded record
  const toggleExpandRecord = (recordId: string) => {
    setExpandedRecords((prev) =>
      prev.includes(recordId)
        ? prev.filter((id) => id !== recordId)
        : [...prev, recordId]
    );
  };

  // Hiển thị modal xem bệnh án trước đó
  const showPreviousRecord = () => {
    console.log("Showing previous record modal");
    if (medicalHistory.length > 0) {
      console.log("Setting selected record:", medicalHistory[0]);
      setSelectedRecord(medicalHistory[0]); // Lấy bệnh án gần nhất
      setShowPreviousRecordModal(true);
    } else {
      console.log("No medical history found");
      alert("Không tìm thấy hồ sơ bệnh án trước đây");
    }
  };

  // Handle appointment cancellation
  const handleCancelAppointment = () => {
    setShowCancellationModal(true);
  };

  // After cancellation requested
  const handleCancellationRequested = () => {
    // Chỉ thông báo, không chuyển hướng vì lịch chưa được hủy
    toast.success("Yêu cầu hủy lịch đã được gửi đến lễ tân");
  };

  // Thêm hàm xử lý khi bệnh nhân không đến
  const handlePatientNoShow = async () => {
    if (!appointment) return;
    
    if (!confirm('Xác nhận bệnh nhân không đến cuộc hẹn này?')) {
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Gọi API để cập nhật trạng thái "Không đến"
      const result = await doctorService.updateAppointmentStatus(
        parseInt(appointment.reservationId),
        "Không đến"
      );
      
      if (result) {
        setNoShowSuccess(true);
        
        // Redirect after short delay
        setTimeout(() => {
          router.push("/doctor/appointments");
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating to no-show status:", error);
      alert(`Lỗi khi cập nhật trạng thái: ${error instanceof Error ? error.message : 'Lỗi không xác định'}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-center">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="p-6">
        <p className="text-center">Không tìm thấy thông tin lịch hẹn</p>
        <div className="mt-4 text-center">
          <Link
            href="/doctor/appointments"
            className="text-indigo-600 hover:text-indigo-800"
          >
            ← Quay lại danh sách lịch hẹn
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-in-out;
        }
      `}</style>
      <div className="mb-6">
        <Link
          href="/doctor/appointments"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ChevronLeft size={16} className="mr-1" />
          Quay lại danh sách lịch hẹn
        </Link>
      </div>

      {success ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            <h2 className="text-xl font-semibold text-green-800">
              Hồ sơ bệnh án đã được lưu thành công
            </h2>
          </div>
          <p className="mt-2 text-green-700">
            Hồ sơ bệnh án đã được lưu và bệnh nhân có thể xem được thông tin
            này.
          </p>
          <p className="mt-2 text-green-700">
            Trạng thái lịch hẹn đã được cập nhật thành "Hoàn thành".
          </p>
          <p className="mt-4 text-green-700">
            Đang chuyển hướng về trang danh sách lịch hẹn...
          </p>
          <div className="mt-4">
            <button
              onClick={() => router.push("/doctor/appointments")}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Quay lại danh sách lịch hẹn
            </button>
          </div>
        </div>
      ) : noShowSuccess ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-yellow-800">
              Đã xác nhận bệnh nhân không đến
            </h2>
          </div>
          <p className="mt-2 text-yellow-700">
            Trạng thái lịch hẹn đã được cập nhật thành "Không đến".
          </p>
          <p className="mt-4 text-yellow-700">
            Đang chuyển hướng về trang danh sách lịch hẹn...
          </p>
          <div className="mt-4">
            <button
              onClick={() => router.push("/doctor/appointments")}
              className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
            >
              Quay lại danh sách lịch hẹn
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Header với tiêu đề và thông tin */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Chi tiết cuộc hẹn
              </h1>
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {appointment.status || "Đang xử lý"}
                </span>
                
                {/* Thêm nút "Bệnh nhân không đến" */}
                {appointment.status !== 'Hoàn thành' && appointment.status !== 'Không đến' && appointment.status !== 'Cancelled' && (
                  <button 
                    onClick={handlePatientNoShow}
                    disabled={submitting}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium hover:bg-yellow-200 transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="17" y1="8" x2="23" y2="14"></line><line x1="23" y1="8" x2="17" y2="14"></line></svg>
                    Bệnh nhân không đến
                  </button>
                )}
                
                {/* Nút yêu cầu hủy lịch hiện tại */}
                {appointment.status !== 'Hoàn thành' && appointment.status !== 'Cancelled' && (
                  <button 
                    onClick={handleCancelAppointment}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium hover:bg-red-200 transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                    Yêu cầu hủy lịch
                  </button>
                )}
              </div>
            </div>

            {/* Notification for returning patients */}
            {!isFirstVisit && medicalHistory.length > 0 && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start">
                <FileText className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-800">
                    Bệnh nhân đã có tiền sử khám chữa bệnh
                  </h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Bệnh nhân này đã khám {medicalHistory.length} lần trước đây.
                    Lần gần nhất vào{" "}
                    {formatDate(medicalHistory[0]?.appointmentDate)}.
                  </p>
                  <div className="mt-2">
                    <a
                      href="#medical-history"
                      className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center"
                    >
                      Xem tiền sử bệnh án
                      <ChevronLeft className="w-4 h-4 transform rotate-270 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Thông tin cuộc hẹn */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                    Ngày hẹn
                  </p>
                  <p className="font-medium">
                    {formatDate(appointment.appointmentDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-indigo-600" />
                    Thời gian
                  </p>
                  <p className="font-medium">
                    {formatTime(
                      appointment.doctorSchedule?.slotStartTime || ""
                    )}{" "}
                    -{" "}
                    {formatTime(appointment.doctorSchedule?.slotEndTime || "")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Award className="w-4 h-4 mr-2 text-indigo-600" />
                    Dịch vụ
                  </p>
                  <p className="font-medium">
                    {appointment.doctorSchedule?.serviceId || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <ClipboardList className="w-4 h-4 mr-2 text-indigo-600" />
                    Phòng khám
                  </p>
                  <p className="font-medium">
                    {appointment.doctorSchedule?.roomId || "N/A"}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-indigo-600" />
                  Lý do khám
                </p>
                <p className="mt-1 p-2 bg-white rounded border border-gray-200">
                  {appointment.reason || "Không có thông tin"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Thông tin bệnh nhân */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                <User className="mr-2 h-5 w-5 text-indigo-600" />
                Thông tin bệnh nhân
              </h2>

              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium mr-3">
                    {appointment.patient?.userName?.[0] || "?"}
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {appointment.patient?.userName}
                    </h3>
                    <div className="flex items-center">
                      <p className="text-sm text-gray-500">
                        {appointment.patient?.dob &&
                          `${
                            new Date().getFullYear() -
                            new Date(
                              appointment.patient.dob.toString()
                            ).getFullYear()
                          } tuổi, `}
                        {appointment.patient?.gender}
                      </p>
                      {isFirstVisit ? (
                        <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs">
                          Lần đầu
                        </span>
                      ) : (
                        <span
                          onClick={showPreviousRecord}
                          className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs flex items-center hover:bg-green-200 transition-colors cursor-pointer"
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          Có tiền sử ({medicalHistory.length} lần khám)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      Điện thoại
                    </p>
                    <p className="font-medium">
                      {appointment.patient?.phone || "N/A"}
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 flex items-center">
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </p>
                    <p className="font-medium text-sm overflow-hidden text-ellipsis">
                      {appointment.patient?.email || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    Địa chỉ
                  </p>
                  <p className="font-medium">
                    {appointment.patient?.address || "N/A"}
                  </p>
                </div>

                {/* Badges - có thể thêm thông tin hữu ích */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {isFirstVisit ? (
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                      Bệnh nhân mới
                    </span>
                  ) : (
                    <button
                      onClick={showPreviousRecord}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center hover:bg-blue-200 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      Đã có hồ sơ bệnh án trước đây
                    </button>
                  )}

                  {appointment.patient?.isActive && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Hồ sơ đang hoạt động
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Tóm tắt y tế */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                <Activity className="mr-2 h-5 w-5 text-indigo-600" />
                Tóm tắt y tế
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {/* Tổng lượt khám */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1 flex items-center">
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    Tổng lượt khám
                  </p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {medicalHistory.length}
                  </p>
                  {medicalHistory.length > 0 && (
                    <p className="text-xs text-gray-500">
                      Từ{" "}
                      {formatDate(
                        medicalHistory[medicalHistory.length - 1]
                          ?.appointmentDate
                      )}
                      đến {formatDate(medicalHistory[0]?.appointmentDate)}
                    </p>
                  )}
                </div>

                {/* Lần khám gần nhất */}
                {medicalHistory.length > 0 && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1 flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                      Lần khám gần nhất
                    </p>
                    <p className="text-lg font-semibold">
                      {formatDate(medicalHistory[0]?.appointmentDate)}
                    </p>
                    <p className="text-xs text-indigo-600">
                      <span className="font-medium">Chẩn đoán:</span>{" "}
                      {medicalHistory[0]?.diagnosis || "Không có chẩn đoán"}
                    </p>
                    <Link
                      href="#medical-history"
                      className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                    >
                      Xem chi tiết tiền sử
                    </Link>
                  </div>
                )}

                {/* Trạng thái bệnh án hiện tại */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1 flex items-center">
                    <Clock3 className="w-4 h-4 mr-2 text-gray-400" />
                    Tình trạng hiện tại
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">
                      {existingMedicalRecord
                        ? "Đã có bệnh án"
                        : "Chưa có bệnh án"}
                    </p>
                    {existingMedicalRecord ? (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Hoàn thành
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        Cần nhập bệnh án
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tiền sử bệnh án */}
          {!isFirstVisit && medicalHistory.length > 0 && (
            <div
              id="medical-history"
              className="bg-white rounded-lg shadow-md p-6 mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <ClipboardList className="mr-2 h-5 w-5 text-indigo-600" />
                  Tiền sử bệnh án ({filteredHistory.length}/
                  {medicalHistory.length})
                </h2>

                {/* Tìm kiếm bệnh án */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm bệnh án..."
                    className="w-60 px-3 py-2 pl-9 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {historyLoading ? (
                <p className="text-center py-4">Đang tải tiền sử bệnh án...</p>
              ) : (
                <div className="overflow-x-auto">
                  {filteredHistory.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ngày khám
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Triệu chứng
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Chẩn đoán
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kế hoạch điều trị
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredHistory.map((record, index) => {
                          const recordId = `record-${
                            record.reservationId || index
                          }`;
                          const isExpanded = expandedRecords.includes(recordId);

                          return (
                            <React.Fragment key={index}>
                              <tr
                                className={`hover:bg-gray-50 ${
                                  index === 0 ? "bg-blue-50" : ""
                                }`}
                              >
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                  {formatDate(record.appointmentDate)}
                                  {index === 0 && (
                                    <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                                      Gần nhất
                                    </span>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                                  {highlightText(
                                    record.symptoms || "N/A",
                                    searchTerm
                                  )}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                                  {highlightText(
                                    record.diagnosis || "N/A",
                                    searchTerm
                                  )}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                                  {highlightText(
                                    record.treatmentPlan || "N/A",
                                    searchTerm
                                  )}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600">
                                  <button
                                    onClick={() => toggleExpandRecord(recordId)}
                                    className="hover:text-blue-800"
                                  >
                                    {isExpanded ? "Thu gọn" : "Chi tiết"}
                                  </button>
                                </td>
                              </tr>
                              {isExpanded && (
                                <tr className="bg-gray-50">
                                  <td colSpan={5} className="px-4 py-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                                        <h4 className="text-xs uppercase font-semibold text-gray-500 mb-1">
                                          Triệu chứng
                                        </h4>
                                        <p className="text-sm whitespace-pre-line">
                                          {record.symptoms ||
                                            "Không có thông tin"}
                                        </p>
                                      </div>
                                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                                        <h4 className="text-xs uppercase font-semibold text-gray-500 mb-1">
                                          Chẩn đoán
                                        </h4>
                                        <p className="text-sm whitespace-pre-line">
                                          {record.diagnosis ||
                                            "Không có thông tin"}
                                        </p>
                                      </div>
                                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                                        <h4 className="text-xs uppercase font-semibold text-gray-500 mb-1">
                                          Kế hoạch điều trị
                                        </h4>
                                        <p className="text-sm whitespace-pre-line">
                                          {record.treatmentPlan ||
                                            "Không có thông tin"}
                                        </p>
                                      </div>
                                      {record.notes && (
                                        <div className="p-3 bg-white rounded-lg border border-gray-200">
                                          <h4 className="text-xs uppercase font-semibold text-gray-500 mb-1">
                                            Ghi chú
                                          </h4>
                                          <p className="text-sm whitespace-pre-line">
                                            {record.notes}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      {searchTerm
                        ? "Không tìm thấy bệnh án phù hợp với từ khóa tìm kiếm"
                        : "Bệnh nhân chưa có tiền sử bệnh án"}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Bệnh án hiện tại */}
          {existingMedicalRecord ? (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center text-gray-800">
                  <FileText className="mr-2 h-5 w-5 text-indigo-600" />
                  Bệnh án hiện tại
                </h2>
                <button
                  type="button"
                  onClick={() => setShowNewRecordForm(!showNewRecordForm)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {showNewRecordForm ? (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Ẩn biểu mẫu bệnh án mới
                    </>
                  ) : (
                    <>
                      <FilePlus className="h-4 w-4 mr-2" />
                      Thêm bệnh án mới
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">
                    Thông tin chung
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Ngày khám</p>
                      <p className="font-medium">
                        {formatDate(existingMedicalRecord.appointmentDate)}
                      </p>
                    </div>

                    {existingMedicalRecord.followUpDate && (
                      <div>
                        <p className="text-xs text-gray-500">Ngày tái khám</p>
                        <p className="font-medium">
                          {formatDate(existingMedicalRecord.followUpDate)}
                        </p>
                      </div>
                    )}
                    
                    {/* Hiển thị thông tin bệnh nhân từ medical record */}
                    {existingMedicalRecord.patientName && (
                      <div>
                        <p className="text-xs text-gray-500">Bệnh nhân</p>
                        <p className="font-medium text-indigo-700">
                          {existingMedicalRecord.patientName}
                        </p>
                      </div>
                    )}
                    
                    {existingMedicalRecord.patientGender && (
                      <div>
                        <p className="text-xs text-gray-500">Giới tính</p>
                        <p className="font-medium">
                          {existingMedicalRecord.patientGender}
                        </p>
                      </div>
                    )}
                    
                    {existingMedicalRecord.patientDob && (
                      <div>
                        <p className="text-xs text-gray-500">Ngày sinh</p>
                        <p className="font-medium">
                          {existingMedicalRecord.patientDob}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">
                      Triệu chứng
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {existingMedicalRecord.symptoms || "Không có thông tin"}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">
                      Chẩn đoán
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {existingMedicalRecord.diagnosis || "Không có thông tin"}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">
                      Kế hoạch điều trị
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {existingMedicalRecord.treatmentPlan ||
                        "Không có thông tin"}
                    </p>
                  </div>

                  {existingMedicalRecord.notes && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-sm font-semibold text-gray-600 mb-2">
                        Ghi chú
                      </h3>
                      <p className="text-gray-700 whitespace-pre-line">
                        {existingMedicalRecord.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : checkingExistingRecord ? (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <p className="text-center py-4">
                Đang kiểm tra bệnh án hiện có...
              </p>
            </div>
          ) : null}

          {/* Form nhập bệnh án mới */}
          {(!existingMedicalRecord || showNewRecordForm) && dayjs().isSame(dayjs(appointment.appointmentDate), 'day') ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                <FilePlus className="mr-2 h-5 w-5 text-indigo-600" />
                {existingMedicalRecord
                  ? "Thêm bệnh án mới"
                  : "Nhập kết quả khám"}
              </h2>

              {existingMedicalRecord && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-700">
                        Lưu ý: Bệnh án đã tồn tại cho lịch hẹn này
                      </p>
                      <p className="text-sm text-yellow-600 mt-1">
                        Việc tạo thêm bệnh án mới sẽ tạo một bản ghi mới. Chỉ
                        thực hiện điều này nếu cần thiết.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="symptoms"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Triệu chứng <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="symptoms"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    required
                    placeholder="Mô tả các triệu chứng của bệnh nhân"
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="diagnosis"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Chẩn đoán <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="diagnosis"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    required
                    placeholder="Nhập chẩn đoán của bác sĩ"
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="treatmentPlan"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Kế hoạch điều trị <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="treatmentPlan"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={treatmentPlan}
                    onChange={(e) => setTreatmentPlan(e.target.value)}
                    required
                    placeholder="Mô tả kế hoạch điều trị cho bệnh nhân"
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="followUpDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Ngày tái khám (nếu có)
                  </label>
                  <input
                    type="date"
                    id="followUpDate"
                    className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Ghi chú
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Thông tin bổ sung, lưu ý cho bệnh nhân"
                  ></textarea>
                </div>

                <div className="flex justify-end pt-4">
                  <Link href="/doctor/appointments">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 mr-4"
                      disabled={submitting}
                    >
                      Hủy
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 flex items-center"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Đang lưu...
                      </>
                    ) : (
                      "Lưu kết quả khám"
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (!existingMedicalRecord || showNewRecordForm) && (
            <div className="bg-white rounded-lg shadow-md p-6 text-center text-red-600 font-semibold">
              Chưa đến ngày hẹn ({formatDate(appointment.appointmentDate)})
            </div>
          )}
        </>
      )}

      {/* Modal hiển thị bệnh án gần nhất */}
      {showPreviousRecordModal && selectedRecord && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4 animate-fadeIn"
          style={{ animation: "fadeIn 0.2s ease-in-out" }}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto animate-scaleIn"
            style={{ animation: "scaleIn 0.2s ease-in-out" }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                  Hồ sơ bệnh án lần trước
                </h2>
                <button
                  onClick={() => {
                    console.log("Closing modal");
                    setShowPreviousRecordModal(false);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                  <span className="font-medium">Ngày khám:</span>{" "}
                  {formatDate(selectedRecord.appointmentDate)}
                </p>
                {selectedRecord.followUpDate && (
                  <p className="text-sm text-gray-700 flex items-center mt-1">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                    <span className="font-medium">Ngày tái khám:</span>{" "}
                    {formatDate(selectedRecord.followUpDate)}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Triệu chứng
                  </h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {selectedRecord.symptoms || "Không có thông tin"}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Chẩn đoán
                  </h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {selectedRecord.diagnosis || "Không có thông tin"}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Kế hoạch điều trị
                  </h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {selectedRecord.treatmentPlan || "Không có thông tin"}
                  </p>
                </div>

                {selectedRecord.notes && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Ghi chú
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {selectedRecord.notes}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-between">
                <a
                  href="#medical-history"
                  onClick={() => setShowPreviousRecordModal(false)}
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                >
                  Xem tất cả lịch sử bệnh án
                  <ChevronLeft className="w-4 h-4 transform rotate-270 ml-1" />
                </a>
                <button
                  onClick={() => setShowPreviousRecordModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add the cancellation modal */}
      {showCancellationModal && appointment && (
        <AppointmentCancellationModal
          reservationId={parseInt(appointment.reservationId)}
          onClose={() => setShowCancellationModal(false)}
          onCancellationRequested={handleCancellationRequested}
        />
      )}
    </div>
  );
}
