"use client";
import React from "react";

const BookingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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

export default BookingLayout;
