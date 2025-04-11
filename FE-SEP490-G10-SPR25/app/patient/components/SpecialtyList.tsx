"use client";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface SpecialtyListProps {
  items: ISpecialty[];
  displayView?: string;
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1536 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1536, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

export const SpecialtyList = ({ items, displayView }: SpecialtyListProps) => {
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;

  if (displayView === "slider") {
    return (
      <div className="w-full px-10 py-6">
        <Carousel
          responsive={responsive}
          infinite
          autoPlaySpeed={3000}
          containerClass="carousel-container"
          itemClass="px-4"
        >
          {items.map((specialty, index) => (
            <Link
              key={index}
              href={`specialties/${specialty.specialtyId}`}
              className="p-6 flex flex-col items-center cursor-pointer text-center border border-gray-300 rounded-md shadow-md bg-white"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-cyan-500 p-4">
                <Image
                  src={`${imgUrl}/${specialty.image}`}
                  alt={specialty.specialtyName}
                  className="object-contain"
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="text-lg font-semibold mt-4 text-gray-700">
                {specialty.specialtyName}
              </h3>
            </Link>
          ))}
        </Carousel>
      </div>
    );
  }

  // Default grid view
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-10 ">
      {items.map((specialty, index) => (
        <Link
          key={index}
          href={`specialties/${specialty.specialtyId}`}
          className="w-[250px] p-6 flex flex-col items-center cursor-pointer text-center border border-gray-300 rounded-md shadow-md bg-white"
        >
          <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-blue-500 p-4">
            <Image
              src={`${imgUrl}/${specialty.image}`}
              alt={specialty.specialtyName}
              className="object-contain"
              width={60}
              height={60}
            />
          </div>
          <h3 className="text-lg font-semibold mt-4 text-gray-700">
            {specialty.specialtyName}
          </h3>
        </Link>
      ))}
    </div>
  );
};
