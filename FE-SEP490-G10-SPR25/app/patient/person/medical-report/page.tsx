"use client";

import React, { useEffect, useState } from "react";
import { assets } from "@/public/images/assets";
import MedicalRecordList from "@/patient/components/MedicalRecordList";
import { medicalRecordService } from "@/services/medicalRecordService";
import Image from "next/image";

const MedicalReportPage = () => {
  const [medicalRecords, setMedicalRecords] = useState<IMedicalRecord[]>([]);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      const res = await medicalRecordService.getMedicalRecordList();
      setMedicalRecords(res);
    };
    fetchMedicalRecords();
  }, []);

  return (
    <div className="flex flex-col m-5">
      {/* Tiêu đề */}
      <div className="grid grid-cols-2 p-5 border-b-2 border-gray-300">
        <div className="col-span-1 flex flex-row">
          <Image src={assets.logo} alt="Logo Bệnh viện" width={30} height={20} />
          <h1 className="flex items-center mx-2 text-xl text-cyan-500 gap-x-2">
            <span className="font-bold">HAS</span> Hospital
          </h1>
        </div>
        <div className="col-span-1 flex flex-row">
          <h1 className="text-xl text-cyan-500 font-bold flex items-center">
            Báo cáo y tế của bệnh nhân từ 3/2023 - 1/2025
          </h1>
        </div>
      </div>

      {/* Thông tin bệnh nhân */}
      <div className="grid grid-cols-2 p-5 border-b-2 border-gray-300">
        <div className="col-span-1 flex flex-col">
          <h1 className="text-lg ">Thông tin bệnh nhân</h1>
          <p className="gap-x-2">
            Số CMND/CCCD:
            <span className="font-light text-base text-gray-500">035002005151</span>
          </p>
          <p className="gap-x-2">
            Tên người dùng:
            <span className="font-light text-base text-gray-500">035002005151</span>
          </p>
          <p className="gap-x-2">
            Ngày sinh:
            <span className="font-light text-base text-gray-500">035002005151</span>
          </p>
          <p className="gap-x-2">
            Số điện thoại:
            <span className="font-light text-base text-gray-500">035002005151</span>
          </p>
          <p className="gap-x-2">
            Email:
            <span className="font-light text-base text-gray-500">035002005151</span>
          </p>
          <p className="gap-x-2">
            Address:
            <span className="font-light text-base text-gray-500">035002005151</span> 
          </p>
        </div>

        {/* Tóm tắt lịch sử khám bệnh */}
        <div className="col-span-1 flex flex-col">
          <h1 className="text-lg">Tóm tắt lịch sử khám bệnh</h1>
          <p className="gap-x-2">
            Tổng số lần khám:
            <span className="font-light text-base text-gray-500">035002005151</span>
          </p>
          <p className="gap-x-2">
            Lần khám gần nhất:
            <span className="font-light text-base text-gray-500">035002005151</span>
          </p>
          <p className="gap-x-2">
            Bệnh lý chính:
            <span className="font-light text-base text-gray-500">035002005151</span>
          </p>
        </div>
      </div>

      {/* Danh sách hồ sơ y tế */}
      <MedicalRecordList medicalRecordList={medicalRecords} />
    </div>
  );
};

export default MedicalReportPage;
