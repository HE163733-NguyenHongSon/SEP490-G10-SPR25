import React from "react";
import PaginatedItems from "@/components/PaginatedItems";
import Search from "@/components/Search";
import DisplayToggle from "@/components/DisplayToggle";
import SelectSort from "@/components/SelectSort";
import { receptionistService } from "@/services/receptionistService";
import { PatientList } from "../components/PatientList";

const PatientsPage = async ({
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

  let patients: IPatient[] = [];
  // // const sortOptions: ISortOption[] = [
  // //   // { label: "Đánh giá cao nhất", value: "highest_rated" },
  // //   // { label: "Nhiều lần khám nhất", value: "most_exam" },
  // //   // { label: "Kinh nghiệm nhất", value: "most_exp" },
  // //   // { label: "Nhiều dịch vụ nhất", value: "most_service" },
  // //   { label: "xep mac dinh", value: "most_patientId" }
  // // ];
  
  // if (
  //   !searchParams.searchBy &&
  //   (searchParams.specialties ||
  //     searchParams.academicTitles ||
  //     searchParams.degrees ||
  //     searchParams.sortBy)
  // ) {
  //   patients = await receptionistService.getDoctorListByFilterAndSort(
  //     searchParams.specialties ? searchParams.specialties.split(",") : [],
  //     searchParams.academicTitles ? searchParams.academicTitles.split(",") : [],
  //     searchParams.degrees ? searchParams.degrees.split(",") : [],
  //     searchParams.sortBy
  //   );
  // } else if (searchParams.searchBy) {
  //   doctors = await doctorService.getDoctorListByIdListAndSort(
  //     searchParams.searchBy,
  //     searchParams.sortBy
  //   );
  // } else {
  //   doctors = await doctorService.getDoctorList();
  // }
  // const searchOptions: ISearchOption[] = (
  //   await doctorService.getDoctorList()
  // ).map((d) => ({
  //   label: d.doctorName,
  //   value: d.doctorId.toString(),
  // }));


  patients = await receptionistService.getPatientList();
  return (
    <div className="flex flex-col h-screen mt-10 gap-5 ">
      {/* <div className="flex flex-row flex-wrap items-center justify-center gap-5">
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
      </div> */}
      <div className=" overflow-y-auto  ">
        <PaginatedItems
          items={patients}
          itemsPerPage={6}
          RenderComponent={PatientList}
          displayView={searchParams.displayView || "grid"}
        />
      </div>
    </div>
  );
};

export default PatientsPage;
