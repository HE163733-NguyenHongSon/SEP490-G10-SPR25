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
    ranks?: string;
    sortBy: string;
    searchBy?: string;
    displayView: string;
  };
}) => {

  let patients: IPatient[] = [];
  
 

  patients = await receptionistService.getPatientList();
  return (
    <div className="flex flex-col h-screen mt-10 gap-5 ">
      
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
