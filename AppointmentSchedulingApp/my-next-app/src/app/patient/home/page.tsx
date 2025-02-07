import { About } from "../../../components/patient/About";

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
          <h2 className="text-4xl sm:text-5xl md:text-[72px] inline-grid max-w-3xl font-semibold pt-20">
            Schedule an appointment and view your results online
          </h2>
          <h2 className="text-2xl text-cyan-500 sm:text-xl md:text-2xl md:inline-grid max-w-4xl">
            Now you can make an appointment before coming for a check-up and view your test results online quickly anytime, anywhere.
          </h2>
          <div className="space-x-6 mt-16">
            <a className="border border-white px-8 py-3 rounded hover:underline underline-offset-4" href="#">
              Booking appointment
            </a>
            <a className="bg-cyan-600 px-8 py-3 rounded hover:underline underline-offset-4" href="#">
              Contact us
            </a>
          </div>
        </div>
        <About />
      </div>
    </div>
  );
};
export default HomePage

