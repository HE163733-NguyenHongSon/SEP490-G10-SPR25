import React from "react";
import PaginatedItems from "@/components/PaginatedItems";
import { patientService } from "@/services/patientService";
import { PatientList } from "../components/PatientList";
export const dynamic = 'force-dynamic'; 
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
  
 

  patients = await patientService.getPatientList();
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
