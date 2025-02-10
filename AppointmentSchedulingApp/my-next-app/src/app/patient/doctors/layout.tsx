"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCollapse } from "react-collapsed";
import Image from "next/image";
import { assets } from "../../../../public/images/assets";
import SelectSort from "@/components/common/SelectSort";
export default function DoctorsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [specialtyId, setSpecialtyId] = useState<number | null>(null);
  const [degree, setDegree] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("rating");
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const router = useRouter();

  const sortOptions: ISortOption[] = [
    { label: "Highest Rated", value: "rating_desc" },
    { label: "Most Examinations", value: "exam_desc" },
    { label: "Most Experienced ", value: "experience_desc" },
  ];

  useEffect(() => {
    if (specialtyId !== null || degree !== null) {
      router.push(`./doctors/${specialtyId || ""}/${degree || ""}`);
    }
  }, [specialtyId, degree]);

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center justify-center z-10"
      style={{ backgroundImage: 'url("/images/background_doctors.jpeg")' }}
      id="Body"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>

      <div className="container   mt-28 mb-10 z-30 grid grid-cols-5  bg-white rounded-xl shadow-2xl ">
        <div className="col-span-1 border-r border-gray-300 text-gray-700">
          <div className="border-b border-gray-300 flex flex-row items-center justify-center gap-4  py-5 font-medium mx-5">
            <h1 className="text-xl  font-semibold">Filter and sort</h1>
            <button className="text-cyan-500 underline underline-offset-2  hover:bg-cyan-500 hover:text-white px-2 rounded-full ">
              Clear
            </button>
          </div>

          <div className="flex flex-col gap-2  border-b border-gray-300 mx-5 py-3">
            <div className=" flex flex-row items-center justify-start gap-1   ">
              <Image src={assets.filter} width={20} height={20} alt="Filter" />
              <h2>Filter by: </h2>
              <h2 className="text-cyan-500">(2 options)</h2>
            </div>
            <SelectSort
              options={sortOptions}
              selectedOption={sortBy}
              onSortChange={(value) => setSortBy(value)}
            />
          </div>

          <button {...getToggleProps()}>
            {isExpanded ? "Collapse" : "Expand"}
          </button>
          <section {...getCollapseProps()}>Collapsed content 🙈</section>

          <button
            className="flex justify-center items-center text-2xl text-white z-30 bg-cyan-600"
            onClick={() => setDegree("cardiologist")}
          >
            Filter Degree
          </button>
        </div>

        <div className="col-span-4 ">{children}</div>
      </div>
    </div>
  );
}
