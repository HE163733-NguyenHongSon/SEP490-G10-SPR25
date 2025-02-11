// DoctorsPage.tsx
"use client";

import { doctorService } from "@/services/doctorService";
import React from "react";
import PaginatedItems from "@/components/common/PaginatedItems";
import { DoctorList } from "@/components/patient/DoctorList";

const DoctorsPage = async () => {
  const doctors = await doctorService.getDoctorList();

  return (
    <div className="z-30">
      <h2>Doctor List</h2>

      <PaginatedItems
        items={doctors}
        itemsPerPage={8}
        RenderComponent={DoctorList} 
      />
    </div>
  );
};

export default DoctorsPage;
