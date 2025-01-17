import React, { useContext } from "react";
import { SpecialtyList } from "./SpecialtyList";
import { Home } from "./Home";
import { DoctorList } from "./DoctorList";
import { ServiceList } from "./ServiceList";
import { BlogList } from "./BlogList";
import { AppointmentBooking } from "./AppointmentBooking";
import { NavContext } from "../../context/NavContext";

const componentsMap = {
  Home: { component: Home, background: "/background_home.jpeg" },
  Specialties: { component: SpecialtyList, background: "/background_specialties.jpeg" },
  Doctors: { component: DoctorList, background: "/background_doctors.jpeg" },
  Services: { component: ServiceList, background: "/background_services.jpeg" },
  Blogs: { component: BlogList, background: "/background_blogs.jpeg" },
  AppointmentBooking: { component: AppointmentBooking, background: "/background_register_treatment.jpeg" },
};

type NavType = keyof typeof componentsMap; 

const Body = () => {
  const navContext = useContext(NavContext);
  const nav: NavType = (navContext?.nav as NavType) || "Home";

  const { component: Component, background } = componentsMap[nav];

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${background})` }}
      id="Header"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <Component />
    </div>
  );
};

export default Body;
