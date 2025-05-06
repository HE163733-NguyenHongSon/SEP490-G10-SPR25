"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Dropdown } from "./Dropdown";
import { DropdownItem } from "./DropdownItem";
import { HubConnectionBuilder, HubConnection, HttpTransportType, JsonHubProtocol } from "@microsoft/signalr";
import axios from "axios";
import { message } from "antd";
import { useSignalRConnection } from "@/common/contexts/SignalRContext";

// Define the notification type for cancellation requests
interface CancellationNotification {
  notificationId: number;
  reservationId: number;
  doctorName: string;
  patientName: string;
  appointmentDate: string;
  cancellationReason: string;
  requestTime: string;
  isRead: boolean;
  status: string;
}

// Define Dialog component for showing cancellation details
interface DialogProps {
  notification: CancellationNotification;
  onClose: () => void;
  onApprove: (notification: CancellationNotification) => void;
  onReject: (notification: CancellationNotification) => void;
}

const CancellationDialog: React.FC<DialogProps> = ({ 
  notification, 
  onClose,
  onApprove,
  onReject
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] max-w-[90%]">
        <h3 className="text-xl font-bold mb-4">Yêu Cầu Hủy Lịch</h3>
        
        <div className="mb-4">
          <p className="mb-2"><span className="font-semibold">Bác sĩ:</span> {notification.doctorName}</p>
          <p className="mb-2"><span className="font-semibold">Bệnh nhân:</span> {notification.patientName}</p>
          <p className="mb-2"><span className="font-semibold">Thời gian khám:</span> {new Date(notification.appointmentDate).toLocaleString()}</p>
          <p className="mb-2"><span className="font-semibold">Lý do hủy:</span></p>
          <p className="p-3 bg-gray-100 rounded-lg">{notification.cancellationReason}</p>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const { connection, isConnected } = useSignalRConnection();
  const [notifications, setNotifications] = useState<CancellationNotification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<CancellationNotification | null>(null);
  
  useEffect(() => {
    // Chỉ đăng ký sự kiện nếu có kết nối
    if (connection) {
      // Đảm bảo chỉ đăng ký sự kiện một lần
      connection.off("ReceiveCancellationNotification");
      connection.on("ReceiveCancellationNotification", (notification: CancellationNotification) => {
        console.log("Received cancellation notification:", notification);
        // Kiểm tra thông báo đã tồn tại để tránh lặp
        setNotifications(prev => {
          // Kiểm tra xem thông báo đã tồn tại chưa
          const exists = prev.some(n => 
            n.reservationId === notification.reservationId && 
            n.requestTime === notification.requestTime
          );
          if (exists) return prev;
          return [notification, ...prev];
        });
        setNotifying(true);
      });

      console.log("Đã đăng ký sự kiện nhận thông báo hủy lịch");
    }
  }, [connection]);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  function handleShowDetails(notification: CancellationNotification) {
    setSelectedNotification(notification);
  }

  const handleClick = () => {
    toggleDropdown();
    setNotifying(false);
  };

  // Handle approve cancellation
  const handleApproveCancellation = async (notification: CancellationNotification) => {
    try {
      // Gọi API hủy lịch
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Receptionists/appointments/${notification.reservationId}/cancel`, 
        { 
          reservationId: notification.reservationId,
          cancellationReason: notification.cancellationReason
        }
      );
      
      if (response.status === 200) {
        // Cập nhật trạng thái thông báo thành "Approved"
        setNotifications(prev => 
          prev.map(n => n.notificationId === notification.notificationId 
            ? {...n, status: "Approved"} 
            : n
          )
        );
        message.success("Đã hủy lịch hẹn thành công");
      }
    } catch (error) {
      console.error("Lỗi khi hủy lịch hẹn:", error);
      message.error("Không thể hủy lịch hẹn");
    }
  };

  // Handle reject cancellation
  const handleRejectCancellation = async (notification: CancellationNotification) => {
    try {
      // Gọi API từ chối yêu cầu hủy lịch
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Receptionists/appointments/${notification.reservationId}/reject-cancellation`,
        {
          reservationId: notification.reservationId
        }
      );
      
      if (response.status === 200) {
        // Cập nhật trạng thái thông báo thành "Rejected"
        setNotifications(prev => 
          prev.map(n => n.notificationId === notification.notificationId 
            ? {...n, status: "Rejected"} 
            : n
          )
        );
        message.success("Đã từ chối yêu cầu hủy lịch hẹn");
      }
    } catch (error) {
      console.error("Lỗi khi từ chối yêu cầu hủy lịch:", error);
      message.error("Không thể từ chối yêu cầu hủy lịch");
    }
  };

  return (
    <div className="relative">
      <button
        className="relative dropdown-toggle flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-300 rounded-full hover:text-gray-700 h-11 w-11 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={handleClick}
      >
        <span
          className={`absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-orange-400 ${
            !notifying ? "hidden" : "flex"
          }`}
        >
          <span className="absolute inline-flex w-full h-full bg-orange-400 rounded-full opacity-75 animate-ping"></span>
        </span>

        <svg
          className="stroke-current"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.3399 14.49L18.3399 12.83C18.1299 12.46 17.9399 11.76 17.9399 11.35V8.82C17.9399 6.47 16.5599 4.44 14.5699 3.49C14.0499 2.57 13.0899 2 11.9899 2C10.8999 2 9.91994 2.59 9.39994 3.52C7.44994 4.49 6.09994 6.5 6.09994 8.82V11.35C6.09994 11.76 5.90994 12.46 5.69994 12.82L4.68994 14.49C4.28994 15.16 4.19994 15.9 4.44994 16.58C4.68994 17.25 5.25994 17.77 5.99994 18.02C7.93994 18.68 9.97994 19 12.0199 19C14.0599 19 16.0999 18.68 18.0399 18.03C18.7399 17.8 19.2799 17.27 19.5399 16.58C19.7999 15.89 19.7299 15.13 19.3399 14.49Z"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M14.8301 20.01C14.8301 21.66 13.4801 23.01 11.8301 23.01C11.0001 23.01 10.2301 22.63 9.65006 22.05C9.07006 21.47 8.69006 20.7 8.69006 19.87"
            strokeWidth="1.5"
            strokeMiterlimit="10"
          />
        </svg>
      </button>

      {/* Dropdown Content */}
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[361px] lg:right-0"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Thông Báo
          </h5>
          <button
            onClick={toggleDropdown}
            className="text-gray-500 transition dropdown-toggle dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        
        <ul className="overflow-y-auto max-h-[400px]">
          {notifications.length === 0 ? (
            <li className="p-4 text-center text-gray-500">Chưa có thông báo nào</li>
          ) : (
            notifications.map((notification, index) => (
              <li key={`${notification.reservationId}-${index}`}>
                <DropdownItem
                  onItemClick={() => handleShowDetails(notification)}
                  className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                >
                  <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                    <Image
                      width={40}
                      height={40}
                      src="/images/user/user-02.jpg"
                      alt="User"
                      className="w-full overflow-hidden rounded-full"
                    />
                    <span className="absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-success-500 dark:border-gray-900"></span>
                  </span>

                  <span className="block">
                    <span className="mb-1.5 space-x-1 block text-theme-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium text-gray-800 dark:text-white/90">
                        {notification.doctorName}
                      </span>
                      <span>yêu cầu hủy lịch khám với</span>
                      <span className="font-medium text-gray-800 dark:text-white/90">
                        {notification.patientName}
                      </span>
                    </span>

                    <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                      <span>
                        {notification.status === "Pending" ? "Đang chờ xử lý" : 
                         notification.status === "Approved" ? "Đã xác nhận hủy" : 
                         notification.status === "Rejected" ? "Đã từ chối" : "Không xác định"}
                      </span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span>{new Date(notification.requestTime).toLocaleTimeString()}</span>
                    </span>
                  </span>
                </DropdownItem>
              </li>
            ))
          )}
        </ul>
      </Dropdown>
      
      {/* Cancellation Details Dialog */}
      {selectedNotification && (
        <CancellationDialog 
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)}
          onApprove={handleApproveCancellation}
          onReject={handleRejectCancellation}
        />
      )}
    </div>
  );
}
