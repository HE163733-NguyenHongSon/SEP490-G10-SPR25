"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch } from "react-redux";
import RatingStars from "@/common/components/RatingStars";
import { useRouter, useParams } from "next/navigation";
import { useUser } from "@/common/contexts/UserContext";
import { toast } from "react-toastify";

import {
  setSpecialtyId,
  setDoctorId,
  setServiceId,
} from "@/patient/appointment-booking/redux/bookingSlice";
interface ListServiceProps {
  items: IService[];
  displayView?: string;
  isBooking?: boolean;
}

const ListService = ({ items, displayView, isBooking }: ListServiceProps) => {
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
  const { user } = useUser();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 2, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1, slidesToSlide: 1 },
  };
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const doctorId = params.doctorId as string;

  const handleBooking = (
    e: React.MouseEvent<HTMLButtonElement>,
    service: IService
  ) => {
    if (user) {
      const button = e.currentTarget;
      dispatch(setServiceId(button.value));
      dispatch(setDoctorId(doctorId || ""));
      dispatch(setSpecialtyId(String(service.specialtyId)));

      router.push(`/patient/appointment-booking`);
    } else {
      toast.info("Vui lòng đăng nhập hoặc đăng ký để đặt khám.", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        router.push("/common/auth/login");
      }, 3000);
    }
  };

  const ServiceCard = ({ service }: { service: IService }) => (
    <div className="border border-gray-300 rounded-lg shadow-sm p-4 flex flex-col h-full min-h-[300px]">
      <div className="relative h-40 w-full mb-3 overflow-hidden group rounded-md">
        <Image
          src={`${imgUrl}/${service.image}`}
          alt={service.serviceName}
          fill
          className="object-cover transform transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
        {service.serviceName}
      </h3>

      <p className="text-sm text-gray-600 mb-2 line-clamp-3">
        {service.overview || "Không có mô tả"}
      </p>

      <div className="flex items-center text-yellow-400 mt-auto">
        <RatingStars rating={service.rating || 0} />
        <span className="text-xs text-gray-500 ml-1">
          ({service.ratingCount || 0} đánh giá)
        </span>
      </div>

      <div className="flex items-center justify-between mt-3 text-sm text-gray-700">
        <p className="font-semibold">{service.price.toLocaleString()} VNĐ</p>
        {service.estimatedTime && <p>⏱ {service.estimatedTime}</p>}
      </div>

      <div className="mt-4">
        <div className="flex gap-2">
          {isBooking && (
            <button
              value={service.serviceId}
              type="button"
              onClick={(e) => handleBooking(e, service)}
              className="flex-1 text-center bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-md transition"
            >
              Đặt dịch vụ
            </button>
          )}
          <Link
            href={`/patient/services/service-detail/${service.serviceId}`}
            className={`flex-1 text-center bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-md transition`}
          >
            Chi tiết
          </Link>
        </div>
      </div>
    </div>
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
