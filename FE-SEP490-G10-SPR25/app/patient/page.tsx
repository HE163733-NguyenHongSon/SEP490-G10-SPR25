import { About } from "./components/About";
import { SpecialtyList } from "@/patient/components/SpecialtyList";
import { specialtyService } from "@/services/specialtyService";
import { doctorService } from "@/services/doctorService";
import { serviceService } from "@/services/serviceService";
import { feedbackService } from "@/services/feedbackService";
import { DoctorList } from "@/patient/components/DoctorList";
import { TabsGroup } from "@/components/TabsGroup";
import { ListService } from "@/patient/components/ListService";
import FeedbackList from "@/patient/components/FeedbackList";
import { ServiceDTO } from "@/types/service";
import HomeSearch from "@/patient/components/HomeSearch";

const HomePage = async () => {
  const specialties = await specialtyService.getSpecialtyList();
  const doctors = await doctorService.getDoctorList();
  const services = await serviceService.getAllServices();
  const feedbacks = await feedbackService.getFeedbackList();
  const doctorFeedbacks = feedbackService.extractDoctorFeedback(feedbacks);
  const serviceFeedbacks = feedbackService.extractServiceFeedback(feedbacks);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const doctorTabs: ITabItem[] = specialties.map((s) => ({
    label: s.specialtyName,
    href: `${apiUrl}/api/Doctors?$filter=specialtyNames/any(s: s eq '${s.specialtyName}')&$orderby=numberOfExamination desc&$top=6`,
  }));
  doctorTabs.unshift({
    label: "Tất cả chuyên khoa",
    href: `${apiUrl}/api/Doctors?$orderby=numberOfExamination desc&$top=6`,
  });
  const serviceTabs: ITabItem[] = specialties.map((s) => ({
    label: s.specialtyName,
    href: `${apiUrl}/api/Services?$filter=specialtyId eq ${s.specialtyId}&$orderby=rating desc&$top=6`,
  }));
  serviceTabs.unshift({
    label: "Tất cả dịch vụ",
    href: `${apiUrl}/api/Services?$orderby=rating desc&$top=6`,
  });
  const suggestedData = [
    ...specialties.map((s: ISpecialty) => ({
      label: s.specialtyName,
      value: s.specialtyId.toString(),
      id: Number(s.specialtyId),
      image: s.image ?? "",
      type: "specialty",
    })),
    ...doctors.map((d: IDoctor) => ({
      label: d.doctorName,
      value: d.doctorId.toString(),
      id: Number(d.doctorId),
      image: d.avatarUrl ?? "",
      type: "doctor",
    })),
    ...services.map((s: ServiceDTO) => ({
      label: s.serviceName,
      value: s.serviceId.toString(),
      id: Number(s.serviceId),
      image: s.image ?? "",
      type: "service",
    }))
  ];

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center justify-center z-10"
      style={{ backgroundImage: 'url("/images/background_home.jpeg")' }}
      id="Body"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>
      <div className="max-w-fit flex flex-col items-center justify-center container text-center p-6 md:px-5 lg:px-10 lg:mx-48 text-white z-30">
        <HomeSearch
          fields={[
            {
              label: "Chuyên khoa",
              value: "specialty",
              placeholder: "Tìm chuyên khoa...",
            },
            { label: "Bác sĩ", value: "doctor", placeholder: "Tìm bác sĩ..." },
            {
              label: "Dịch vụ",
              value: "service",
              placeholder: "Tìm dịch vụ...",
            },
          ]}
          suggestedData={suggestedData}
        />

        <div className="mt-52 flex flex-col items-center justify-center">
          <h2 className="text-3xl sm:text-4xl md:text-[50px] inline-grid max-w-3xl font-semibold pt-20">
            Đặt lịch khám và xem kết quả trực tuyến
          </h2>
          <h2 className="text-xl text-cyan-500 sm:text-xl md:text-xl md:inline-grid max-w-4xl pt-8">
            Giờ đây bạn có thể đặt lịch hẹn trước khi đến khám và nhanh chóng
            xem kết quả xét nghiệm trực tuyến mọi lúc, mọi nơi.
          </h2>
          <div className="space-x-6 mt-10">
            <a
              className="border border-white px-8 py-3 rounded hover:underline underline-offset-4"
              href="#"
            >
              Đặt lịch khám
            </a>
            <a
              className="bg-cyan-600 px-8 py-3 rounded hover:underline underline-offset-4"
              href="#"
            >
              Liên hệ với chúng tôi
            </a>
          </div>
        </div>
        <About />
        <div className="container flex  items-center justify-center flex-col">
          <h2 className="max-w-fit text-2xl sm:text-3xl md:text-4xl font-bold text-center mt-16 mb-8 bg-gradient-to-r from-cyan-500 to-white bg-clip-text text-transparent drop-shadow-sm">
            Khám phá các chuyên khoa nổi bật
          </h2>

          <SpecialtyList items={specialties} displayView="slider" />
        </div>
        <div className="bg-white rounded-3xl mt-10 mx-12 p-6 md:p-10 lg:p-14  shadow-2xl  ">
          <h1 className="text-cyan-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 ">
            Top bác sĩ hàng đầu
            <span className="ml-3 underline underline-offset-4 decoration-1 font-light">
              chuyên khoa
            </span>
          </h1>
          <TabsGroup<IDoctor>
            tabs={doctorTabs}
            RenderComponent={DoctorList}
            displayView="grid"
          />
        </div>
        <div className="container flex  items-center justify-center flex-col">
          <h2 className=" max-w-fit text-2xl sm:text-3xl md:text-4xl font-bold text-center mt-16 mb-8 bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
            Nhận xét đánh giá bác sĩ
          </h2>
          <FeedbackList feedbacks={doctorFeedbacks} displayView="slider" />
        </div>
        <div className="bg-white rounded-3xl mt-10 mx-12 p-6 md:p-10 lg:p-14  shadow-2xl  ">
          <h1 className="text-cyan-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 ">
            Top dịch vụ hàng đầu
            <span className="ml-3 underline underline-offset-4 decoration-1 font-light">
              chuyên khoa
            </span>
          </h1>
          <TabsGroup<ServiceDTO>
            tabs={serviceTabs}
            RenderComponent={ListService}
            displayView="grid"
          />
        </div>

        <div className="container  flex  items-center justify-center flex-col  ">
          <h2 className=" max-w-fit text-2xl sm:text-3xl md:text-4xl font-bold text-center mt-16 mb-8 bg-gradient-to-r from-cyan-500 to-white bg-clip-text text-transparent drop-shadow-sm">
            Nhận xét đánh giá dịch vụ
          </h2>

          <FeedbackList feedbacks={serviceFeedbacks} displayView="slider" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
