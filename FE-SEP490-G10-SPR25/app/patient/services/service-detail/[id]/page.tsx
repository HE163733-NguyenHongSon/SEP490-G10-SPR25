"use client";
import React from "react";
import ServiceDetailPage from "../../../../common/pages/ServiceDetailPage";
import { useParams } from "next/navigation";

const PatientServiceDetailPage = () => {
  const params = useParams();
  const serviceId = params?.id as string;
  return (
    <div className="flex items-center justify-center gap-4 w-full h-full overflow-hidden">
      <ServiceDetailPage params={{ serviceId }} />
    </div>
  );
};

export default PatientServiceDetailPage;
