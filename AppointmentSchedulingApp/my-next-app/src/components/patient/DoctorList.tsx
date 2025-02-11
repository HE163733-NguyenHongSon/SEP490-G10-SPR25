"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
interface IDoctors {
  doctorList: IDoctor[];
}


export const DoctorList = ({ doctorList }: IDoctors) => {
  const router = useRouter();
 
  return (
    <div className="max-w-fit  grid grid-cols-4 grid-rows-2  container text-center  p-6 md:px-20 lg:px-48 lg:mx-48 text-white  z-10 ">    
      {doctorList?.map((doctor) => (
        <div key={doctor.doctorId} className="col-span-1 row-span-1 grid-cols-2">
             <h1 className="font-semibold text-lg text-gray-700">{doctor.academicTitle}.{doctor.degree} {doctor.doctorName}</h1>
             <div className="col-span-1 grid-row-5">
                 <Image src={""} width={50} height={50} alt="image"/>
             </div>
             <div className="col-span-1"></div>

          {/* <button
            className="flex justify-center items-center text-2xl text-white z-30 bg-cyan-600"
            onClick={() => router.push(`/doctors/${doctor.doctorId}`)}
          >
            View detail for doctor {doctor.doctorName}
          </button> */}
        </div>
      ))}
    </div>
  );
};
