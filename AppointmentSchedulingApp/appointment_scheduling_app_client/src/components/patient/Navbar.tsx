"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { assets } from "../../../public/images/assets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar: React.FC = () => {
  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);
  const [user, setUser] = useState<{ name?: string; avatar?: string }>({});
  const currentPath = usePathname();
  const routes = [
    { path: "/patient", name: "Home" },
    { path: "/patient/specialties", name: "Specialties " },
    {
      path: "/patient/doctors?sortBy=highest_rated&displayView=grid",
      name: "Doctors",
    },
    { path: "/patient/services", name: "Services" },
    { path: "/patient/blogs", name: "Blogs" },
    { path: "/patient/appointment-booking", name: "Appointment Booking" },
    { path: "/auth/login", name: "Login" },
    { path: "/auth/register", name: "Register" },
    { path: "/patient/person", name: "Person" },
    { path: "/patient/logout", name: "Logout" },
  ];
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    document.cookie = `user=; expires=${Date.now}; path=/;`;
    setUser({});
    toast.success("Logout successfully!", { position: "top-right" });
  };
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const cookies = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user="));
      if (cookies) {
        setUser(JSON.parse(decodeURIComponent(cookies.split("=")[1])));
      }
    }
  }, []);
  useEffect(() => {
    document.body.style.overflow = isShowMobileMenu ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isShowMobileMenu]);

  return (
    <div className=" fixed top-0 left-0 w-full z-30 bg-black bg-opacity-50 backdrop-blur-md">
      <div className="container mx-auto flex  items-center justify-center py-3  px-6 md:px-15 lg:px-20 bg-transparent  ">
        <ul className=" md:flex flex items-center gap-8    text-white text-center  ">
          <li>
            <Image width={40} height={40} src={assets.logo} alt="Logo" />
          </li>
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                href={route.path}
                className={` text-lg hover:text-cyan-500 hover:underline underline-offset-4 ${
                  currentPath === route.path
                    ? "text-cyan-500 underline underline-offset-4"
                    : "text-white"
                }`}
              >
                {route.name}
              </Link>
              {user.name &&
                (route.path === "person" ? (
                  <Link href={route.path}>
                    <Image
                      src=""
                      className="w-10 h-10 cursor-pointer rounded-full"
                      onClick={() => setIsShowMobileMenu(true)}
                      alt="Avatar"
                    />{" "}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={handleLogout}
                      className="hidden md:block bg-white px-6 py-2 rounded-full text-black hover:bg-cyan-500 hover:text-white"
                    >
                      Logout
                    </button>
                    <ToastContainer />
                  </>
                ))}
            </li>
          ))}
        </ul>

        <Image
          onClick={() => setIsShowMobileMenu(true)}
          width={8}
          height={8}
          className="md:hidden  cursor-pointer"
          src={assets.menu}
          alt="Menu"
        />
      </div>

      {/* Mobile menu */}
      {isShowMobileMenu && (
        <div className="fixed inset-0 bg-white flex flex-col items-center pt-16">
          <button
            className="absolute top-5 right-5"
            onClick={() => setIsShowMobileMenu(false)}
          >
            <Image src={assets.close} width={8} height={8} alt="Close" />
          </button>

          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className="text-lg py-2 text-black hover:text-cyan-500"
              onClick={() => setIsShowMobileMenu(false)}
            >
              { route.name==='Person'?<Image src="" width={20} height={20} className="rounded-full" alt="Profile"/>:route.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
