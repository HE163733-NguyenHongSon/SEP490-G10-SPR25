"use client";
import Image from "next/image";
import Link from "next/link";

interface SpecialtyListProps {
  items: ISpecialty[];
  displayView?: string; 
}

export const SpecialtyList = ({items,displayView}:SpecialtyListProps) => {
 
  return (
        <div className="w-[1500px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6   p-10 ">
          {items.map((specialty, index) => (
            <Link
              key={index}
              href={`specialties/${specialty.specialtyId}`} 
              className="p-6 flex flex-col items-center  cursor-pointer text-center border border-gray-300 rounded-md shadow-md"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-blue-500 p-4">
                <Image
                  src={specialty.image}
                  alt={specialty.specialtyName}
                  className="object-contain"
                  width={60} height={60}
                />
              </div>
              <h3 className="text-lg font-semibold mt-4 text-gray-700">{specialty.specialtyName}</h3>
            </Link>
          ))}
        </div>    
      


  );
};
