"use client";

import React, { useEffect, useState } from 'react';
import { doctorService } from '@/common/services/doctorService';
import { getCurrentUser } from '@/common/services/authService';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { Search, Eye, Edit } from 'lucide-react';



export default function DoctorMedicalRecordsPage() {
  const router = useRouter();
  const [medicalRecords, setMedicalRecords] = useState<IMedicalRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<IMedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [recordCounts, setRecordCounts] = useState({
    total: 0,
    diagnosis: {
      diabetes: 0,
      hypertension: 0,
      respiratory: 0,
      gastrointestinal: 0,
      other: 0
    }
  });

  // Fetch the current user and their medical records
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const user = await getCurrentUser();
        setCurrentUser(user);

        if (user && user.userId) {
          const doctorId = parseInt(user.userId.toString(), 10);
          const records = await doctorService.getAllMedicalRecordsByDoctorId(doctorId);
          setMedicalRecords(records);
          setFilteredRecords(records);
          
          // Calculate record counts
          const counts = {
            total: records.length,
            diagnosis: {
              diabetes: records.filter(r => r.diagnosis?.toLowerCase().includes('tiểu đường')).length,
              hypertension: records.filter(r => r.diagnosis?.toLowerCase().includes('huyết áp')).length,
              respiratory: records.filter(r => 
                r.diagnosis?.toLowerCase().includes('hô hấp') || 
                r.diagnosis?.toLowerCase().includes('phổi')
              ).length,
              gastrointestinal: records.filter(r => 
                r.diagnosis?.toLowerCase().includes('tiêu hóa') || 
                r.diagnosis?.toLowerCase().includes('dạ dày')
              ).length,
              other: records.filter(r => 
                !r.diagnosis?.toLowerCase().includes('tiểu đường') && 
                !r.diagnosis?.toLowerCase().includes('huyết áp') &&
                !r.diagnosis?.toLowerCase().includes('hô hấp') &&
                !r.diagnosis?.toLowerCase().includes('phổi') &&
                !r.diagnosis?.toLowerCase().includes('tiêu hóa') &&
                !r.diagnosis?.toLowerCase().includes('dạ dày')
              ).length
            }
          };
          setRecordCounts(counts);
        }
      } catch (err) {
        console.error('Error fetching medical records:', err);
        setError('Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Normalize Vietnamese text to handle accents and diacritics
  const normalizeVietnamese = (text: string | undefined | null): string => {
    if (!text) return '';
    return text.toLowerCase().normalize('NFD');
  };

  // Filter records based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredRecords(medicalRecords);
      return;
    }

    const normalizedTerm = normalizeVietnamese(searchTerm.trim());
    const filtered = medicalRecords.filter(record => 
      normalizeVietnamese(record.symptoms).includes(normalizedTerm) ||
      normalizeVietnamese(record.diagnosis).includes(normalizedTerm) ||
      normalizeVietnamese(record.treatmentPlan).includes(normalizedTerm) ||
      normalizeVietnamese(record.notes).includes(normalizedTerm) ||
      normalizeVietnamese(record.appointmentDate).includes(normalizedTerm) ||
      normalizeVietnamese(record.patientName).includes(normalizedTerm)
    );
    
    setFilteredRecords(filtered);
  }, [searchTerm, medicalRecords]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const viewMedicalRecord = (recordId: string) => {
    router.push(`/doctor/medical-records/${recordId}`);
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

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Hồ Sơ Y Tế</h1>
          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm hồ sơ..."
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-span-12 md:col-span-8 lg:col-span-9">
        <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Hồ Sơ Y Tế Bệnh Nhân</h2>
          </div>
          {filteredRecords.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              {searchTerm ? 'Không tìm thấy hồ sơ y tế nào phù hợp với từ khóa tìm kiếm.' : 'Chưa có hồ sơ y tế nào.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mã Hồ Sơ
                    </th> */}
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bệnh nhân 
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày Khám
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Triệu Chứng
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chẩn Đoán
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phác Đồ Điều Trị
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao Tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRecords.map((record) => (
                    <tr key={record.reservationId} className="hover:bg-gray-50">
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {record.reservationId}
                        </div>
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {record.patientName || record.reservation?.patient?.userName || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.appointmentDate}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="max-w-xs truncate">
                          {record.symptoms || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="max-w-xs truncate">
                          {record.diagnosis || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="max-w-xs truncate">
                          {record.treatmentPlan || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900 mr-3 inline-flex items-center"
                          onClick={() => viewMedicalRecord(record.reservationId)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Xem chi tiết 
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {filteredRecords.length > 0 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-700">
                  Hiển thị <span className="font-medium">{filteredRecords.length}</span> hồ sơ y tế
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="col-span-12 md:col-span-4 lg:col-span-3 space-y-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Thống Kê Hồ Sơ</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
              <span className="text-sm">Tổng Số Hồ Sơ</span>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded">{recordCounts.total}</span>
            </div>                                 
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Thông Tin Hữu Ích</h2>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Bạn có thể xem tất cả hồ sơ y tế của bệnh nhân đã khám tại đây. Sử dụng ô tìm kiếm để lọc hồ sơ theo triệu chứng, chẩn đoán hoặc phác đồ điều trị.
            </p>
            <p className="text-sm text-gray-600">
              Để xem chi tiết hồ sơ y tế của một bệnh nhân cụ thể, bạn có thể nhấp vào nút "Xem" tương ứng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}