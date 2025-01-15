import React from "react";
import { useContext } from "react";
import { SpecialtyList } from "./SpecialtyList";
import { Home } from "./Home";
import { DoctorList } from "./DoctorList";
import { ServiceList } from "./ServiceList";
import { BlogList } from "./BlogList";
import { AppointmentBooking } from "./AppointmentBooking";
import { NavContext } from "../../context/NavContext";

const Body = () => {
  const navContext = useContext(NavContext);
  const nav = navContext ? navContext.nav : "Home";
  return (
    <div
      className="relative min-h-screen  w-full bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('/background.jpeg')" }}
      id="Header"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {nav === "Home" ? (
        <Home />
      ) : nav === "Specialties" ? (
        <SpecialtyList />
      ) : nav === "Doctors" ? (
        <DoctorList />
      ) : nav === "Services" ? (
        <ServiceList />
      ) : nav === "Blogs" ? (
        <BlogList />
      ) : (
        <AppointmentBooking />
      )}
    </div>
  );
};
export default Body;
