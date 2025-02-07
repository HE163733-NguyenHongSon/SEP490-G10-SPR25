'use client'

import React, { useEffect, useState } from "react";
import { assets } from "../../../../../public/images/assets";
import MedicalRecordList from "../../../../components/patient/MedicalRecordList";
import { medicalRecordService } from "../../../../services/medicalRecordService";
import Image from "next/image";
const MedicalReportPage = () => {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  useEffect(() => {
    const fetchMedicalRecords = async () => {
      const res = await medicalRecordService.getMedicalRecordList();
      setMedicalRecords(res);
    };
    fetchMedicalRecords();
  }, []);
  return (
    <div className="  flex flex-col m-5 ">
      <div className="grid grid-cols-2 p-5  border-b-2  border-gray-300">
        <div className="col-span-1  flex flex-row  ">
          <Image src={assets.logo} alt="Hospital Logo" width={14} height={14} />
          <h1 className="flex items-center mx-2 text-2xl text-cyan-500 gap-x-2   ">
            <span className="font-bold ">HAS</span>Hospital
          </h1>
        </div>
        <div className="col-span-1 flex flex-row  ">
          <h1 className="text-2xl text-cyan-500 font-bold flex items-center">
            Patient medical report from 3/2023-1/2025
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 p-5 border-b-2  border-gray-300">
        <div className="col-span-1 flex flex-col ">
          <h1 className="text-xl">Patient information</h1>
          <p className="gap-x-2">
            CitizenId:
            <span className="font-light text-base text-gray-500">
              035002005151
            </span>
          </p>
          <p className="gap-x-2">
            User name:
            <span className="font-light text-base text-gray-500">
              035002005151
            </span>
          </p>
          <p className="gap-x-2">
            Date of birth:
            <span className="font-light text-base text-gray-500 ">
              035002005151
            </span>
          </p>
          <p className="gap-x-2">
            Phone:
            <span className="font-light text-base text-gray-500">
              035002005151
            </span>
          </p>
          <p className="gap-x-2">
            Email:
            <span className="font-light text-base text-gray-500">
              035002005151
            </span>
          </p>
        </div>

        <div className="col-span-1 flex flex-col ">
          <h1 className="text-xl">Summary of medical examination history</h1>
          <p className="gap-x-2">
            Total number of visits:
            <span className="font-light text-base text-gray-500">
              035002005151
            </span>
          </p>
          <p className="gap-x-2">
            Last visit:
            <span className="font-light text-base text-gray-500">
              035002005151
            </span>
          </p>
          <p className="gap-x-2">
            Main pathologies:
            <span className="font-light text-base text-gray-500">
              035002005151
            </span>
          </p>
        </div>
      </div>

      <MedicalRecordList medicalRecordList={medicalRecords} />
    </div>
  );
};

export default MedicalReportPage;
