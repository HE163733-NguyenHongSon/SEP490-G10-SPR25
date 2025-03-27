import React from "react";
import Image from "next/image";
import { doctorService } from "@/services/doctorService";
import RatingStars from "@/components/RatingStars";
import Navigation from "@/components/Navigation";
import BackButton from "@/components/BackButton";

const DoctorDetailLayout = async ({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { doctorId: string } }>) => {
  const doctorId = await params.doctorId;
  const doctorDetail: IDoctorDetail = await doctorService.getDoctorDetailById(
    doctorId
  );

  const routes = [
    { path: `/patient/doctor-detail/${doctorId}`, name: "Tổng quan" },
    {
      path: `/patient/doctor-detail/${doctorId}/doctor-schedule`,
      name: "Lịch bác sĩ",
    },
    {
      path: "#",
      name: "Dịch vụ đảm nhận",
    },
    {
      path: "#",
      name: "Bình luận đánh giá",
    },
  ];
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center z-10"
      style={{ backgroundImage: 'url("/images/background_doctors.jpeg")' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>

      <div className=" container w-2/3 text-gray-600 p-3 mt-20 mb-5 z-30   bg-white rounded-xl shadow-2xl ">
        <div className="flex flex-row  p-6 relative ">
        <BackButton />
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
            <h2 className="text-lg text-gray-700 ">
              {doctorDetail.currentWork}
            </h2>
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
    </div>
  );
};

export default DoctorDetailLayout;
