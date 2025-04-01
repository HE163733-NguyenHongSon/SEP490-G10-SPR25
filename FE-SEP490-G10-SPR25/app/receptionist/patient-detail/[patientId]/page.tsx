// export default function PatientDetailPage({
//   params,
// }: {
//   params: { patientId: string };
// }) {
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <h1 className="text-2xl font-bold">Đây là detail của bệnh nhân {params.patientId}</h1>
//     </div>
//   );
// }
// app/receptionist/patient-detail/[patientId]/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { receptionistService } from "@/services/receptionistService";

interface IPatient {
  patientId: number;
  citizenId: number;
  userName: string;
  phone: string;
  email: string;
  address: string;
  avatarUrl: string;
  gender: string;
  dob: string;
  guardianId: number;
  rank: string;
}

export default function PatientDetailPage({ params }: { params: { patientId: string } }) {
  const [patient, setPatient] = useState<IPatient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const data = await receptionistService.getPatientDetailById(params.patientId);
        setPatient(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch patient data');
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
    <div className="p-8 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-cyan-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Thông tin bệnh nhân</h1>
          <p className="mt-2"> Mã bệnh nhân: {patient.patientId}</p>
        </div>

        {/* Main Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Patient Avatar */}
          <div className="md:col-span-1 flex flex-col items-center">
            <div className="w-48 h-48 rounded-full bg-gray-200 overflow-hidden mb-4">
              {patient.avatarUrl ? (
                <img 
                  src={patient.avatarUrl} 
                  alt={`Avatar of ${patient.userName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>
            <h2 className="text-xl font-semibold">{patient.userName}</h2>
            <span className={`px-3 py-1 rounded-full text-sm mt-2 ${
              patient.rank === 'Vàng' ? 'bg-yellow-100 text-yellow-800' :
              patient.rank === 'Bạc' ? 'bg-gray-100 text-gray-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {patient.rank}
            </span>
          </div>

          {/* Patient Details */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-3">Thông tin cá nhân</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">CCCD:</span> {patient.citizenId}</p>
                  <p><span className="font-medium">Giới tính:</span> {patient.gender}</p>
                  <p><span className="font-medium">Ngày sinh:</span> {new Date(patient.dob).toLocaleDateString()}</p>
                  <p><span className="font-medium">Địa chỉ:</span> {patient.address}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-3">Thông tin liên hệ</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Số điện thoại:</span> {patient.phone}</p>
                  <p><span className="font-medium">Email:</span> {patient.email}</p>
                  <p><span className="font-medium">Người giám hộ:</span> {patient.guardianId}</p>
                </div>
              </div>
            </div>

            {/* Additional Sections */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3">Lịch sử khám bệnh</h3>
              <p className="text-gray-600">Thông tin lịch sử khám bệnh sẽ được hiển thị tại đây.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4 flex justify-end">
          <button className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition-colors">
            In hồ sơ
          </button>
        </div>
      </div>
    </div>
  );
}