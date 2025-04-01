import { specialtyService } from "@/services/specialtyService";
import CollapsibleSection from "@/components/CollapsibleSection";
import CheckboxList from "@/components/CheckboxList";
import OptionFilter from "@/components/OptionFilter";
import ClearButton from "@/components/ClearButton";
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

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center z-10"
      style={{ backgroundImage: 'url("/images/background_doctors.jpeg")' }}
      
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>

      <div className=" container   mt-20 mb-5 z-30 grid grid-cols-5  bg-white rounded-xl shadow-2xl ">
        <div className="col-span-1 border-r border-gray-300 text-gray-700  ">
          <div className="flex flex-row items-center justify-center border-b border-gray-300 gap-4  py-11 font-medium mx-5">
            <h1 className="text-xl  font-semibold">Lọc bác sĩ</h1>
            <ClearButton
              path="/patient/doctors"
              keptSearchParams={["sortBy", "displayView"]}
              labelName="Bỏ lọc"
            />
          </div>

          <div className="flex flex-col  border-b border-gray-300 gap-4  py-5 mx-5">
            <OptionFilter
              searchParamList={["specialties", "academicTitles", "degrees"]}
            />
          </div>

          <div className="flex flex-col  mx-5   h-[700px] overflow-y-auto">
            <CollapsibleSection
              title={"Chuyên khoa"}
              content={
                <CheckboxList items={specialties} searchParam="specialties" />
              }
              defaultExpanded={true}
            />

            <CollapsibleSection
              title={"Chức danh học thuật"}
              content={
                <CheckboxList
                  items={academicTitles}
                  searchParam="academicTitles"
                />
              }
              defaultExpanded={true}
            />

            <CollapsibleSection
              title={" Học vị"}
              content={<CheckboxList items={degrees} searchParam="degrees" />}
              defaultExpanded={true}
            />
          </div>
        </div>

        <div className="w-full p-4 col-span-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
