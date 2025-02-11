// "use client";
import React from "react";
// import { useRouter } from "next/navigation";
import RatingStars from "../common/RatingStars";


interface IDoctors {
  items: IDoctor[];
}

export const DoctorList = ({ items }: IDoctors) => {
  // const router = useRouter();

  return (
    <div className="max-w-fit grid grid-cols-4 grid-rows-2 container text-center p-6 md:px-20 lg:px-48 lg:mx-48">
      {items?.map((doctor) => (
        <div
          key={doctor.doctorId}
          className="col-span-1 row-span-1 grid-cols-2"
        >
          <h1 className="font-semibold text-lg text-gray-700">
            {doctor.academicTitle}.{doctor.degree} {doctor.doctorName}
          </h1>
          <div className="col-span-1 grid-row-5">
            <button className="row-span-1">Booking appointment</button>
          </div>
          <div className="col-span-1 flex flex-col">
            <h2>{doctor.currentWork}</h2>
            <p>{doctor.doctorDescription}...</p>
            <p>{doctor.specialtyNames}</p>
            <p>({doctor.numberOfService} service take on)</p>
            <div className="flex flex-row">
              <RatingStars rating={doctor.rating} />
              <p>({doctor.numberOfExamination})</p>
            </div>
          </div>

          {/* <button
            className="flex justify-center items-center text-2xl text-white z-30 bg-cyan-600"
            onClick={() => router.push(`/doctors/${doctor.doctorId}`)}
          >
            View details for {doctor.doctorName}
          </button> */}
        </div>
      ))}
    </div>
  );
};
