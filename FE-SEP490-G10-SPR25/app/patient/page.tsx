import GuestHomePage from "@/guest/page";

const PatientHomePage = async () => {
  return <GuestHomePage isGuest={false} />;
};

export default PatientHomePage;
