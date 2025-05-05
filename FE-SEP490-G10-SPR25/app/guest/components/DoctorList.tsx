"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import RatingStars from "@/common/components/RatingStars";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

interface DoctorListProps {
  items: IDoctor[];
  displayView?: string;
  userType?: "guest" | "patient";
  isBooking?: boolean;
}

export const DoctorList = ({
  items,
  displayView,
  userType = "patient",
  isBooking = false,
}: DoctorListProps) => {
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;

  // Cấu hình responsive cho carousel
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const getDoctorDetailUrl = (doctorId: number | string | undefined) => {
    if (!doctorId) return "#";
    return userType === "guest"
      ? `/guest/doctors/${doctorId}`
      : `/patient/doctors/${doctorId}`;
  };

  const DoctorCard = ({ doctor }: { doctor: IDoctor }) => (
    <Link key={doctor.userId} href={getDoctorDetailUrl(doctor.userId)}>
      <h1 className="text-center font-semibold text-lg text-gray-700 mt-3">
        <span className="mr-2">
          {doctor.academicTitle},{doctor.degree}
        </span>
        {doctor.userName}
      </h1>

      <div className="grid grid-cols-3 my-3">
        <div className="gap-3 col-span-1 flex flex-col items-center justify-start px-5 border-r border-gray-300">
          <div className="relative h-40 w-full mb-3 overflow-hidden group rounded-md">
            <Image
              className="object-cover transform transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg"
              src={`${imgUrl}/${doctor.avatarUrl}`}
              fill
              alt="avatar doctor"
            />
          </div>
          <button className="bg-cyan-500 text-white px-3 rounded-full my-5">
            {!isBooking ? "Chi tiết" : "Hẹn bác sĩ"}
          </button>
        </div>
        <div className="col-span-2 flex flex-col items-start text-start justify-between font-sans pl-4">
          <h2 className="text-lg text-gray-700">{doctor.currentWork}</h2>
          <p>{doctor.doctorDescription.slice(0, 20)}...</p>
          <p className="text-gray-400">
            {doctor.specialtyNames?.join(", ") || "Chưa có chuyên khoa"}
          </p>

          <div className="flex flex-col gap-2 text-base text-gray-700 mt-5">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-cyan-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 21V13h8v8M3 21h18M12 3v6m3-3h-6M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"
                />
              </svg>
              <p className="font-medium">
                {doctor.numberOfService} dịch vụ đảm nhận
              </p>
            </div>
            <div className="flex items-center gap-2 text-base">
              <RatingStars rating={doctor.rating} />
              {doctor.ratingCount} đánh giá
            </div>
            <div className="flex items-center gap-2 text-base">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2l4-4M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10z"
                />
              </svg>
              <p className="font-sans">
                <span className="text-gray-700">
                  {doctor.numberOfExamination}
                </span>{" "}
                bệnh nhân đã khám
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  if (displayView === "slider") {
    return (
      <div className="w-full py-4">
        <Carousel
          responsive={responsive}
          infinite
          autoPlaySpeed={3000}
          containerClass="carousel-container pb-4"
          itemClass="px-4 h-full"
        >
          {items?.map((doctor) => (
            <div
              key={doctor.userId}
              className="h-full border border-gray-300 rounded-md shadow-md"
            >
              <DoctorCard doctor={doctor} />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }

  return (
    <div
      className={`w-full grid ${
        displayView === "grid"
          ? "sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 2xl:grid-col-4"
          : "grid-cols-1"
      } text-gray-500 gap-5`}
    >
      {items?.map((doctor) => (
        <div
          key={doctor.userId}
          className="flex flex-col h-full border border-gray-300 rounded-md shadow-md"
        >
          <DoctorCard doctor={doctor} />
        </div>
      ))}
    </div>
  );
};
