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

  return (
    <div
      className=" min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center z-10 "
      style={{ backgroundImage: 'url("/images/background_home.jpeg")' }}
    >
      <div className=" absolute inset-0 bg-black bg-opacity-50 z-20"></div>
      {children}
    </div>
  );
};

export default PersonLayout;
