import Image from "next/image";
import { assets } from "../../../../public/images/assets";
import SelectSort from "@/components/common/SelectSort";
import { specialtyService } from "@/services/specialtyService";
import CollapsibleSection from "@/components/common/CollapsibleSection";
import CheckboxList from "@/components/common/CheckboxList";
export default async function DoctorsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const academicTitles: ICheckboxOption[] = ["GS.TS", "PGS", "PGS.TS"].map(
    (title) => {
      return {
        label: title,
        value: title,
        isChecked: false,
      };
    }
  );
  const degrees: ICheckboxOption[] = ["BS.CKI", "BS.CKII"].map((degree) => ({
    label: degree,
    value: degree,
    isChecked: false,
  }));

  const specialties: ICheckboxOption[] = (
    await specialtyService.getSpecialtyList()
  ).map((sp) => {
    return {
      label: sp.specialtyName,
      value: sp.specialtyName,
      isChecked: false,
    };
  });

  const sortOptions: ISortOption[] = [
    { label: "Highest Rated", value: "rating_desc" },
    { label: "Most Examinations", value: "exam_desc" },
    { label: "Most Experienced ", value: "experience_desc" },
  ];

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center z-10"
      style={{ backgroundImage: 'url("/images/background_doctors.jpeg")' }}
      id="Body"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>

      <div className=" container   mt-28 mb-10 z-30 grid grid-cols-5  bg-white rounded-xl shadow-2xl ">
        <div className="col-span-1 border-r border-gray-300 text-gray-700 pb-20">
          <div className="border-b border-gray-300 flex flex-row items-center justify-center gap-4  py-5 font-medium mx-5">
            <h1 className="text-xl  font-semibold">Filter and sort</h1>
            <button className="text-cyan-500 underline underline-offset-2  hover:bg-cyan-500 hover:text-white px-2 rounded-full ">
              Clear
            </button>
          </div>

          <div className="flex flex-col gap-2  border-b border-gray-300 mx-5 py-5">
            <div className=" flex flex-row items-center justify-start gap-1   ">
              <Image src={assets.filter} width={20} height={20} alt="Filter" />
              <h2>Filter by: </h2>
              <h2 className="text-cyan-500">(2 options)</h2>
            </div>
            <SelectSort
              options={sortOptions}
              initialSelectedValue="rating_desc"
              url="/patient/doctors"
            />
          </div>
          <CollapsibleSection
            title={"Specialties"}
            content={
              <CheckboxList items={specialties} searchParam="specialties" />
            }
            defaultExpanded={true}
          />

          <CollapsibleSection
            title={"Academic Titles"}
            content={
              <CheckboxList
                items={academicTitles}
                searchParam="academicTitles"
              />
            }
            defaultExpanded={false}
          />

          <CollapsibleSection
            title={"Degrees"}
            content={<CheckboxList items={degrees} searchParam="degrees" />}
            defaultExpanded={false}
          />
        </div>

        <div className="col-span-4 ">{children}</div>
      </div>
    </div>
  );
}
