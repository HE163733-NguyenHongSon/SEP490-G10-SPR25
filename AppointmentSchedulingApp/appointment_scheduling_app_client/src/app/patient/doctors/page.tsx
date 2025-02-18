import { doctorService } from "@/services/doctorService";
import React from "react";
import PaginatedItems from "@/components/common/PaginatedItems";
import { DoctorList } from "@/components/patient/DoctorList";
import Search from "@/components/common/Search";

const DoctorsPage = async ({
  searchParams,
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
    <div className="flex items-center justify-center flex-col gap-y-7  mt-7 ">
      <Search
        optionSearch={["Doctor name", "Service name", "Current work"]}
        initialSearchValue="Doctor name"
      />

      <PaginatedItems
        items={doctors}
        itemsPerPage={6}
        RenderComponent={DoctorList}
      />
    </div>
  );
};

export default DoctorsPage;
