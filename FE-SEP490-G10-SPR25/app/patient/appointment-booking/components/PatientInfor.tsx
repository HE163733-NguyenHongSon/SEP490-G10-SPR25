"use client";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { CheckCircle2 as CheckCircle } from "lucide-react";
import AddPatientForm from "./AddPatientForm";
import {
  setSelectedPatient,
  setIsAddingPatient,
  setCurrentStep,
} from "../redux/bookingSlice";
import { RootState } from "@/store";

const PatientInfor = () => {
  const dispatch = useDispatch();
  const { patients, selectedPatient, isAddingPatient, doctorId } = useSelector(
    (state: RootState) => state.booking
  );

  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
  console.log("prious doctor", doctorId);
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Chọn bệnh nhân
      </h2>

      {/* Patient List */}
      <div className="space-y-8">
        {patients.map((patient: IPatient) => (
          <div
            key={patient.userId}
            className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-300 ease-in-out transform border border-gray-300 hover:shadow-2xl hover:scale-105 ${
              selectedPatient?.phone === patient.phone
                ? "ring-2 ring-cyan-500 border-cyan-500 scale-100"
                : ""
            }`}
            onClick={() => {
              dispatch(setSelectedPatient(patient));
              dispatch(setCurrentStep(2)); // Chuyển sang bước tiếp theo
            }}
          >
            <div className="flex items-center gap-6">
              {/* Patient Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-200">
                  <Image
                    width={80}
                    height={80}
                    src={
                      patient.avatarUrl
                        ? `${imgUrl}/${patient.avatarUrl}`
                        : `${imgUrl}/user.jpg`
                    }
                    alt={`${patient.userName}'s avatar`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Patient Information */}
              <div className="flex-1 min-w-0">
                {/* Patient Name, Date of Birth, and Phone Number in separate lines */}
                <div className="flex justify-start flex-col">
                  <h3 className="text-lg font-semibold text-gray-800 text-left">
                    {patient.userName}{" "}
                    <span className="text-white bg-cyan-500 font-normal text-base p-1 px-2 rounded-md">
                      {patient.relationship}
                    </span>
                  </h3>
                  <div className="flex flex-row">
                    <p className="font-medium text-gray-500">Ngày sinh :</p>
                    <p className="text-gray-800">
                      {patient.dob || "Chưa cập nhật"}
                    </p>
                  </div>

                  <div className="flex flex-row">
                    <p className="font-medium text-gray-500">Điện thoại :</p>
                    <p className="text-gray-800">{patient.phone || "---"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Check Circle Icon moved to the right */}
            {selectedPatient?.phone === patient.phone && (
              <div className="absolute top-12 right-12 bg-cyan-500 rounded-full p-2">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
            )}
          </div>
        ))}

        {/* Add New Patient Button */}
        {isAddingPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <AddPatientForm onClose={() => dispatch(setIsAddingPatient(false))} />
          </div>
        )}

        <div className="flex mt-6">
          <button
            onClick={() => dispatch(setIsAddingPatient(true))}
            className="w-full py-3 text-white bg-cyan-500 border-2 border-dashed border-white rounded-lg hover:bg-cyan-600 transition-all duration-300"
          >
            + Thêm bệnh nhân mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientInfor;
