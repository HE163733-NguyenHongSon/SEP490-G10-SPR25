import React from "react";

const Body = () => {
  return (
    <div
      className="min-h-screen mb-4 w-full bg-cover bg-center flex items-center overflow-hidden relative"
      style={{ backgroundImage: "url('/background.jpeg')" }}
      id="Header"
    >
      <div className="container text-center mx-auto py-6 px-6 md:px-20 lg:px-32 text-white relative z-10">
        <h2 className="text-5xl">Explore home that fit you</h2>
        <div>
          <a href="#"></a>
        </div>
      </div>
      <div className="absolute inset-0 bg-cyan-500 bg-opacity-20"></div>
    </div>
  );
};
export default Body;
