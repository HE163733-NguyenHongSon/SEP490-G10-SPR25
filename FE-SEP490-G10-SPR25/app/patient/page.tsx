import { About } from "./components/About";

const HomePage = () => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center justify-center z-10"
      style={{ backgroundImage: 'url("/images/background_home.jpeg")' }}
      id="Body"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>
      <div className="max-w-fit container text-center p-6 md:px-5 lg:px-10 lg:mx-48 text-white z-30">
        <div className="mt-52">
          <h2 className="text-3xl sm:text-4xl md:text-[50px] inline-grid max-w-3xl font-semibold pt-20">
            Đặt lịch khám và xem kết quả trực tuyến
          </h2>
          <h2 className="text-xl text-cyan-500 sm:text-xl md:text-xl md:inline-grid max-w-4xl pt-8">
            Giờ đây bạn có thể đặt lịch hẹn trước khi đến khám và nhanh chóng xem kết quả xét nghiệm trực tuyến mọi lúc, mọi nơi.
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
      </div>
    </div>
  );
};

export default HomePage;
