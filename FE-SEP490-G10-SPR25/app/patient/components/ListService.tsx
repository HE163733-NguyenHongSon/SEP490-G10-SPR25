"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import RatingStars from "@/components/RatingStars";

interface ListServiceProps {
  items: IService[];
  displayView?: string;
}

const ListService = ({ items, displayView }: ListServiceProps) => {
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 2, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1, slidesToSlide: 1 },
  };

  const ServiceCard = ({ service }: { service: IService }) => (
    <Link
      href={`/patient/service-detail/${service.serviceId}`}
      className="border border-gray-300 rounded-md shadow-md p-5 flex flex-col h-full"
    >
      <div className="relative h-32 w-full mb-2">
        <Image
          src={`${imgUrl}/${service.image}`}
          alt={service.serviceName}
          fill
          className="object-cover rounded-md"
        />
      </div>

      <h3 className="text-lg font-semibold mb-1">{service.serviceName}</h3>

      <p className="text-sm text-gray-600 mb-1 line-clamp-3">
        {service.overview || "Không có mô tả"}
      </p>

      <div className="flex items-center text-yellow-400 mt-2">
        <RatingStars rating={service.rating || 0} />
        <span className="text-xs text-gray-500 ml-1">
          ({service.ratingCount || 0} đánh giá)
        </span>
      </div>

      <div className="flex flex-row items-center mt-2 gap-3">
        <p className="text-gray-500 font-semibold">
          {service.price.toLocaleString()} VNĐ
        </p>
        {service.estimatedTime && (
          <p className="text-sm text-gray-600 mb-1">
            ⏱ {service.estimatedTime}
          </p>
        )}
      </div>
    </Link>
  );

  if (displayView === "slider") {
    return (
      <Carousel
        responsive={responsive}
        infinite
        autoPlaySpeed={3000}
        keyBoardControl
        containerClass="carousel-container pb-4"
        itemClass="px-2 h-full"
      >
        {items.map((service) => (
          <div key={service.serviceId} className="h-full">
            <ServiceCard service={service} />
          </div>
        ))}
      </Carousel>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((service) => (
        <ServiceCard key={service.serviceId} service={service} />
      ))}
    </div>
  );
};

export default ListService;
