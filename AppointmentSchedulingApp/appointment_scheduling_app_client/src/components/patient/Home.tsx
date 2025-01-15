import React from "react";
import { About } from "./About";

export const Home = () => {
  return (
    <>
    <div className="absolute top-52  max-w-fit  container text-center  p-6 md:px-20 lg:px-48 lg:mx-48 text-white   z-10 ">
      <h2 className="text-4xl sm:text-5xl md:text-[72px] inline-grid max-w-3xl font-semibold pt-20">
        Schedule an appointment and view your results online
      </h2>
      <h2 className=" text-2xl text-cyan-500 sm:text-xl md:text-2xl  md:inline-grid  max-w-4xl ">
        Now you can make an appointment before coming for a check-up and view
        your test results online quickly anytime, anywhere.
      </h2>
      <div className="space-x-6 mt-16 ">
        <a
          className="border  border-white px-8 py-3 rounded hover:underline underline-offset-4"
          href="#"
        >
          Booking appoiment
        </a>
        <a
          className=" bg-cyan-600   px-8 py-3 rounded  hover:underline underline-offset-4"
          href="#"
        >
          Contact us
        </a>
      </div>
      <About  />
    </div>
      </>
  );
};
