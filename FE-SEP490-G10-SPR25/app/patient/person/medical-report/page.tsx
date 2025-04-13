"use client";

import React, { useState, useEffect, useMemo } from "react";
import { assets } from "@/public/images/assets";
import MedicalRecordList from "@/patient/components/MedicalRecordList";
import ExportButton from "@/patient/components/ExportButton";
import { medicalReportService } from "@/services/medicalReportService";
import { useQuery } from "@tanstack/react-query";
import { LoadingTable } from "@/components/LoadingTable";
import Image from "next/image";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
import Fuse from "fuse.js";
import { DateRangeSelector } from "@/patient/components/DateRangeSelector";
import { patientService } from "@/services/patientService";
import SelectPatient from "@/patient/components/SelectPatient";
import {
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  HeartIcon,
  ArrowDownTrayIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  MapIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
const MedicalReportPage = () => {
  const [patient, setPatient] = useState<IPatient>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedDependent, setSelectedDependent] = useState<IPatient | null>(
    patient ?? null
  );
  // const [dependents, setDependents] = useState<IPatient[]>([]);
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser) as IPatient;
      setPatient(user);
    }
  }, []);

  const { data: patientList } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const pd = await patientService.getPatientDetailById(
        patient?.userId as number
      );
      const dependents = pd?.dependents || [];
      pd.relationship =
        dependents.length > 0 ? "Người giám hộ" : "Bệnh nhân chính";
      setSelectedDependent(pd);
      return [pd, ...dependents];
    },
    staleTime: 30000,
    enabled: !!patient?.userId,
  });

  const {
    data: medicalReport,
    isLoading: isLoadingMedicalReport,
    error: medicalReportError,
  } = useQuery<IMedicalReport>({
    queryKey: ["medicalReport", selectedDependent?.userId],
    queryFn: () =>
      medicalReportService.getMedicalReportByPatientId(
        selectedDependent?.userId as number
      ),
    staleTime: 30000,
    enabled: !!selectedDependent?.userId,
  });

  // Initialize Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    if (!medicalReport?.medicalRecords) return null;

    return new Fuse(medicalReport.medicalRecords, {
      keys: ["symptoms", "diagnosis", "treatmentPlan", "notes"],
      threshold: 0.3,
      includeScore: true,
    });
  }, [medicalReport]);

  // Filter records by search term and date range
  const filteredRecords = useMemo(() => {
    if (!medicalReport?.medicalRecords) return [];

    let records = medicalReport.medicalRecords;

    // Filter by search term
    if (searchTerm && fuse) {
      const results = fuse.search(searchTerm);
      records = results.map((result) => result.item);
    }

    // Filter by date range
    if (dateRange) {
      const [start, end] = dateRange;
      records = records.filter((record) => {
        const appointmentDate = dayjs(
          record.appointmentDate,
          "DD/MM/YYYY HH:mm:ss"
        );

        return (
          appointmentDate.isSameOrAfter(start.startOf("day")) &&
          appointmentDate.isSameOrBefore(end.endOf("day"))
        );
      });
    }

    return records;
  }, [medicalReport, searchTerm, dateRange, fuse]);

  // Generate search suggestions
  useEffect(() => {
    if (!fuse || searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }

    const results = fuse.search(searchTerm, { limit: 5 });
    const uniqueSuggestions = Array.from(
      new Set(
        results.flatMap((result) => {
          return Object.values(result.matches || {}).map(
            (match) => match.value
          );
        })
      )
    ).filter(Boolean) as string[];

    setSuggestions(uniqueSuggestions.slice(0, 5));
  }, [searchTerm, fuse]);

  // const handleResetFilters = () => {
  //   setSearchTerm("");
  //   setDateRange(null);
  // };

  const highlightText = (text: string = "") => {
    if (!searchTerm || !text) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, '<span class="bg-yellow-200">$1</span>');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoadingMedicalReport ? (
        <div className="flex items-center flex-col my-10 gap-5">
          <p className="font-semibold text-lg text-gray-500">Đang tải...</p>
          <LoadingTable />
        </div>
      ) : medicalReportError ? (
        <div className="p-5 text-red-500">
          Lỗi khi tải hồ sơ y tế. Vui lòng thử lại sau.
        </div>
      ) : (
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-start flex-wrap gap-4 bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex items-center">
              <Image
                src={assets.logo}
                alt="Hospital Logo"
                width={40}
                height={40}
                className="mr-3"
              />
              <div>
                <h1 className="text-2xl font-bold text-cyan-600">
                 HAS HOSPITAL
                </h1>
                <p className="text-sm text-gray-600">SĐT: 0123 456 789</p>
                <p className="text-sm text-gray-600">
                  Địa chỉ: 123 Đường ABC, TP XYZ
                </p>
              </div>
            </div>

            {(patientList ?? []).length > 1 && (
              <div className="text-left max-w-xs w-full">
                <SelectPatient
                  patients={patientList || []}
                  selectedPatient={selectedDependent ?? undefined}
                  onChange={(p) => setSelectedDependent(p)}
                />
                <p className="text-sm text-gray-600 italic mt-2">
                  Đang xem báo cáo y tế của:{" "}
                  <strong>{selectedDependent?.userName || "Chưa chọn"}</strong>
                </p>
              </div>
            )}
          </div>

          {/* Patient Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Patient Information Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <UserCircleIcon className="w-5 h-5 text-cyan-600 mr-2" />
                  Thông tin bệnh nhân
                </h2>
                <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full flex items-center">
                  <ShieldCheckIcon className="w-3 h-3 mr-1" />
                  Hồ sơ đang hoạt động
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Họ và tên */}
                  <div className="flex-1 bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-400 mb-1 flex items-center">
                      <UserIcon className="w-4 h-4 text-gray-400 mr-1" />
                      Họ và tên
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {medicalReport?.patient?.userName || "Chưa cập nhật"}
                    </p>
                  </div>

                  {/* Ngày sinh */}
                  <div className="flex-1 bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-400 mb-1 flex items-center">
                      <CalendarIcon className="w-4 h-4 text-gray-400 mr-1" />
                      Ngày sinh
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {medicalReport?.patient?.dob || "Chưa cập nhật"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-400 mb-1">
                      Giới tính
                    </p>
                    <div className="flex items-center">
                      {medicalReport?.patient?.gender === "male" ? (
                        <>
                          <MapIcon className="w-4 h-4 text-blue-500 mr-2" />
                          <span className="text-gray-800">Nam</span>
                        </>
                      ) : (
                        <>
                          <UserIcon className="w-4 h-4 text-pink-500 mr-2" />
                          <span className="text-gray-800">Nữ</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-gray-400 mb-1">
                    Liên hệ
                  </p>
                  <div className="flex flex-row  gap-16">
                    <div className="flex items-center ">
                      <PhoneIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-800">
                        {medicalReport?.patient?.phoneNumber || "Chưa cập nhật"}
                      </span>
                    </div>
                    <div className="flex items-center ">
                      <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-gray-800">
                        {medicalReport?.patient?.email || "Chưa cập nhật"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Địa chỉ */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-gray-400 mb-1">
                    Địa chỉ
                  </p>
                  <div className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                    <p className="text-gray-800">
                      {medicalReport?.patient?.address ||
                        "Chưa cập nhật địa chỉ"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Bệnh nhân thường xuyên
                </span>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  Đã xác minh
                </span>
              </div>
            </div>

            {/* Medical Summary */}
            <div className="bg-white p-6  rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <ClipboardDocumentCheckIcon className="w-5 h-5 text-cyan-600 mr-2" />
                  Tóm tắt y tế
                </h2>
                <span className="bg-cyan-100 text-cyan-800 text-xs px-3 py-1 rounded-full">
                  Cập nhật mới nhất
                </span>
              </div>

              <div className="flex flex-col gap-6">
                {/* Thống kê tổng quan */}
                <div className="bg-gray-50 p-4  rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500">
                      Tổng lượt khám
                    </p>
                    <UserGroupIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {medicalReport?.numberOfVisits}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {medicalReport?.firstVisitFormatted} →{" "}
                    {medicalReport?.lastVisitFormatted}
                  </p>
                </div>

                {/* Lần khám gần nhất */}
                <div className="bg-gray-50 p-4  rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500">
                      Lần khám gần nhất
                    </p>
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-xl font-bold text-gray-800 mt-2">
                    {medicalReport?.lastVisitFormatted}
                  </p>
                  <p className="text-xs text-cyan-600 mt-1 flex items-center">
                    <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                    Đã khám{" "}
                    {dayjs().diff(
                      dayjs(medicalReport?.lastVisitFormatted),
                      "day"
                    )}{" "}
                    ngày trước
                  </p>
                </div>

                {/* Tình trạng chính */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500">
                      Tình trạng chính
                    </p>
                    <HeartIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-lg font-semibold text-gray-800 mt-2">
                    {medicalReport?.mainCondition || "Không có thông tin"}
                  </p>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-cyan-600 h-1.5 rounded-full"
                        style={{ width: "75%" }} // Có thể thay bằng giá trị thực từ API
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-right">
                      Tiến triển tốt
                    </p>
                  </div>
                </div>
              </div>

              {/* Nút hành động */}
              <div className="mt-6 flex justify-end">
                <button className="flex items-center text-sm text-cyan-600 hover:text-cyan-800">
                  <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                  Xuất báo cáo
                  <ExportButton patientId={patient?.userId} />

                </button>
              </div>
            </div>
          </div>
          {/* Medical Records List */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Danh sách hồ sơ y tế ({filteredRecords.length})
            </h2>
            {/* Search and Filter Section */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search Input */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tìm kiếm hồ sơ
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập triệu chứng, chẩn đoán..."
                    className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span className="absolute left-3 top-8 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>

                  {/* Search Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200">
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSearchTerm(suggestion);
                            setSuggestions([]);
                          }}
                          dangerouslySetInnerHTML={{
                            __html: highlightText(suggestion),
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Date Range Picker */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Khoảng thời gian khám
                  </label>
                  <DateRangeSelector
                    value={dateRange}
                    onChange={setDateRange}
                  />
                </div>

                {/* <div className="flex items-end space-x-2">
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Đặt lại
                </button>
              </div> */}

                <div className="text-sm text-gray-500">
                  Tìm thấy {filteredRecords.length} hồ sơ
                </div>
              </div>
            </div>
            <MedicalRecordList
              medicalRecordList={filteredRecords}
              searchTerm={searchTerm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalReportPage;
