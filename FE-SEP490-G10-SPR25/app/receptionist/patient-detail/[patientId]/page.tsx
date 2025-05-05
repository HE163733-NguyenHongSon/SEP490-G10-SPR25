"use client";
import React, { useEffect, useState } from "react";
import { patientService } from "@/common/services/patientService";
import Image from "next/image";
import Link from "next/link";
import PatientDetailModal from "@/receptionist/components/PatientDetailModal";
import MedicalRecordDetail from "@/patient/person/medical-report/components/MedicalRecordDetail";
import { medicalRecordService } from "@/common/services/medicalRecordService";



export default function PatientDetailPage({
  params,
}: {
  params: { patientId: string };
}) {
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
  const [patient, setPatient] = useState<IPatientDetail | null>(null);
  const [medicalRecords, setMedicalRecords] = useState<IMedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [medicalRecordDetail, setMedicalRecordDetail] =
      useState<IMedicalRecordDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
  


  const fetchMedicalRecordDetail = async (reservationId: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await medicalRecordService.getMedicalRecordDetailById(
          reservationId
        );
  
        if (response) {
          setMedicalRecordDetail(response);
        } else {
          setError("Không tìm thấy chi tiết hồ sơ.");
          setMedicalRecordDetail(null);
        }
      } catch (err) {
        setError("Không thể tải chi tiết lịch hẹn. Vui lòng thử lại.");
        console.error("Error fetching reservation details:", err);
      } finally {
        setIsLoading(false);
      }
    };
      
    const handleViewDetails = async (record: IMedicalRecord) => {
      fetchMedicalRecordDetail(record.reservationId);
      setIsPopupOpen(true);
    };
  
    const closePopup = () => {
      setIsPopupOpen(false);
      setMedicalRecordDetail(null);
    };

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patientData = await patientService.getPatientDetailById(
          params.patientId
        );

        setPatient(patientData);
        setMedicalRecords(patientData.medicalRecords || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch patient data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [params.patientId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading patient data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Patient not found</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <Link href="/receptionist/patient" passHref>
              <button className="flex items-center text-white hover:text-blue-100 transition-colors">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
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
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Hồ sơ bệnh nhân</h1>
              <p className="mt-1 text-cyan-100">Mã BN: #{patient.userId}</p>
            </div>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1 flex flex-col items-center">
            <div className="relative w-48 h-48 mb-6">
              <div className="absolute inset-0 rounded-2xl shadow-lg" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white">
                {patient.avatarUrl ? (
                  <Image
                    src={`${imgUrl}/${patient.avatarUrl}`}
                    width={1920}
                    height={1080}
                    alt={`Avatar of ${patient.userName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Chưa có ảnh</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {patient.userName}
              </h2>
              <h2 className="text-lg font-semibold text-cyan-500 mb-1">
                {patient.roleNames}
              </h2>
              <div
                className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-medium ${"bg-purple-100 text-purple-800"}`}
              >
                <span className="w-2 h-2 rounded-full mr-2 bg-current" />
                {patient.rank}
              </div>
            </div>
          </div>

          {/* Information Sections */}
          <div className="lg:col-span-3 space-y-6">
            {/* Personal Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-50">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-cyan-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4z" />
                  </svg>
                  Thông tin cá nhân
                </h3>
                <dl className="space-y-3">
                  <InfoItem label="CCCD" value={patient.citizenId} />
                  <InfoItem label="Giới tính" value={patient.gender} />
                  {/* <InfoItem label="Ngày sinh" value={new Date(patient.dob).toLocaleDateString()} /> */}
                  <InfoItem label="Ngày sinh" value={patient.dob} />
                  <InfoItem label="Địa chỉ" value={patient.address} />
                  <InfoItem
                    label="Tình trạng"
                    value={patient.mainCondition || ""}
                    highlight
                  />
                </dl>
              </div>

              {/* Contact Information */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-50">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-cyan-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Thông tin liên hệ
                </h3>
                <dl className="space-y-3">
                  <InfoItem label="Điện thoại" value={patient.phone} />
                  <InfoItem label="Email" value={patient.email || ""} />
                </dl>
              </div>

              {/* Guardian Information */}
              <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-50">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-cyan-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Người giám hộ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem label="Id" value={patient.guardian?.userId || ""} />
                  <InfoItem
                    label="Họ tên"
                    value={patient.guardian?.userName || ""}
                  />
                  <InfoItem
                    label="Điện thoại"
                    value={patient.guardian?.phone || ""}
                  />
                  <InfoItem
                    label="Email"
                    value={patient.guardian?.email || ""}
                  />
                </div>
              </div>
            </div>

            {/* Medical History */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-50">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-cyan-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Lịch sử khám bệnh
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-sm">
                      <th className="py-3 px-4 text-left">STT</th>
                      <th className="py-3 px-4 text-left">Ngày khám</th>
                      <th className="py-3 px-4 text-left">Triệu chứng</th>
                      <th className="py-3 px-4 text-left">Chẩn đoán</th>
                      <th className="py-3 px-4 text-left">Thao tác</th>
                      <th className="hidden">reservationId</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {medicalRecords.length > 0 ? (
                      medicalRecords.map((record, index) =>
                        record ? (
                          <tr key={index}>
                            <td className="py-3 px-4">{index + 1}</td>
                            <td className="py-3 px-4">
                              {record.appointmentDate}
                            </td>
                            <td className="py-3 px-4">{record.symptoms}</td>
                            <td className="py-3 px-4">{record.diagnosis}</td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => handleViewDetails(record)}
                                className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
                              >
                                Chi tiết
                              </button>
                            </td>
                            <td className="hidden">{record.reservationId}</td>
                          </tr>
                        ) : null
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-3 px-4 text-center text-gray-500"
                        >
                          Không có dữ liệu
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
          <div className="flex items-center justify-end space-x-4">
            <Link
              href={`/receptionist/patient-edit/${patient.userId}`}
              passHref
            >
              <button className="flex items-center px-5 py-2.5 text-gray-600 hover:text-gray-800 transition-colors">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Chỉnh sửa hồ sơ
              </button>
            </Link>
            
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <MedicalRecordDetail
          medicalRecordDetail={medicalRecordDetail}
          isLoading={isLoading}
          error={error || ""}
          closePopup={closePopup}
        />
      )}
    </div>

  );
}

// Helper component
const InfoItem = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number | undefined;
  highlight?: boolean;
}) => (
  <div
    className={`flex justify-between items-center ${highlight ? "bg-cyan-50 px-4 py-2 rounded-lg" : ""
      }`}
  >
    <dt className="text-gray-600">{label}:</dt>
    <dd
      className={`font-medium ${highlight ? "text-cyan-700" : "text-gray-900"}`}
    >
      {value || "---"}
    </dd>
  </div>
);
