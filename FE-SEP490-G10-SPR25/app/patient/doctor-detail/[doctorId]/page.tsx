import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import BackButton from "@/components/BackButton";
import { doctorService } from "@/services/doctorService";
import CollapsibleSection from "@/components/CollapsibleSection";
import { assets } from "@/public/images/assets";
import ScheduleTab from "@/patient/components/ScheduleTab";
import { DoctorList } from "@/patient/components/DoctorList";
import  ListService  from "@/patient/components/ListService";
import { feedbackService } from "@/services/feedbackService";
import FeedbackList from "@/patient/components/FeedbackList";

export default async function DoctorDetails({
  params,
}: {
  params: { doctorId: string };
}) {
  const doctorDetail: IDoctorDetail = await doctorService.getDoctorDetailById(
    params.doctorId
  );
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
  const routes = [
    { value: "overview", name: "Tổng quan" },
    { value: "schedule", name: "Lịch bác sĩ" },
    { value: "services", name: "Dịch vụ đảm nhận" },
    { value: "reviews", name: "Bình luận đánh giá" },
  ];
  const doctorFeedbacks = feedbackService.extractDoctorFeedback(doctorDetail.feedbacks);

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center z-10"
      style={{ backgroundImage: 'url("/images/background_doctors.jpeg")' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>

      <div className="relative container w-90 text-gray-600 p-5 mt-20 mb-5 z-30 bg-white rounded-xl shadow-2xl">
        <div className="flex flex-row p-6">
          <BackButton />
          <div className="relative h-[100px] w-[100px]">
            <Image
              className="rounded-lg object-cover"
              src={`${imgUrl}/${doctorDetail.avatarUrl}`}
              fill
              alt="avatar doctor"
            />
          </div>
          <div className="flex flex-col justify-between font-sans px-5">
            <h1 className="font-semibold text-lg text-gray-700">
              <span className="mr-2">
                {doctorDetail.academicTitle}.{doctorDetail.degree}
              </span>
              {doctorDetail.doctorName}
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
            <button className="px-3 w-fit bg-cyan-500 text-white rounded-full">
              Hẹn bác sĩ
            </button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs.Root defaultValue="overview">
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
                content={doctorDetail.detailDescription}
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
            <Tabs.Content value="schedule">
              <ScheduleTab />
            </Tabs.Content>
            <Tabs.Content value="services">
              <ListService items={doctorDetail.services} displayView="slider"/>
            </Tabs.Content>
            <Tabs.Content value="reviews">
            <FeedbackList feedbacks={doctorFeedbacks} displayView="list" />
            </Tabs.Content>
          </div>
          <div className=" h-[60vh] overflow-y-auto flex flex-col  items-center justify-center">
            <h6 className="max-w-fit text-xl  font-bold text-center   text-gray-600   drop-shadow-sm">
              Các bác sĩ cùng chuyên khoa
            </h6>
            <DoctorList
              items={doctorDetail.relevantDoctors}
              displayView="slider"
            />
          </div>
        </Tabs.Root>
      </div>
    </div>
  );
}
