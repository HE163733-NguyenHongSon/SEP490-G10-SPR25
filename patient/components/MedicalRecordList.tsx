import React from "react";

interface MedicalRecordListProps {
  medicalRecordList: IMedicalRecord[];
}

const MedicalRecordList = ({ medicalRecordList }: MedicalRecordListProps) => {
  return (
    <div className="m-3">
      <table className="border-separate border border-gray-300 rounded-md">
        <thead>
          <tr className="text-center border-b border-gray-300 font-medium">
            <th colSpan={6} className="p-2">
              HỒ SƠ Y TẾ CÁC LẦN KHÁM
            </th>
          </tr>
          <tr>
            <th className="border border-gray-300 rounded-md font-medium">
              Mã hồ sơ
            </th>
            <th className="border border-gray-300 rounded-md font-medium">
              Ngày hẹn khám
            </th>
            <th className="border border-gray-300 rounded-md font-medium">
              Thông tin khám bệnh
            </th>
            <th className="border border-gray-300 rounded-md font-medium">
              Ngày tái khám
            </th>
            <th className="border border-gray-300 rounded-md font-medium">
              Ghi chú
            </th>
            <th className="border border-gray-300 rounded-md font-medium">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {medicalRecordList.map((medicalRecord) => (
            <tr key={medicalRecord.medicalRecordId}>
              <td className="border border-gray-300 rounded-md px-10">
                {medicalRecord.medicalRecordId}
              </td>
              <td className="border border-gray-300 rounded-md px-10">
                {medicalRecord.appointmentDate}
              </td>
              <td className="border border-gray-300 rounded-md px-10">
                <p>
                  <strong>Triệu chứng:</strong> {medicalRecord.symptoms}
                </p>
                <p>
                  <strong>Chẩn đoán:</strong> {medicalRecord.diagnosis}
                </p>
                <p>
                  <strong>Phác đồ điều trị:</strong> {medicalRecord.treatmentPlan}
                </p>
              </td>
              <td className="border border-gray-300 rounded-md px-10">
                {medicalRecord.followUpDate || "Không có ngày tái khám"}
              </td>
              <td className="border border-gray-300 rounded-md px-10">
                {medicalRecord.notes}
              </td>
              <td className="border border-gray-300 rounded-md px-10 text-blue-500 cursor-pointer">
                Xem chi tiết
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalRecordList;
