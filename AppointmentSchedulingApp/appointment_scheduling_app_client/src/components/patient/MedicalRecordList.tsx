import React from "react";
import { MedicalRecord } from "../../types/medicalRecord";

interface MedicalRecordListProps {
  medicalRecordList: MedicalRecord[];
}
const MedicalRecordList = ({ medicalRecordList }: MedicalRecordListProps) => {
  return (
    <div className="m-3">
      <table className=" border-separate   border border-gray-300 rounded-md    ">
        <thead>
          <tr className="text-center border-b border-gray-300 font-medium">
            List visits
          </tr>
          <tr>
            <th className="border border-gray-300 rounded-md font-medium  ">
              MedicalRecordId
            </th>
            <th className="border border-gray-300 rounded-md font-medium  ">
              Appointment date
            </th>
            <th className="border border-gray-300 rounded-md font-medium  ">
              Infor visit
            </th>

            <th className="border border-gray-300 rounded-md font-medium  ">
              FollowUpDate
            </th>
            <th className="border border-gray-300 rounded-md font-medium  ">
              Notes
            </th>
            <th className="border border-gray-300 rounded-md font-medium  ">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {medicalRecordList.map((medicalRecord: MedicalRecord) => (
            <tr key={medicalRecord.medicalRecordId}>
              <td className="border border-gray-300 rounded-md  px-10">
                {medicalRecord.medicalRecordId}
              </td>
              <td className="border border-gray-300 rounded-md  px-10">
                {medicalRecord.appointmentDate}
              </td>
              <td className="border border-gray-300 rounded-md px-10">
                <p>
                  <strong>Symptoms:</strong> {medicalRecord.symptoms}
                </p>
                <p>
                  <strong>Diagnosis:</strong> {medicalRecord.diagnosis}
                </p>
                <p>
                  <strong>Treatment plan:</strong> {medicalRecord.treatmentPlan}
                </p>
              </td>

              <td className="border border-gray-300 rounded-md  px-10">
                {medicalRecord.followUpDate || "No follow up date"}
              </td>
              <td className="border border-gray-300 rounded-md  px-10">
                {medicalRecord.notes}
              </td>
              <td className="border border-gray-300 rounded-md  px-10">
                View details
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalRecordList;
