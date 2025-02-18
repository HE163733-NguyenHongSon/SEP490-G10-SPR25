import React from "react";
import Image from "next/image";
import { doctorService } from "@/services/doctorService";
import RatingStars from "@/components/common/RatingStars";
import Navigation from "@/components/common/Navigation";
import Link from "next/link";
const DoctorDetailLayout = async ({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { doctorId: string } }>) => {
  const doctorId = await params.doctorId;
  const doctorDetail: IDoctorDetail = await doctorService.getDoctorDetailById(
    doctorId
  );
 

  const routes = [
    { path: `/patient/doctors/${doctorId}`
    , name: "Overall" },
    {
      path: `/patient/doctors/${doctorId}/doctor-schedule`,
      name: "Doctor's schedule",
    },
    {
      path: "#",
      name: "Service take on",
    },
  ];
  return (
    <div className=" flex flex-col  justify-items-start text-gray-700 border border-gray-300  mx-5 my-16 rounded-md shadow-md">
      <div className="flex flex-row  p-10 relative">
        <Link
          className="absolute top-0 left-3 text-3xl font-semibold     hover:text-cyan-500 "
          href={"/patient/doctors"}
        >
          ←
        </Link>
        <Image
          width={200}
          height={150}
          alt="image-doctor"
          src={doctorDetail.avatarUrl}
          className="rounded-2xl"
        />
        <div className=" flex flex-col justify-between font-sans px-5">
          <h1 className=" font-semibold  text-lg text-gray-700 ">
            <span className=" mr-2">
              {doctorDetail.academicTitle}.{doctorDetail.degree}
            </span>
            {doctorDetail.doctorName}
          </h1>
          <h2 className="text-lg text-gray-700 ">{doctorDetail.currentWork}</h2>
          <p className="text-gray-400">{doctorDetail.specialtyNames}</p>
          <p className="font-semibold">
            ({doctorDetail.numberOfService} service take on)
          </p>
          <div className="flex flex-row gap-2">
            <RatingStars rating={doctorDetail.rating} />
            <p>({doctorDetail.numberOfExamination} examination)</p>
          </div>
          <button className="px-3 w-fit bg-cyan-500 text-white  rounded-full">
            Booking doctor
          </button>
        </div>
      </div>
      <div className="py-2 mx-10 border-b border-gray-300">
        <Navigation routes={routes} isWhiteText={false} />
      </div>
      <div className="flex flex-col  justify-items-start px-5  ">
        {children}
      </div>
    </div>
  );
};

export default DoctorDetailLayout;
