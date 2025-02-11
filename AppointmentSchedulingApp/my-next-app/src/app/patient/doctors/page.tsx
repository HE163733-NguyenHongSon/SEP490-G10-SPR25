
import { doctorService } from "@/services/doctorService";
import React from "react";
import PaginatedItems from "@/components/common/PaginatedItems";
import { DoctorList } from "@/components/patient/DoctorList";

const DoctorsPage = async () => {
  const doctors = await doctorService.getDoctorList();

  return (
    <div >
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
