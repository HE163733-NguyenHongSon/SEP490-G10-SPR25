import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PatientLayout from "../layouts/patient/PatientLayout";
import { HomePage } from "../pages/patient/HomePage";
import ServicePage from "../pages/patient/ServicePage";
import SpecialtyPage from "../pages/patient/SpecialtyPage";
import DoctorPage from "../pages/patient/DoctorPage";
import { AppointmentBookingPage } from "../pages/patient/AppointmentBookingPage";
import ProfilePage from "../pages/patient/ProfilePage";
import MedicalReport from "../components/patient/MedicalReport";
import PersonLayout from "../layouts/patient/PersonLayout";
import ReservationPage from "../pages/patient/ReservationPage";

const PatientRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientLayout />}>
          <Route index element={<HomePage />} />
          <Route path="specialties" element={<SpecialtyPage />} />
          <Route path="doctors" element={<DoctorPage />} />
          <Route path="services" element={<ServicePage />} />
          <Route
            path="appointment-booking"
            element={<AppointmentBookingPage />}
          />

          <Route path="person" element={<PersonLayout />}>
            <Route index element={<Navigate to="profile" />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="reservations" element={<ReservationPage />} />
            <Route path="medical-report" element={<MedicalReport />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default PatientRoutes;
