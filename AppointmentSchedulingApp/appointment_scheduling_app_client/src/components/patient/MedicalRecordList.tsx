import React from "react";

const MedicalRecordList = () => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ReservationId</th>
            <th>Appointment date</th>
            <th>Symptoms</th>
            <th>Diagnosis</th>
            <th>Treatment Plan</th>
            <th>Notes</th>
            <th>FollowUpDate</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default MedicalRecordList;
