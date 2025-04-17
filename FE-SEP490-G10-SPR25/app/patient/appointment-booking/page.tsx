import BookingForm from "../components/BookingForm";
const AppointmentBookingPage = () => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center justify-center z-10"
      style={{ backgroundImage: 'url("/images/background_register_treatment.jpeg")' }}
      id="Body"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>
         <BookingForm />
    </div>
  );
};
export default AppointmentBookingPage;