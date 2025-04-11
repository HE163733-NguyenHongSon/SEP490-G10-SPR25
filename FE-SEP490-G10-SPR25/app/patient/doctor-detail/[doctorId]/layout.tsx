import React from "react";
import Image from "next/image";
import { doctorService } from "@/services/doctorService";
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
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;

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

      <div className="relative container w-2/3 text-gray-600 p-5  mt-20 mb-5 z-30   bg-white rounded-xl shadow-2xl ">
        <div className="flex flex-row p-6     ">
          <BackButton />
          <Image
            width={150}
            height={80}
            alt="image-doctor"
            src={`${imgUrl}/${doctorDetail.avatarUrl}`}
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
            {/* Dịch vụ đảm nhận */}
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
                {doctorDetail.numberOfService} dịch vụ đảm nhận
              </p>
            </div>

            {/* Số lượt đã khám */}
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
              <p className="font-sans ">
                <span className="text-gray-700 ">
                  {doctorDetail.numberOfExamination}
                </span>{" "}
                bệnh nhân đã khám
              </p>
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
