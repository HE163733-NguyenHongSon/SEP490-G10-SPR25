"use client";
import React from "react";
import { assets } from "@/public/images/assets";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const PersonLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const currentPath = usePathname();

  const routes = [
    { path: "/patient/person", name: "Hồ sơ", Image: assets.profile },
    {
      path: "/patient/person/reservations",
      name: "Lịch hẹn",
      Image: assets.reservation,
    },
    {
      path: "/patient/person/medical-report",
      name: "Báo cáo y tế",
      Image: assets.medical_report,
    },
    {
      path: "/patient/person/invoices",
      name: "Hóa đơn",
      Image: assets.medical_report,
    },
  ];

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center z-10"
      style={{
        backgroundImage: 'url("/images/background_register_treatment.jpeg")',
      }}
    >
      <div className=" absolute inset-0 bg-black bg-opacity-50 z-20"></div>
      <div className="container  mt-28 mb-10 z-30 grid grid-cols-5 text-gray-700 bg-white rounded-xl shadow-2xl ">
        <div className="col-span-1 border-r border-gray-300">
          <div className="flex flex-row items-center justify-center gap-2 p-4">
            <h2 className="text-xl text-center"></h2>
          </div>

          {/* <div className="flex flex-row items-center justify-start gap-2 mx-7 border-b border-gray-300 pb-5">
            <Image
              className="w-7 h-7"
              width={20}
              height={20}
              src={assets.ranking}
              alt=""
            />
            Ranking:
            <span className="text-cyan-500 text-">Gold</span>
          </div> */}
          <nav>
            <ul className="space-y-2">
              {routes.map((route, index) => (
                <li key={index}>
                  <Link
                    href={route.path}
                    className={`px-12 m-4  text-#635F5F  rounded-full hover:bg-cyan-500 hover:text-white 
                    flex   items-center justify-start min-w-fit h-12 gap-4 border border-gray-300 
                     ${
                       currentPath === route.path
                         ? "bg-cyan-500 text-white underline underline-offset-2"
                         : "bg-white"
                     } shadow-md`}
                  >
                    <Image width={20} height={20} src={route.Image} alt="" />
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="col-span-4 ">{children}</div>
      </div>
    </div>
  );
};

export default PersonLayout;
