"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import RatingStars from "@/components/RatingStars";

import { ServiceDTO } from "@/types/service";


interface ListServiceProps {
  items: ServiceDTO[];
  displayView?: string;
}

export const ListService = ({ items, displayView }: ListServiceProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((service) => (
        <Link
          key={service.serviceId}
          href={`/patient/service-detail/${service.serviceId}`}
          className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition block"
        >
          <div className="relative h-32 w-full mb-2">
            <Image
              src={
                service.image?.startsWith("/") || service.image?.startsWith("http")
                  ? service.image
                  : `/${service.image || "images/service.png"}`
              }
              alt={service.serviceName}
              fill
              className="object-cover rounded-md"
            />
          </div>

          <h3 className="text-lg font-semibold mb-1">{service.serviceName}</h3>

          <p className="text-sm text-gray-600 mb-1 line-clamp-3">
            {service.overview || "Không có mô tả"}
          </p>

          {service.estimatedTime && (
            <p className="text-sm text-gray-600 mb-1">
              ⏱ {service.estimatedTime}
            </p>
          )}

          <p className="text-blue-500 font-semibold">
            {service.price.toLocaleString()} VNĐ
          </p>

          <div className="flex items-center text-yellow-400 mt-2">
            <RatingStars rating={service.rating || 0} />
            <span className="text-xs text-gray-500 ml-1">
              ({service.ratingCount || 0} đánh giá)
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

