"use client";

import React, { useState } from "react";
import PaginatedItems from "@/components/PaginatedItems";
import Search from "@/components/Search";
import DisplayToggle from "@/components/DisplayToggle";
import SelectSort from "@/components/SelectSort";

interface Patient {
  patientId: string;
  userName: string;
  citizenId: string;
  gender: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  guardian: string;
  rank: string;
}

const mockPatients: Patient[] = [
  {
    patientId: "P001",
    userName: "John Doe",
    citizenId: "123456789",
    gender: "Male",
    dob: "1990-01-01",
    phone: "1234567890",
    email: "john.doe@example.com",
    address: "123 Main St",
    guardian: "Jane Doe",
    rank: "Gold",
  },
  {
    patientId: "P002",
    userName: "Jane Smith",
    citizenId: "987654321",
    gender: "Female",
    dob: "1995-05-15",
    phone: "0987654321",
    email: "jane.smith@example.com",
    address: "456 Elm St",
    guardian: "John Smith",
    rank: "Silver",
  },
];

const PatientList = ({ item }: { item: Patient }) => (
  <div className="p-4 border rounded-lg shadow-md bg-white">
    <h2 className="font-bold text-lg">{item.userName}</h2>
    <p>
      <strong>Citizen ID:</strong> {item.citizenId}
    </p>
    <p>
      <strong>Gender:</strong> {item.gender}
    </p>
    <p>
      <strong>DOB:</strong> {item.dob}
    </p>
    <p>
      <strong>Phone:</strong> {item.phone}
    </p>
    <p>
      <strong>Email:</strong> {item.email}
    </p>
    <p>
      <strong>Address:</strong> {item.address}
    </p>
    <p>
      <strong>Guardian:</strong> {item.guardian}
    </p>
    <p>
      <strong>Rank:</strong> {item.rank}
    </p>
  </div>
);

const PatientInformation = () => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.citizenId.includes(searchTerm) ||
      patient.phone.includes(searchTerm);
    const matchesGender =
      genderFilter === "" || patient.gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  return (
    <div className="flex flex-col h-screen mt-10 gap-5">
      <div className="flex flex-row flex-wrap items-center justify-center gap-5">
        <SelectSort
          options={[
            { label: "Tên A-Z", value: "name_asc" },
            { label: "Tên Z-A", value: "name_desc" },
          ]}
          initialSelectedValue="name_asc"
          path="/receptionist/patientInformation"
        />
        <DisplayToggle />
        <Search
          suggestedData={patients.map((p) => ({
            label: p.userName,
            value: p.patientId,
          }))}
          placeholder="Tìm kiếm bệnh nhân theo tên"
          path="/receptionist/patientInformation"
        />
      </div>
      <div className="overflow-y-auto">
        <PaginatedItems
          items={filteredPatients}
          itemsPerPage={6}
          RenderComponent={PatientList}
          displayView="grid"
        />
      </div>
    </div>
  );
};

export default PatientInformation;