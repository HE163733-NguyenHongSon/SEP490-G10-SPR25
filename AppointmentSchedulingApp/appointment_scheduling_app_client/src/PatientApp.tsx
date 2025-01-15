import Header from "./components/patient/Header";
import Body from "./components/patient/Body";
import { Footer } from "./components/patient/Footer";
import { NavProvider } from "./context/NavContext";

const PatientApp = () => {
  return (
    <div className="felx flex-col items-center grid grid-rows-4 gap-6">
      <NavProvider>
        <Header />
        <Body />       
        <Footer />
      </NavProvider>
    </div>
  );
};

export default PatientApp;
