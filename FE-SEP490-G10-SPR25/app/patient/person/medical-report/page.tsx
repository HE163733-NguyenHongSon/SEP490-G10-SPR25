"use client";

import React, { useState,useEffect } from "react";
import { assets } from "@/public/images/assets";
import MedicalRecordList from "@/patient/components/MedicalRecordList";
import { medicalReportService } from "@/services/medicalReportService";
import { useQuery } from "@tanstack/react-query";
import { LoadingTable } from "@/components/LoadingTable";

import Image from "next/image";

const MedicalReportPage = () => {

  const [patientId, setPatientId] = useState<number>(23);
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser) as IUser;
      setPatientId(user?.userId);
    }
  }, []);
  
  const {
    data: medicalReport,
    isLoading: isLoadingMedicalReport,
    error: medicalReportError
  } = useQuery({
    queryKey: ["medicalReport", patientId],
    queryFn: () => medicalReportService.getMedicalReportByPatientId(patientId),
    staleTime: 30000,
  });

  return (
    <>
      {isLoadingMedicalReport ? (
        <div className="flex items-center flex-col my-10 gap-5">
          <p className="font-semibold text-lg text-gray-500">Loading...</p>
          <LoadingTable />
        </div>
      ) : medicalReportError ? (
        <p>Error loading data</p>
      ) : (
        <div className="flex flex-col m-5">
          {/* Tiêu đề */}
          <div className="grid grid-cols-2 p-5 border-b-2 border-gray-300">
            <div className="col-span-1 flex flex-row">
              <Image
                src={assets.logo}
                alt="Logo Bệnh viện"
                width={30}
                height={20}
              />
              <h1 className="flex items-center mx-2 text-xl text-cyan-500 gap-x-2">
                <span className="font-bold">HAS</span> Hospital
              </h1>
            </div>
            <div className="col-span-1 flex flex-row">
              <h1 className="text-xl text-cyan-500 font-bold flex items-center">
                {`Báo cáo y tế của bệnh nhân từ ${medicalReport?.firstVisitFormatted} - ${medicalReport?.lastVisitFormatted}`}
              </h1>
            </div>
          </div>

          {/* Thông tin bệnh nhân */}
          <div className="grid grid-cols-2 p-5 border-b-2 border-gray-300">
            <div className="col-span-1 flex flex-col">
              <h1 className="text-lg ">Thông tin bệnh nhân</h1>
              <p className="gap-x-3">
                Số CMND/CCCD:
                <span className="font-light text-base text-gray-500">
                  {medicalReport?.patient?.citizenId}
                </span>
              </p>
              <p className="gap-x-2">
                Tên người dùng:
                <span className="font-light text-base text-gray-500">
                  {medicalReport?.patient?.userName}
                </span>
              </p>
              <p className="gap-x-2">
                Ngày sinh:
                <span className="font-light text-base text-gray-500">
                  {medicalReport?.patient?.dob}
                </span>
              </p>
              <p className="gap-x-2">
                Số điện thoại:
                <span className="font-light text-base text-gray-500">
                  {medicalReport?.patient?.phoneNumber}
                </span>
              </p>
              <p className="gap-x-2">
                Email:
                <span className="font-light text-base text-gray-500">
                  {medicalReport?.patient?.email}
                </span>
              </p>
              <p className="gap-x-2">
                Address:
                <span className="font-light text-base text-gray-500">
                  {medicalReport?.patient?.address}
                </span>
              </p>
            </div>

            {/* Tóm tắt lịch sử khám bệnh */}
            <div className="col-span-1 flex flex-col">
              <h1 className="text-lg">Tóm tắt lịch sử khám bệnh</h1>
              <p className="gap-x-2">
                Tổng số lần khám:
                <span className="font-light text-base text-gray-500">
                  {medicalReport?.numberOfVisits}
                </span>
              </p>
              <p className="gap-x-2">
                Lần khám gần nhất:
                <span className="font-light text-base text-gray-500">
                  {medicalReport?.lastVisitFormatted}
                </span>
              </p>
              <p className="gap-x-2">
                Bệnh lý chính:
                <span className="font-light text-base text-gray-500">
                  {medicalReport?.mainCondition}
                </span>
              </p>
            </div>
          </div>

          {/* Danh sách hồ sơ y tế */}
          <MedicalRecordList
            medicalRecordList={medicalReport?.medicalRecords}
          />
        </div>
      )}
    </>
  );
};

export default MedicalReportPage;
