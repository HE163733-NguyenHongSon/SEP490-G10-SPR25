"use client";

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { HubConnectionBuilder, HubConnection, HttpTransportType, JsonHubProtocol } from "@microsoft/signalr";
import { useSignalRConnection } from "@/common/contexts/SignalRContext";

interface AppointmentCancellationModalProps {
  reservationId: number;
  onClose: () => void;
  onCancellationRequested: () => void;
}

const AppointmentCancellationModal: React.FC<AppointmentCancellationModalProps> = ({ 
  reservationId, 
  onClose,
  onCancellationRequested
}) => {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { connection, isConnected } = useSignalRConnection();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reason.trim()) {
      toast.error('Vui lòng cung cấp lý do hủy lịch');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Lấy thông tin bác sĩ hiện tại
      const userJson = localStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;
      const doctorId = user?.userId || 0;
      const doctorName = user?.userName || "Bác sĩ";
      
      // Gọi API để yêu cầu hủy lịch hẹn (không hủy trực tiếp)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5220"}/api/Doctors/appointments/${reservationId}/cancel-request`, 
        {
          reservationId,
          cancellationReason: reason,
          doctorId
        }
      );

      console.log("API response:", response.data);
      
      // Thông báo đã được gửi từ backend thông qua API
      toast.success('Đã gửi yêu cầu hủy lịch hẹn thành công');
      onCancellationRequested();
      onClose();
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu hủy lịch:', error);
      toast.error('Không thể gửi yêu cầu hủy lịch hẹn');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] max-w-[90%]">
        <h3 className="text-xl font-bold mb-4">Yêu Cầu Hủy Lịch Khám</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="reason" className="block mb-2 font-medium text-gray-700">
              Lý Do Hủy <span className="text-red-500">*</span>
            </label>
            <textarea
              id="reason"
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Vui lòng giải thích lý do bạn cần hủy lịch khám này..."
              required
            />
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Lưu ý: Yêu cầu hủy lịch của bạn sẽ được gửi tới lễ tân để xử lý. Trạng thái lịch hẹn sẽ không thay đổi ngay lập tức.
          </p>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              disabled={isSubmitting}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Gửi Yêu Cầu Hủy Lịch'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentCancellationModal; 