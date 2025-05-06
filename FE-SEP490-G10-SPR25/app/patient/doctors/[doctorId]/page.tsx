"use client";
import React from "react";
import DoctorDetailPage from "@/common/pages/DoctorDetailPage";
import { useParams } from "next/navigation";

const PatientDoctorDetailPage = () => {
  const params = useParams();
  const doctorId = params?.doctorId as string;
  return (
    <div className="flex items-center justify-center gap-4 w-full h-full overflow-hidden">
      <DoctorDetailPage params={{ doctorId }} />
    </div>
  );
};

export default PatientDoctorDetailPage;
         