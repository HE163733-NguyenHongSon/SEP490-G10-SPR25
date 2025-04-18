import React, { useState } from "react";
import Image from "next/image";

interface SelectPatientProps {
  patients: IPatient[];
  selectedPatient?: IPatient;
  onChange: (p: IPatient) => void;
}

const SelectPatient: React.FC<SelectPatientProps> = ({
  patients,
  selectedPatient,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
  console.log("patients", patients);
  return (
    <div className="relative inline-block text-left w-full max-w-xs">
      <div
        className="flex items-center cursor-pointer border rounded px-3 py-2 bg-white shadow-sm w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedPatient ? (
          <>
            <Image
              src={`${imgUrl}/${selectedPatient.avatarUrl}`}
              alt="avatar"
              width={30}
              height={30}
              className="rounded-full object-cover w-8 h-8 mr-2"
            />
            <span className="text-sm">
              {selectedPatient.userName}{" "}
              ({selectedPatient.relationship})            
            </span>
          </>
        ) : (
          <span className="text-sm text-gray-400">Chọn người</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-y-auto">
          {patients.map((p) => {
            const isSelected = selectedPatient?.userId === p.userId;
            return (
              <div
                key={p.userId}
                onClick={() => {
                  onChange(p);
                  setIsOpen(false);
                }}
                className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 
                  ${isSelected ? "bg-blue-100 font-semibold" : ""}`}
              >
                <Image
                  src={`${imgUrl}/${p.avatarUrl}`}
                  alt="avatar"
                  width={30}
                  height={30}
                  className="rounded-full object-cover w-8 h-8 mr-2"
                />
                <span className="text-sm">
                  {p.userName}
                  {p.relationship ? ` (${p.relationship})` : ""}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectPatient;
