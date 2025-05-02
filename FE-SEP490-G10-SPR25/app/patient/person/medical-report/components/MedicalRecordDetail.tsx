import React, { useState } from "react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface MedicalRecordDetailProps {
  medicalRecordDetail: IMedicalRecordDetail | null;
  isLoading: boolean;
  error?: string;
  closePopup: () => void;
}

const MedicalRecordDetail: React.FC<MedicalRecordDetailProps> = ({
  medicalRecordDetail,
  isLoading,
  error,
  closePopup,
}) => {
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
  const [showImage, setShowImage] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white top-20 absolute rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4 px-6 py-3 w-full bg-white/60 backdrop-blur-md shadow-md fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-4xl rounded-t-2xl">
            <h3 className="text-2xl font-semibold text-cyan-500 ">
              Chi tiết hồ sơ y tế - Lịch hẹn #
              {medicalRecordDetail?.reservationId}
            </h3>
            <button
              onClick={closePopup}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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

          {/* Loading / Error */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          ) : error ? (
            <div className="py-4 text-red-500 text-center">{error}</div>
          ) : (
            <div className="mt-6 space-y-6">
              {/* Patient Information */}
              <div className="bg-gray-50 p-4 rounded-xl shadow-md">
                <h4 className="text-lg font-semibold text-cyan-500 mb-3 shadow-sm">
                  Thông tin bệnh nhân
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    [
                      "Mã bệnh nhân",
                      medicalRecordDetail?.reservation.patient.userId,
                    ],
                    [
                      "Căn cước công dân",
                      medicalRecordDetail?.reservation.patient.citizenId,
                    ],
                    [
                      "Họ và tên",
                      medicalRecordDetail?.reservation.patient.userName,
                    ],
                    [
                      "Số điện thoại",
                      medicalRecordDetail?.reservation.patient.phone,
                    ],
                    [
                      "Giới tính",
                      medicalRecordDetail?.reservation.patient.gender,
                    ],
                    ["Email", medicalRecordDetail?.reservation.patient.email],
                    ["Ngày sinh", medicalRecordDetail?.reservation.patient.dob],
                    [
                      "Địa chỉ",
                      medicalRecordDetail?.reservation.patient.address,
                    ],
                  ].map(([label, value], index) => (
                    <div key={index}>
                      <p className="text-sm text-gray-500">{label}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Appointment Info */}
              <div className="bg-gray-50 p-4 rounded-xl shadow-md">
                <h4 className="text-lg font-semibold text-cyan-500 mb-3 shadow-sm">
                  Thông tin lịch hẹn
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Ngày khám</p>
                    <p className="font-medium">
                      {medicalRecordDetail?.appointmentDate}{" "}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dịch vụ</p>
                    <p className="font-medium">
                      {medicalRecordDetail?.reservation.doctorSchedule.serviceName}({" "}
                      {medicalRecordDetail?.reservation.doctorSchedule.slotStartTime} -{" "}
                      {medicalRecordDetail?.reservation.doctorSchedule.slotEndTime})
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bác sĩ</p>
                    <p className="font-medium">
                      {medicalRecordDetail?.reservation.doctorSchedule.doctorName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phòng khám</p>
                    <p className="font-medium">
                      {medicalRecordDetail?.reservation.doctorSchedule.roomName} -{" "}
                      {medicalRecordDetail?.reservation.doctorSchedule.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">
                      Ảnh phác đồ điều trị lần trước
                    </p>
                    {!showImage ? (
                      <button
                        onClick={() => setShowImage(true)}
                        className="text-cyan-600 hover:underline text-sm"
                      >
                        Xem ảnh
                      </button>
                    ) : (
                      <div className="mt-2 w-fit">
                        <Zoom>
                          <Image
                            className="rounded-lg object-cover cursor-zoom-in"
                            src={`${imgUrl}/${medicalRecordDetail?.reservation.priorExaminationImg}`}
                            width={300}
                            height={300}
                            alt="Ảnh phác đồ điều trị"
                          />
                        </Zoom>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Lý do khám</p>
                    <p className="font-medium">
                      {medicalRecordDetail?.reservation.reason}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-sm text-gray-500">Trạng thái</p>
                    <div className="flex items-center gap-2 mt-1">
                      {medicalRecordDetail?.reservation.status ===
                      "Hoàn thành" ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-green-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414L9 13.414l4.707-4.707z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p className="font-medium text-green-500">
                            {medicalRecordDetail?.reservation.status}
                          </p>
                        </>
                      ) : (
                        <p className="font-medium text-orange-600">
                          {medicalRecordDetail?.reservation.status}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Details */}
              <div className="bg-gray-50 p-4 rounded-xl shadow-md">
                <h4 className="text-lg font-semibold text-cyan-500 mb-3 shadow-sm">
                  Chi tiết khám bệnh
                </h4>
                <div className="space-y-4">
                  {[
                    ["Triệu chứng", medicalRecordDetail?.symptoms],
                    ["Chẩn đoán", medicalRecordDetail?.diagnosis],
                    ["Phác đồ điều trị", medicalRecordDetail?.treatmentPlan],
                    [
                      "Ngày tái khám",
                      medicalRecordDetail?.followUpDate ||
                        "Không có ngày tái khám",
                    ],
                    ["Ghi chú", medicalRecordDetail?.notes],
                  ].map(([label, value], index) => (
                    <div key={index}>
                      <p className="text-sm text-gray-500">{label}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={closePopup}
              className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordDetail;
