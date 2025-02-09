"use client";
import React from "react";
import { useRouter } from "next/navigation";
interface IListProps {
  doctorList: IDoctor[];
}

export const DoctorList = ({ doctorList }: IListProps) => {
  const router = useRouter();
 
  return (
    <div className="max-w-fit  container text-center  p-6 md:px-20 lg:px-48 lg:mx-48 text-white  z-10 ">
      DoctorList
      {doctorList?.map((doctor) => (
        <div key={doctor.id}>
          <button
            className="flex justify-center items-center text-2xl text-white z-30 bg-cyan-600"
            onClick={() => router.push(`/doctors/${doctor.id}`)}
          >
            View detail for doctor {doctor.name}
          </button>
        </div>
      ))}
    </div>
  );
};
