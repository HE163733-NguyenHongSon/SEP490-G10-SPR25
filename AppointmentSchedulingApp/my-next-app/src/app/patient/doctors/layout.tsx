"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export default function DoctorsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [specialtyId, setSpecialtyId] = useState<number | null>(null);
  const [degree, setDegree] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (specialtyId !== null || degree !== null) {
      router.push(`./doctors/${specialtyId || ""}/${degree || ""}`);
    }
  }, [specialtyId, degree]);

  return (
    <div className=" grid  grid-cols-6  ">
      <div className="col-span-2 border border-gray-700  bg-white flex items-center flex-col justify-center">
        <button
          className="flex justify-center items-center text-2xl text-white z-30 bg-cyan-600"
          onClick={() => setSpecialtyId(1)}
        >
          Filter specialty
        </button>
        <button
          className="flex justify-center items-center text-2xl text-white z-30 bg-cyan-600"
          onClick={() => setDegree("cardiologist")}
        >
          Filter Degree
        </button>
      </div>
      <div className="col-span-4 border border-gray-700">{children}</div>
    </div>
  );
}
