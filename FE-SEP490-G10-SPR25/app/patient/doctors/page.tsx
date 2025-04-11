import { doctorService } from "@/services/doctorService";
import React from "react";
import PaginatedItems from "@/components/PaginatedItems";
import { DoctorList } from "@/patient/components/DoctorList";
import Search from "@/components/Search";
import DisplayToggle from "@/components/DisplayToggle";
import SelectSort from "@/components/SelectSort";
export const dynamic = "force-dynamic"; // Enable SSR

const DoctorsPage = async ({
  searchParams,
}: {
  searchParams: {
    specialties?: string;   
    academicTitles?: string;
    degrees?: string;
    sortBy: string;
    searchValues?: string;
    displayView: string;
  };
}) => {
  // console.log(`specialties:${searchParams.specialties}---academicTitles:${searchParams.academicTitles}`);

  let doctors: IDoctor[] = [];
  const sortOptions: ISortOption[] = [
    { label: "Đánh giá cao nhất", value: "highest_rated" },
    { label: "Nhiều lần khám nhất", value: "most_exam" },
    { label: "Kinh nghiệm nhất", value: "most_exp" },
    { label: "Nhiều dịch vụ nhất", value: "most_service" },
  ];
  
  if (
    !searchParams.searchValues &&
    (searchParams.specialties ||
      searchParams.academicTitles ||
      searchParams.degrees ||
      searchParams.sortBy)
  ) {
    doctors = await doctorService.getDoctorListByFilterAndSort(
      searchParams.specialties ? searchParams.specialties.split(",") : [],
      searchParams.academicTitles ? searchParams.academicTitles.split(",") : [],
      searchParams.degrees ? searchParams.degrees.split(",") : [],
      searchParams.sortBy
    );
  } else if (searchParams.searchValues) {
    doctors = await doctorService.getDoctorListByIdListAndSort(
      searchParams.searchValues,
      searchParams.sortBy
    );
  } else {
    doctors = await doctorService.getDoctorList();
  }
  const searchOptions: ISearchOption[] = (
    await doctorService.getDoctorList()
  ).map((d) => ({
    label: d.doctorName,
    value: d.doctorId.toString(),
  }));
  return (
    <div className="flex flex-col h-screen mt-10 gap-5 ">
      <div className="flex flex-row flex-wrap items-center justify-center gap-5">
        <SelectSort
          options={sortOptions}
          initialSelectedValue="highest_rated"
          path="/patient/doctors"
        />
        <DisplayToggle />
        <Search
          suggestedData={searchOptions}
          placeholder="Chọn hoặc tìm kiếm nhiều bác sĩ theo tên"
          path="/patient/doctors"
        />
      </div>
      <div className=" overflow-y-auto  ">
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
