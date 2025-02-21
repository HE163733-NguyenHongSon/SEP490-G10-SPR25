import { doctorService } from "@/services/doctorService";
import React from "react";
import PaginatedItems from "@/components/common/PaginatedItems";
import { DoctorList } from "@/components/patient/DoctorList";
import Search from "@/components/common/Search";
import DisplayToggle from "@/components/common/DisplayToggle";

const DoctorsPage = async ({
  searchParams,
}: {
  searchParams: {
    specialties?: string;
    academicTitles?: string;
    degrees?: string;
    sortBy: string;
    searchBy?: string;
    displayView: string;
  };
}) => {
  // console.log(`specialties:${searchParams.specialties}---academicTitles:${searchParams.academicTitles}`);

  let doctors: IDoctor[] = [];
  if (
    searchParams.specialties ||
    searchParams.academicTitles ||
    searchParams.degrees ||
    searchParams.sortBy
  ) {
    doctors = await doctorService.getDoctorListByFilterAndSort(
      searchParams.specialties ? searchParams.specialties.split(",") : [],
      searchParams.academicTitles ? searchParams.academicTitles.split(",") : [],
      searchParams.degrees ? searchParams.degrees.split(",") : [],
      searchParams.sortBy
    );
    console.log(doctors);
  } else if (searchParams.searchBy) {
    doctors = await doctorService.getDoctorListByIdList(searchParams.searchBy);
  } else {
    doctors = await doctorService.getDoctorList();
  }
  const searchOptions: ISearchOption[] = (
    await doctorService.getDoctorList()
  ).map((d) => ({
    label: d.doctorName,
    value: d.doctorId,
  }));
  return (
    <div className="flex flex-col h-screen  mt-10">
      <div className="flex flex-row items-center justify-center gap-5">
        <DisplayToggle />
        <Search
          suggestedData={searchOptions}
          placeholder="Select or search by doctor name"
          path="/patient/doctors"
        />
        <h2 className="text-cyan-500 font-semibold text-lg ml-2  ">
          {doctors.length} results
        </h2>
      </div>
      <div className=" overflow-y-auto  my-4">
        <PaginatedItems
          items={doctors}
          itemsPerPage={6}
          RenderComponent={DoctorList}
          displayView={searchParams.displayView || "grid"}
        />
      </div>
    </div>
  );
};

export default DoctorsPage;
