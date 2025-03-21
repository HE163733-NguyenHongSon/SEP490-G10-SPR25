import React from "react";
import Image from "next/image";
import { doctorService } from "@/services/doctorService";
import RatingStars from "@/components/RatingStars";
import Navigation from "@/components/Navigation";
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
    { path: `/patient/doctors/${doctorId}`, name: "Tổng quan" },
    {
      path: `/patient/doctors/${doctorId}/doctor-schedule`,
      name: "Lịch bác sĩ",
    },
    {
      path: "#",
      name: "Dịch vụ đảm nhận",
    },
    {
      path: "#",
      name: "Bình luận đánh giá",
    }
  ];
  return (
    <div className=" flex flex-col  justify-items-start text-gray-700 border border-gray-300  mx-5 my-16 rounded-md shadow-md">
      <div className="flex flex-row  p-6 relative">
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
          <p className="text-gray-400">
            {doctorDetail.specialtyNames.join(", ")}
          </p>
          <p className="font-semibold">
            ({doctorDetail.numberOfService} dịch vụ đảm nhận)
          </p>
          <div className="flex flex-row gap-2">
            <RatingStars rating={doctorDetail.rating} />
            <p>({doctorDetail.numberOfExamination} đã khám)</p>
          </div>
          <button className="px-3 w-fit bg-cyan-500 text-white  rounded-full">
            Hẹn bác sĩ
          </button>
        </div>
      </div>
      <div className="py-2 mx-6 border-b border-gray-300">
        <Navigation routes={routes} isWhiteText={false} />
      </div>
      <div className="flex flex-col  justify-items-start px-5  h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default DoctorDetailLayout;
