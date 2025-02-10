
import React from "react";
import { DoctorList } from "@/components/patient/DoctorList";
import { doctorService } from "@/services/doctorService";
const DoctorsPage = async () => {
  
  const doctors: IDoctor[] = await doctorService.getDoctorList();
  return (
    

      <div className="z-30">
        <h2>Doctor List</h2>

        <DoctorList doctorList={doctors} />
      </div>
    
  );
};

export default DoctorsPage;
