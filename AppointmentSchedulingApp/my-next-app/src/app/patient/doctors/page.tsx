import { doctorService } from "@/services/doctorService";
import React from "react";
import PaginatedItems from "@/components/common/PaginatedItems";
import { DoctorList } from "@/components/patient/DoctorList";

const DoctorsPage = async ({
   searchParams
}: {
  searchParams: {
    specialties?: string;
    academicTitles?: string;
    degrees?: string;
    sortBy: string;
  };
}) => {
  // console.log(`specialties:${searchParams.specialties}---academicTitles:${searchParams.academicTitles}`);

  const doctors = await doctorService.getDoctorListByFilterAndSort(
    searchParams.specialties ? searchParams.specialties.split(",") : [],
    searchParams.academicTitles ? searchParams.academicTitles.split(",") : [],
    searchParams.degrees ? searchParams.degrees.split(",") : [],
    searchParams.sortBy
  );

  return (
    <div>
      <h2>Doctor List</h2>

      <PaginatedItems
        items={doctors}
        itemsPerPage={6}
        RenderComponent={DoctorList}
      />
    </div>
  );
};

export default DoctorsPage;
