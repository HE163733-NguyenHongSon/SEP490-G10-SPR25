"use client";
import React from "react";
// import { useRouter } from "next/navigation";
import RatingStars from "../common/RatingStars";
import Image from "next/image";
import Link from "next/link";

interface IDoctors {
  items: IDoctor[];
}

export const DoctorList = ({ items }: IDoctors) => {
  // const router = useRouter();

  return (
    <div className=" grid  sm:grid-cols-1  lg:grid-cols-2  xl:grid-cols-3 2xl:grid-col-4 grid-rows-2  p-5  text-gray-500 gap-5">
      {items?.map((doctor) => (
        <div
          key={doctor.doctorId}
          className=" border border-gray-300 rounded-md shadow-md "
        >
          <Link href={`/patient/doctors/${doctor.doctorId}`}>
            <h1 className=" text-center font-semibold text-lg text-gray-700 mt-3">
              {doctor.academicTitle}.{doctor.degree} {doctor.doctorName}
            </h1>

            <div className="grid grid-cols-3 my-3">
              <div className="col-span-1 flex flex-col items-center  justify-start p-2 border-r border-gray-300">
                <Image
                  className="rounded-lg"
                  src={doctor.avatarUrl}
                  height={200}
                  width={100}
                  alt="avatar doctor"
                />
                <button className="my-5 bg-cyan-500 text-white px-3 rounded-full">
                  Booking{" "}
                </button>
              </div>
              <div className="col-span-2 flex flex-col justify-between font-sans px-3">
                <h2 className="text-lg text-gray-700 ">{doctor.currentWork}</h2>
                <p>{doctor.doctorDescription}...</p>
                <p className="text-gray-400">{doctor.specialtyNames}</p>
                <p className="font-semibold">
                  ({doctor.numberOfService} service take on)
                </p>
                <div className="flex flex-row">
                  <RatingStars rating={doctor.rating} />
                  <p>({doctor.numberOfExamination} examination)</p>
                </div>
              </div>
            </div>
            {/* <button
            className="flex justify-center items-center text-2xl text-white z-30 bg-cyan-600"
            onClick={() => router.push(`/doctors/${doctor.doctorId}`)}
          >
            View details for {doctor.doctorName}
          </button> */}
          </Link>
        </div>
      ))}
    </div>
  );
};
