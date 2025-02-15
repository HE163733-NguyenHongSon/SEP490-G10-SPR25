"use client";
// import { useParams } from "next/navigation";

const FilteredDoctorsPage = ({ params }: { params: { filters?: string[] } })=> {
  // const params = useParams();
  const filters = params.filters || []; 

  const specialtyId = filters[0] || "All Specialties";
  const dgree = filters[1] || "All Titles";

  return (
    <div>
      <h1>Filtered Doctors</h1>
      <p>Specialty ID: {specialtyId}</p>
      <p>Academic Title: {dgree}</p>
    </div>
  );
};

export default FilteredDoctorsPage;
