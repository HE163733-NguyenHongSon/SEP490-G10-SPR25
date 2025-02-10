"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface IDoctors {
  doctorList: { doctorId: string; doctorName: string }[];
}


export const DoctorList = ({ doctorList }: IDoctors) => {
  const router = useRouter();
 
  return (
    <div className="max-w-fit  container text-center  p-6 md:px-20 lg:px-48 lg:mx-48 text-white  z-10 ">
      
      {doctorList?.map((doctor) => (
        <div key={doctor.doctorId}>
          <button
            className="flex justify-center items-center text-2xl text-white z-30 bg-cyan-600"
            onClick={() => router.push(`/doctors/${doctor.doctorId}`)}
          >
            View detail for doctor {doctor.doctorName}
          </button>
        </div>
      ))}
    </div>
  );
};
