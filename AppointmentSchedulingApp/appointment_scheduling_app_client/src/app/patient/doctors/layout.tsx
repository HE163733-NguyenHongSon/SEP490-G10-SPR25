
import SelectSort from "@/components/common/SelectSort";
import { specialtyService } from "@/services/specialtyService";
import CollapsibleSection from "@/components/common/CollapsibleSection";
import CheckboxList from "@/components/common/CheckboxList";
import Link from "next/link";
import SelectFilter from "@/components/common/SelectFilter";

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
    { label: "Highest Rated", value: "highest_rated" },
    { label: "Most Examinations", value: "most_exam" },
    { label: "Most Experienced ", value: "most_exp" },
    { label: "Take On Most Service", value: "most_service" },
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
            <Link
              href="/patient/doctors"
              className="text-cyan-500 underline underline-offset-2  hover:bg-cyan-500 hover:text-white px-2 rounded-full "
            >
              Clear
            </Link>
          </div>

          <div className="flex flex-col gap-2  border-b border-gray-300 mx-5 py-5">
            <SelectFilter
              searchParamList={["specialties", "academicTitles", "degrees"]}
            />
            <SelectSort
              options={sortOptions}
              initialSelectedValue="highest_rated"
              path="/patient/doctors"
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

        <div className="col-span-4  ">{children}</div>
      </div>
    </div>
  );
}
