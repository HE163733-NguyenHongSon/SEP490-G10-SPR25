"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { medicalRecordService } from '@/common/services/medicalRecordService';
import { ChevronLeft, Calendar, User, FileText, Activity, Thermometer, Pill, Clock, CalendarClock } from 'lucide-react';
import dayjs from 'dayjs';

export default function MedicalRecordDetail() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [medicalRecord, setMedicalRecord] = useState<IMedicalRecordDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicalRecord = async () => {
      try {
        setLoading(true);
        const record = await medicalRecordService.getMedicalRecordDetailById(parseInt(id));
        setMedicalRecord(record);
      } catch (err) {
        console.error('Error fetching medical record:', err);
        setError('Không thể tải thông tin hồ sơ y tế. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMedicalRecord();
    }
  }, [id]);

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Lỗi!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (!medicalRecord) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Thông báo!</strong>
        <span className="block sm:inline"> Không tìm thấy hồ sơ y tế này.</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex items-center">
        <button
          onClick={handleGoBack}
          className="mr-4 flex items-center text-gray-600 hover:text-indigo-600"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Quay lại</span>
        </button>
        <h1 className="text-2xl font-bold">Chi tiết hồ sơ y tế</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200 bg-indigo-50">
          <div className="flex flex-wrap justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-semibold text-gray-800">
                Hồ sơ khám bệnh #{medicalRecord.reservationId}
              </h2>
              <p className="text-gray-600 flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                Ngày khám: {medicalRecord.reservation?.appointmentDate || 'N/A'}
              </p>
            </div>
            <div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Hoàn thành
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thông tin bệnh nhân */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <User className="h-5 w-5 mr-2 text-indigo-600" />
                Thông tin bệnh nhân
              </h3>
              <div className="space-y-2">
                <p><span className="font-medium">Họ tên:</span> {medicalRecord.reservation?.patient?.userName || 'N/A'}</p>
                <p><span className="font-medium">Giới tính:</span> {medicalRecord.reservation?.patient?.gender || 'N/A'}</p>
                <p><span className="font-medium">Ngày sinh:</span> {medicalRecord.reservation?.patient?.dob || 'N/A'}</p>
                <p><span className="font-medium">Địa chỉ:</span> {medicalRecord.reservation?.patient?.address || 'N/A'}</p>
                <p><span className="font-medium">Số điện thoại:</span> {medicalRecord.reservation?.patient?.phone || 'N/A'}</p>
              </div>
            </div>

            {/* Thông tin lịch khám */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
                Thông tin lịch khám
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Bác sĩ khám:</span> {medicalRecord.reservation?.doctorSchedule?.doctorName || 'N/A'}
                </p>
                <p>
                  <span className="font-medium">Chuyên khoa:</span> {medicalRecord.reservation?.doctorSchedule?.serviceName || 'N/A'}
                </p>
                <p>
                  <span className="font-medium">Phòng khám:</span> {medicalRecord.reservation?.doctorSchedule?.roomName || 'N/A'}
                </p>
                <p>
                  <span className="font-medium">Lý do khám:</span> {medicalRecord.reservation?.reason || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Thông tin hồ sơ y tế */}
          <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-indigo-600" />
              Kết quả khám bệnh
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-indigo-500" />
                  Triệu chứng
                </h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">
                  {medicalRecord.symptoms || 'Không có thông tin triệu chứng'}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Thermometer className="h-4 w-4 mr-2 text-indigo-500" />
                  Chẩn đoán
                </h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">
                  {medicalRecord.diagnosis || 'Không có thông tin chẩn đoán'}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Pill className="h-4 w-4 mr-2 text-indigo-500" />
                  Phác đồ điều trị
                </h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">
                  {medicalRecord.treatmentPlan || 'Không có thông tin phác đồ điều trị'}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <CalendarClock className="h-4 w-4 mr-2 text-indigo-500" />
                  Hẹn tái khám
                </h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">
                  {medicalRecord.followUpDate ? dayjs(medicalRecord.followUpDate).format('DD/MM/YYYY') : 'Không có lịch tái khám'}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                  Ghi chú
                </h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">
                  {medicalRecord.notes || 'Không có ghi chú'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 