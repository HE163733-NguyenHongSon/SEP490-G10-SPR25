import React from "react";
import PaginatedItems from "@/common/components/PaginatedItems";
import SearchForReceptionist from "../components/SearchForReceptionist";
import { patientService } from "@/common/services/patientService";
import { PatientList } from "../components/PatientList";

const PatientsPage = async ({
  searchParams,
}: {
  searchParams: {
    ranks?: string;
    searchField?: string;
    searchValue?: string;
    displayView?: string;
  };
}) => {
  let patients: IPatient[] = [];

  // Nếu có cả searchField và searchValue → gọi API search
  if (searchParams.searchField && searchParams.searchValue) {
    patients = await patientService.getPatientListBySearch(
      searchParams.searchField,
      searchParams.searchValue
    );
    console.log(patients);
    console.log(searchParams.searchField);
    console.log(searchParams.searchValue);
  } else if (searchParams.ranks) {
    // Chưa implement lọc theo ranks
    patients = await patientService.getPatientList();
  } else {
    // Mặc định lấy tất cả
    patients = await patientService.getPatientList();
  }

  return (
    <div className="flex flex-col h-screen mt-10 gap-5">
      <div className="flex flex-row flex-wrap items-center justify-center gap-5">
        <SearchForReceptionist
          placeholder="Tìm kiếm bệnh nhân"
          path="/receptionist/patient"
        />
      </div>
      <div className="overflow-y-auto">
        <PaginatedItems
          items={patients}
          itemsPerPage={10}
          RenderComponent={PatientList}
          displayView={searchParams.displayView || "grid"}
        />
      </div>
    </div>
  );
};

export default PatientsPage;
