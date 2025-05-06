"use client";

import React from "react";
import SpecialtyDetailPage from "@/common/pages/SpecialtyDetailPage";
import { useParams } from "next/navigation";

const PatientSpecialtyDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;
  return (
    <div className="flex items-center justify-center gap-4 w-full h-full overflow-hidden">
      <SpecialtyDetailPage params={{ id }} />
    </div>
  );
};

export default PatientSpecialtyDetailPage;
