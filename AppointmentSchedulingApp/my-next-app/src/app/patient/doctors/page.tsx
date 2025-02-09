
import React from "react";
import { DoctorList } from "@/components/patient/DoctorList";

const DoctorsPage = async () => {
  // async function fetchDoctors() {
  //   const res = await fetch("https://api.example.com/doctors",{ next: { revalidate: 3600 });
  //   const data = await res.json();
  //   return data;
  // }
  // const doctors = await fetchDoctors() ;

  return (
    <div
    className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center justify-center z-10"
    style={{ backgroundImage: 'url("/images/background_doctors.jpeg")' }}
      id="Body"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>
      <div className="z-30">
        <h2>Doctor List</h2>

        {/* <DoctorList doctorList={doctors} /> */}
      </div>
    </div>
  );
};

export default DoctorsPage;
