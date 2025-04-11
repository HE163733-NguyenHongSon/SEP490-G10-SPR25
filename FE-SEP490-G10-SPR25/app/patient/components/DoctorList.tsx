"use client";
import React from "react";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import RatingStars from "@/components/RatingStars";
import Link from "next/link";

interface DoctorListProps {
  items: IDoctor[];
  displayView?: string;
}

export const DoctorList = ({ items, displayView }: DoctorListProps) => {
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;

  return (
    <div
      className={`w-full  grid   ${
        displayView === "grid"
          ? "sm:grid-cols-1  lg:grid-cols-1 xl:grid-cols-3 2xl:grid-col-4"
          : "grid-cols-1"
      }      text-gray-500 gap-5 `}
    >
      {items?.map((doctor) => (
        <Link
          key={doctor.doctorId}
          href={`/patient/doctor-detail/${doctor.doctorId}`}
          className=" border border-gray-300 rounded-md shadow-md "
        >
          <h1 className=" text-center font-semibold  text-lg text-gray-700 mt-3 ">
            <span className=" mr-2">
              {doctor.academicTitle},{doctor.degree}
            </span>
            {doctor.doctorName}
          </h1>

          <div className="grid grid-cols-3 my-3 ">
            <div className="gap-3 col-span-1 flex flex-col items-center  justify-start p-2 border-r border-gray-300">
              <Image
                className="rounded-lg "
                src={`${imgUrl}/${doctor.avatarUrl}`}
                height={100}
                width={100}
                alt="avatar doctor"
              />
              <p className="text-cyan-500 font-light text-center">
                <span className="font-semibold text-lg mr-1">
                  {doctor.experienceYear}
                </span>
                năm kinh nghiệm
              </p>
              <button className=" bg-cyan-500 text-white px-3 rounded-full">
                Hẹn bác sĩ
              </button>
            </div>
            <div className="col-span-2 flex flex-col items-start text-start justify-between font-sans pl-4 ">
              <h2 className="text-lg text-gray-700 ">{doctor.currentWork}</h2>
              <p>{doctor.basicDescription}...</p>
              <p className="text-gray-400">
                {doctor.specialtyNames?.join(", ") || "Chưa có chuyên khoa"}
              </p>

              <p className="font-semibold ">
                ({doctor.numberOfService} dịch vụ đảm nhận)
              </p>
              <div className="flex flex-row gap-2">
                <RatingStars rating={doctor.rating} />
                <p>({doctor.numberOfExamination} đã khám)</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
