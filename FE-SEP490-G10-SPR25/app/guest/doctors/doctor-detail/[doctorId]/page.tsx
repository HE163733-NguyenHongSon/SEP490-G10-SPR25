"use client";
import React from "react";
import DoctorDetailPage from "@/common/pages/DoctorDetailPage";
import { useParams } from "next/navigation";

const GuestDoctorDetailPage = () => {
  const params = useParams();
  const doctorId = params?.doctorId as string;
  return <DoctorDetailPage params={{ doctorId }} />;
};

export default GuestDoctorDetailPage;
