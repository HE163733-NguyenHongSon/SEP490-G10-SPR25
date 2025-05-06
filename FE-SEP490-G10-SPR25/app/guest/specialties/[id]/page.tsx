"use client";

import React from "react";
import SpecialtyDetailPage from "@/common/pages/SpecialtyDetailPage";
import { useParams } from "next/navigation";
import Link from "next/link";

const GuestSpecialtyDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;
  
  return (
    <div className="relative">
      <SpecialtyDetailPage params={{ id }} />
      
      {/* Overlay login button for guests */}
      <div className="fixed bottom-10 left-0 right-0 flex justify-center z-50">
        <Link href="/common/auth/login" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg shadow-lg text-lg font-medium transition-colors">
          Đăng nhập để đặt lịch khám
        </Link>
      </div>
    </div>
  );
};

export default GuestSpecialtyDetailPage; 