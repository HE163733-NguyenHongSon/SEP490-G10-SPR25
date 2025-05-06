"use client";
import React, { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import Link from "next/link";
import { doctorService } from "@/common/services/doctorService";
import CollapsibleSection from "@/common/components/CollapsibleSection";
import { assets } from "@/public/images/assets";
import { DoctorList } from "@/guest/components/DoctorList";
import ListService from "@/guest/components/ListService";
import { feedbackService } from "@/common/services/feedbackService";
import FeedbackList from "@/guest/components/FeedbackList";
import { usePathname } from "next/navigation";

interface DoctorDetailPageProps {
  params: {
    doctorId: string;
  };
}

const DoctorDetailPage = ({ params }: DoctorDetailPageProps) => {
  const [doctorDetail, setDoctorDetail] = useState<IDoctorDetailDTO | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [retries, setRetries] = useState(0);
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;

  const routes = [
    { value: "overview", name: "Tổng quan" },
    { value: "services", name: "Dịch vụ đảm nhận" },
    { value: "reviews", name: "Bình luận đánh giá" },
  ];
  const pathname = usePathname();
  const userType = pathname.startsWith("/patient") ? "patient" : "guest";
  useEffect(() => {
    const fetchDoctorDetail = async () => {
      try {
        setLoading(true);
        const doctorId = parseInt(params.doctorId);
        if (isNaN(doctorId)) {
          setError("ID bác sĩ không hợp lệ");
          setLoading(false);
          return;
        }

        const doctorData = await doctorService.getDoctorDetailById(doctorId);
        setDoctorDetail(doctorData);
        setError(null);
        setLoading(false);
      } catch (error: unknown) {
        console.error("Lỗi khi tải chi tiết bác sĩ:", error);
        const errorMessage =
          error instanceof Error && error.message.includes("404")
            ? "Không tìm thấy bác sĩ"
            : "Không thể tải thông tin bác sĩ. Vui lòng thử lại sau.";
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchDoctorDetail();
  }, [params.doctorId, retries]);

  const handleRetry = () => {
    setRetries((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error || !doctorDetail) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center pt-20">
        <p className="text-red-500">{error || "Không tìm thấy bác sĩ"}</p>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
          >
            Thử lại
          </button>
          <Link
            href="/guest/doctors"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Quay lại danh sách bác sĩ
          </Link>
        </div>
      </div>
    );
  }

  const doctorFeedbacks = feedbackService.extractDoctorFeedback(
    doctorDetail.feedbacks
  );

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center z-10"
      style={{ backgroundImage: 'url("/images/background_doctors.jpeg")' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>

      <div className="relative container w-90 text-gray-600 p-5 mt-20 mb-5 z-30 bg-white rounded-xl shadow-2xl">
        <div className="flex flex-row p-6">
          <div className="relative h-[100px] w-[100px]">
            <Image
              className="rounded-lg object-cover"
              src={
                doctorDetail.avatarUrl
                  ? `${imgUrl}/${doctorDetail.avatarUrl}`
                  : "/images/placeholder-doctor.png"
              }
              fill
              alt="avatar doctor"
            />
          </div>
          <div className="flex flex-col justify-between font-sans px-5">
            <h1 className="font-semibold text-lg text-gray-700">
              <span className="mr-2">
                {doctorDetail.academicTitle}.{doctorDetail.degree}
              </span>
              {doctorDetail.userName}
            </h1>
            <h2 className="text-lg text-gray-700">
              {doctorDetail.currentWork}
            </h2>
            <p className="text-gray-400">
              {doctorDetail.specialtyNames.join(", ")}
            </p>

            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-cyan-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 21V13h8v8M3 21h18M12 3v6m3-3h-6M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"
                />
              </svg>
              <p className="font-medium">
                {doctorDetail.numberOfService} dịch vụ đảm nhận
              </p>
            </div>

            <div className="flex items-center gap-2 text-base">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2l4-4M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10z"
                />
              </svg>
              <p>
                <span className="text-gray-700">
                  {doctorDetail.numberOfExamination}
                </span>{" "}
                bệnh nhân đã khám
              </p>
            </div>

            {/* <Link href="/common/auth/login">
              <button className="px-4 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition">
                Đăng nhập để đặt lịch
              </button>
            </Link> */}
          </div>
        </div>

        {/* Tabs */}
        <Tabs.Root
          defaultValue="overview"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <Tabs.List className="flex border-b border-gray-300 px-6">
            {routes.map((route) => (
              <Tabs.Trigger
                key={route.value}
                value={route.value}
                className="py-2 px-4 text-gray-700 font-medium hover:text-cyan-600 data-[state=active]:border-b-2 data-[state=active]:border-cyan-600"
              >
                {route.name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <div className="px-5 py-4 h-fit overflow-y-auto">
            <Tabs.Content value="overview">
              <CollapsibleSection
                title="Mô tả"
                content={doctorDetail.doctorDescription}
                defaultExpanded={true}
                titleImage={assets.description}
              />
              <CollapsibleSection
                title="Tổ chức thành viên"
                content={doctorDetail.organization}
                defaultExpanded={true}
                titleImage={assets.organization}
              />
              <CollapsibleSection
                title="Giải thưởng"
                content={doctorDetail.prize}
                defaultExpanded={true}
                titleImage={assets.prize}
              />
              <CollapsibleSection
                title="Công trình nghiên cứu"
                content={doctorDetail.researchProject}
                defaultExpanded={true}
                titleImage={assets.research_work}
              />
            </Tabs.Content>

            {/* <Tabs.Content value="schedule">
              <div className="text-center py-6">
                <p className="text-lg mb-4">
                  Bạn cần đăng nhập để xem lịch của bác sĩ
                </p>
                <Link href="/common/auth/login">
                  <button className="px-6 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition">
                    Đăng nhập ngay
                  </button>
                </Link>
              </div>
            </Tabs.Content> */}

            <Tabs.Content value="services">
              <ListService
                items={doctorDetail.services}
                displayView="slider"
                isBooking={true}
              />
            </Tabs.Content>
            <Tabs.Content value="reviews">
              <FeedbackList feedbacks={doctorFeedbacks} displayView="list" />
            </Tabs.Content>
          </div>
          <div className="h-[60vh] overflow-y-auto flex flex-col items-center justify-center">
            <h6 className="max-w-fit text-xl font-bold text-center text-gray-600 drop-shadow-sm">
              Các bác sĩ cùng chuyên khoa
            </h6>
            <DoctorList
              items={doctorDetail.relevantDoctors}
              displayView="slider"
              userType={userType}
            />
          </div>
        </Tabs.Root>

        {/* <div className="text-center mt-6 pb-4">
          <p className="text-lg mb-4">
            Hãy đăng nhập để đặt lịch khám với bác sĩ {doctorDetail.userName}
          </p>
          <Link href="/common/auth/login">
            <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg text-white text-lg font-medium">
              Đăng nhập để đặt lịch khám
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default DoctorDetailPage;
