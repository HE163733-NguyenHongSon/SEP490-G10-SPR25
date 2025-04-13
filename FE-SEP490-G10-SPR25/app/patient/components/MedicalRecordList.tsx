import React from "react";



interface MedicalRecordListProps {
  medicalRecordList: IMedicalRecord[] | undefined;
  searchTerm?: string;
}

const MedicalRecordList = ({ 
  medicalRecordList,
  searchTerm = "" 
}: MedicalRecordListProps) => {
  
  const highlightSearchTerm = (text: string = "") => {
    if (!searchTerm || !text) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(
      regex, 
      (match) => `<span class="bg-yellow-200">${match}</span>`
    );
  };



  return (
    <div className="m-3 overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-50">
          
          <tr className="text-left text-sm font-medium text-gray-500">
            <th className="p-3 border border-gray-300">Mã lịch hẹn</th>
            <th className="p-3 border border-gray-300">Ngày hẹn khám</th>
            <th className="p-3 border border-gray-300">Thông tin khám bệnh</th>
            <th className="p-3 border border-gray-300">Ngày tái khám</th>
            <th className="p-3 border border-gray-300">Ghi chú</th>
            <th className="p-3 border border-gray-300">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {medicalRecordList?.length ? (
            medicalRecordList.map((record) => (
              <tr key={record?.reservationId} className="hover:bg-gray-50">
                <td className="p-3 border border-gray-300">
                  {record?.reservationId}
                </td>
                <td className="p-3 border border-gray-300">
                  {record?.appointmentDate}
                </td>
                <td className="p-3 border border-gray-300">
                  <div className="space-y-2">
                    <p>
                      <strong>Triệu chứng:</strong>{" "}
                      <span dangerouslySetInnerHTML={{
                        __html: highlightSearchTerm(record?.symptoms),
                      }}/>
                    </p>
                    <p>
                      <strong>Chẩn đoán:</strong>{" "}
                      <span dangerouslySetInnerHTML={{
                        __html: highlightSearchTerm(record?.diagnosis),
                      }}/>
                    </p>
                    <p>
                      <strong>Phác đồ điều trị:</strong>{" "}
                      <span dangerouslySetInnerHTML={{
                        __html: highlightSearchTerm(record?.treatmentPlan),
                      }}/>
                    </p>
                  </div>
                </td>
                <td className="p-3 border border-gray-300">
                  {record?.followUpDate??"Không có ngày tái khám"}
                </td>
                <td className="p-3 border border-gray-300">
                  <span dangerouslySetInnerHTML={{
                    __html: highlightSearchTerm(record?.notes),
                  }}/>
                </td>
                <td className="p-3 border border-gray-300 text-blue-500 hover:text-blue-700 cursor-pointer">
                  Xem chi tiết
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500 border border-gray-300">
                Không có dữ liệu hồ sơ y tế
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalRecordList;