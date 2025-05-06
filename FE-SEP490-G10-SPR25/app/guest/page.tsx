import { About } from "./components/About";
import { SpecialtyList } from "@/guest/components/SpecialtyList";
import { specialtyService } from "@/common/services/specialtyService";
import { feedbackService } from "@/common/services/feedbackService";
import { DoctorList } from "@/guest/components/DoctorList";
import { TabsGroup } from "@/common/components/TabsGroup";
import ListService from "@/guest/components/ListService";
import { PostList } from "@/guest/components/PostList";
import FeedbackList from "@/guest/components/FeedbackList";
import VideoPlayer from "./components/VideoPlayer";
import SymptomPopup from "../patient/appointment-booking/SymptomPopup";
import { getPostList } from "@/common/services/postService";

const GuestHomePage = async ({ isGuest = true }: { isGuest: boolean }) => {
  const specialties = await specialtyService.getSpecialtyList();

  const posts = await getPostList();
  const feedbacks = await feedbackService.getFeedbackList();
  const doctorFeedbacks = feedbackService
    .extractDoctorFeedback(feedbacks)
    .sort((a, b) => b.rating - a.rating);
  const serviceFeedbacks = feedbackService
    .extractServiceFeedback(feedbacks)
    .sort((a, b) => b.rating - a.rating);

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

  const sectionClass = "w-full max-w-screen-3xl px-4 md:px-10 lg:px-20 mx-auto";

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center justify-center z-10"
      style={{ backgroundImage: 'url("/images/background_home.jpeg")' }}
      id="Body"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>
      <div className={`text-white z-30 ${sectionClass}`}>
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl sm:text-4xl md:text-[50px] font-semibold pt-20">
            Đặt lịch khám và xem kết quả trực tuyến
          </h2>
          <h2 className="text-xl text-cyan-500 pt-8">
            Giờ đây bạn có thể đặt lịch hẹn trước khi đến khám và nhanh chóng
            xem kết quả xét nghiệm trực tuyến mọi lúc, mọi nơi.
          </h2>

          {isGuest === false ? (
            <SymptomPopup />
          ) : (
            <div className="mt-10">
              <a
                href="/common/auth/login"
                className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg text-white text-lg font-medium transition-colors duration-200"
              >
                Đăng nhập để đặt lịch khám
              </a>
            </div>
          )}

          <VideoPlayer />
        </div>

        <About />

        <div className={`${sectionClass} text-center`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-16 mb-8 bg-gradient-to-r from-cyan-500 to-white bg-clip-text text-transparent">
            Khám phá các chuyên khoa nổi bật
          </h2>
          <SpecialtyList items={specialties} displayView="slider" />
        </div>

        <div className="bg-white rounded-3xl mt-10 py-10 shadow-2xl w-full mx-auto">
          <div className={sectionClass}>
            <h1 className=" text-center text-cyan-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              Top bác sĩ hàng đầu
              <span className="ml-3 underline underline-offset-4 font-light">
                chuyên khoa
              </span>
            </h1>
            <TabsGroup<IDoctor>
              tabs={doctorTabs}
              RenderComponent={DoctorList}
              displayView="grid"
              userType={isGuest ? "guest" : "patient"}
            />
          </div>
        </div>

        <div className={`${sectionClass} `}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-16 mb-8 bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent text-center">
            Nhận xét đánh giá bác sĩ
          </h2>
          <FeedbackList feedbacks={doctorFeedbacks} displayView="slider" />
        </div>

        <div className="bg-white rounded-3xl mt-10 py-10 shadow-2xl w-full mx-auto">
          <div className={sectionClass}>
            <h1 className="text-center text-cyan-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center">
              Top dịch vụ hàng đầu
              <span className="ml-3 underline underline-offset-4 font-light">
                chuyên khoa
              </span>
            </h1>
            <TabsGroup<IService>
              tabs={serviceTabs}
              RenderComponent={ListService}
              displayView="grid"
            />
          </div>
        </div>

        <div className={`${sectionClass} `}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-16 mb-8 bg-gradient-to-r from-cyan-500 to-white bg-clip-text text-transparent text-center">
            Nhận xét đánh giá dịch vụ
          </h2>
          <FeedbackList feedbacks={serviceFeedbacks} displayView="slider" />
        </div>
        <div className={`${sectionClass} `}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-16 mb-8 bg-gradient-to-r from-cyan-500 to-white bg-clip-text text-transparent text-center">
            Các bài viết,cẩm nang sức khỏe
          </h2>
          <PostList items={posts} displayView="slider" />
        </div>
      </div>
    </div>
  );
};

export default GuestHomePage;
