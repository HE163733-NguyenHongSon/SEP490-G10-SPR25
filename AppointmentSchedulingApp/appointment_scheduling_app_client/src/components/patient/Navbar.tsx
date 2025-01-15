import React, { useEffect } from "react";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { useContext } from "react";
import { NavContext } from "../../context/NavContext";
const Navbar: React.FC = () => {
  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);
  const navContext = useContext(NavContext);
  if (!navContext) {
    throw new Error("NavContext is undefined");
  }
  const {nav, setNav } = navContext;

    useEffect(() => {
          document.body.style.overflow = isShowMobileMenu ? 'hidden' : 'auto';
          return () => {
            document.body.style.overflow = 'auto';
          }
    }, [isShowMobileMenu]);
  return (
    <div className="fixed  top-0 left-0 w-full z-30   bg-black bg-opacity-50 ">
      <div
        className="container mx-auto flex justify-between items-center
       py-4 px-6 md:px-20 lg:px-32 bg-transparent"
      >
        <img className="w-12 h-12" src={assets.logo} alt="" />
        <ul className=" hidden  md:flex gap-16 text-white text-center  ">
          <a  className={`cursor-pointer ${nav==='Home'?'text-cyan-500 underline underline-offset-4':'text-white'} text-xl hover:text-cyan-500 hover:underline underline-offset-6`} 
        onClick={() => setNav('Home')}>          
             Home
          </a>
          <a  className={`cursor-pointer ${nav==='Specialties'?'text-cyan-500 underline underline-offset-4':'text-white'} text-xl hover:text-cyan-500 hover:underline underline-offset-6`} 
            onClick={() => setNav('Specialties')}>
            Specialties
          </a>
          <a  className={`cursor-pointer ${nav==='Doctors'?'text-cyan-500 underline underline-offset-4':'text-white'} text-xl hover:text-cyan-500 hover:underline underline-offset-6`} 
            onClick={() => setNav('Doctors')}>
            Doctors
          </a>
          <a  className={`cursor-pointer ${nav==='Services'?'text-cyan-500 underline underline-offset-4':'text-white'} text-xl hover:text-cyan-500 hover:underline underline-offset-6`} 
          onClick={() => setNav('Services')}>
            Services
          </a>
          <a  className={`cursor-pointer ${nav==='Blogs'?'text-cyan-500 underline underline-offset-4':'text-white'} text-xl hover:text-cyan-500 hover:underline underline-offset-6`} 
            onClick={() => setNav('Blogs')}>
            Blogs
          </a>
          <a  className={`cursor-pointer ${nav==='BookAppointment'?'text-cyan-500 underline underline-offset-4':'text-white'} text-xl hover:text-cyan-500 hover:underline underline-offset-6`} 
            onClick={() => setNav('BookAppointment')}>
            Book appointment
          </a>
          <li className="flex gap-4">
            <button className="hidden md:block bg-white px-8 py-2 rounded-full text-black hover:bg-cyan-500 hover:text-white">
              Sign up{" "}
            </button>
            <button className="hidden md:block bg-white px-8 py-2 rounded-full text-black hover:bg-cyan-500 hover:text-white">
              Sign up{" "}
            </button>
          </li>
        </ul>
            <img
            onClick={() => setIsShowMobileMenu(true)}
            className="md:hidden w-8 h-8"
            src={assets.menu}
            alt="Menu"
          />
      </div>
      {/* mobile menu */}
      <div
        className={`md:hidden ${isShowMobileMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 overflow-hidden bg-white transition-all `}
      >
        <div className="flex justify-end p-6 ">
          <img onClick={() => setIsShowMobileMenu(false)} className="w-8" src={assets.close} alt="Close" />
        </div>
        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
          <a href="#Header" onClick={() => setIsShowMobileMenu(false)} className="px-4 py-2 rounded-full inline-block">
            Home
          </a>
          <a href="#About" onClick={() => setIsShowMobileMenu(false)} className="px-4 py-2 rounded-full inline-block">
            Specialties
          </a>
          <a href="#Projects" onClick={() => setIsShowMobileMenu(false)} className="px-4 py-2 rounded-full inline-block">
            Doctors
          </a>
          <a href="#Blog" onClick={() => setIsShowMobileMenu(false)} className="px-4 py-2 rounded-full inline-block">
            Blog
          </a>
        </ul>
      </div>

    </div>
  );
};

export default Navbar;
