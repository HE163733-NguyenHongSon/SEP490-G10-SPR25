import Header from "./components/patient/Header";
import Body from "./components/patient/Body";
import { Footer } from "./components/patient/Footer";
import { NavProvider } from "./contexts/NavContext";

const PatientApp = () => {
  return (
    <NavProvider>
      <div className="flex flex-col ">
        <Header />
        <Body />
        <Footer />
      </div>
    </NavProvider>
  );
};

export default PatientApp;
