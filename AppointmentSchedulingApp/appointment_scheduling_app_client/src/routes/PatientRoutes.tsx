import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SpecialtyDetails } from "../components/patient/SpecialtyDetails";
import { SpecialtyList } from "../components/patient/SpecialtyList";
import PatientLayout from "../layouts/patient/PatientLayout";
import PersonLayout from "../layouts/patient/PersonLayout";
import { AppointmentBookingPage } from "../pages/patient/AppointmentBookingPage";
import DoctorPage from "../pages/patient/DoctorPage";
import { HomePage } from "../pages/patient/HomePage";
import MedicalReportPage from "../pages/patient/MedicalReportPage";
import ProfilePage from "../pages/patient/ProfilePage";
import ReservationPage from "../pages/patient/ReservationPage";
import ServicePage from "../pages/patient/ServicePage";
import SpecialtyPage from "../pages/patient/SpecialtyPage";

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
            <Route path="medical-report" element={<MedicalReportPage />} />
          </Route>
        </Route>

        <Route path="/" element={<SpecialtyList />} />
        <Route path="/specialty/:id" element={<SpecialtyDetails />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default PatientRoutes;
