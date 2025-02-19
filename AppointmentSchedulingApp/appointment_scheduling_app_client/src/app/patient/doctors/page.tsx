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
    <div className="flex flex-col h-screen  mt-10">
        <Search
          optionSearch={["Doctor name", "Current work"]}
          initialSearchValue="Doctor name"
        />
      

      <div className="flex-1 overflow-y-auto p-4 my-2">
        <PaginatedItems
          items={doctors}
          itemsPerPage={6}
          RenderComponent={DoctorList}
          defaultDisplayView="grid"
        />
      </div>
    </div>
  );
};

export default DoctorsPage;
