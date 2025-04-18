"use client";
import React from "react";

const VideoPlayer = () => {
  return (
    <div className="w-full max-w-7xl my-16 rounded-xl overflow-hidden shadow-lg ">
      <div className="relative w-full h-[600px]">
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/AiN_TETASE0"
          title="Giới thiệu Bệnh viện"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      <div className="bg-white p-4 transition-all duration-300 hover:bg-cyan-50">
        <h3 className="text-xl font-semibold text-gray-800 hover:text-cyan-700">
          Bệnh viện Đa khoa Quốc tế
        </h3>
        <p className="text-gray-600 mt-2 hover:text-gray-700">
          Hệ thống y tế chất lượng cao với đội ngũ chuyên gia hàng đầu
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;
