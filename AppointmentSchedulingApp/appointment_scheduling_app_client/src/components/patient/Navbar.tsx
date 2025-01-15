import React from "react";
import { assets } from "../../assets/assets";
const Navbar = () => {
  return (
    <div className=" top-0 left-0 w-full z-10  bg-cyan-500 bg-opacity-70">
      <div
        className="container mx-auto flex justify-between items-center
       py-4 px-6 md:px-20 lg:px-32 bg-transparent"
      >
        <img className="w-12 h-12" src={assets.logo} alt="" />
        <ul className=" hidden  md:flex gap-20 text-white text-center">
          <a href="#home" className="cursor-pointer hover:text-gray-400">
            Home
          </a>
          <a href="#home" className="cursor-pointer hover:text-gray-400">
            Specialties
          </a>
          <a href="#home" className="cursor-pointer hover:text-gray-400">
            Doctors
          </a>
          <a href="#home" className="cursor-pointer hover:text-gray-400">
            Service
          </a>
          <a href="#home" className="cursor-pointer hover:text-gray-400">
            Blog
          </a>
          <a href="#home" className="cursor-pointer hover:text-gray-400">
            Book appointment
          </a>
          <li className="flex gap-4"> 
            <button className="hidden md:block bg-white px-8 py-2 rounded-full text-black">
              Sign up{" "}
            </button>
            <button className="hidden md:block bg-white px-8 py-2 rounded-full text-black">
              Sign up{" "}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
