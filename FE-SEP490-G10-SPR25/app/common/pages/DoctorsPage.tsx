import { doctorService } from "@/common/services/doctorService";
import PaginatedItems from "@/common/components/PaginatedItems";
import Search from "@/common/components/Search";
import SelectSort from "@/common/components/SelectSort";
import { DoctorList } from "@/patient/components/DoctorList";

interface DoctorsPageProps {
  isGuest?: boolean;
  basePath: string; // "/guest" or "/patient"
  searchParams?: {
    specialties?: string;
    academicTitles?: string;
    degrees?: string;
    sortBy?: string;
    searchValues?: string;
    displayView?: string;
  };
}

const DoctorsPage = async ({
  isGuest = false,
  basePath,
  searchParams,
}: DoctorsPageProps) => {
  let doctors: IDoctor[] = [];
  const sortOptions: ISortOption[] = [
    { label: "Đánh giá cao nhất", value: "highest_rated" },
    { label: "Nhiều lần khám nhất", value: "most_exam" },
    { label: "Nhiều dịch vụ nhất", value: "most_service" },
    { label: "Học thuật cao nhất", value: "academic_title" },
  ];

  if (
    !searchParams?.searchValues &&
    (searchParams?.specialties ||
      searchParams?.academicTitles ||
      searchParams?.degrees ||
      searchParams?.sortBy)
  ) {
    doctors = await doctorService.getDoctorListByFilterAndSort(
      searchParams.specialties ? searchParams.specialties.split(",") : [],
      searchParams.academicTitles ? searchParams.academicTitles.split(",") : [],
      searchParams.degrees ? searchParams.degrees.split(",") : [],
      searchParams.sortBy || "default_sort"
    );
  } else if (searchParams?.searchValues) {
    doctors = await doctorService.getDoctorListByIdListAndSort(
      searchParams.searchValues,
      searchParams.sortBy || "default_sort"
    );
  } else {
    doctors = await doctorService.getDoctorList();
  }
  const searchOptions: ISearchOption[] = (await doctorService.getDoctorList())
    .map((d: IDoctor) => ({
      label: d.userName,
      value: d.userId,
    }))
    .filter((option) => option.value !== undefined) as ISearchOption[];

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-6 bg-gray-50 pt-20">
      <div className="container mx-auto px-4 max-w-screen-xl">
        {/* Header section */}
        <div className="w-full bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="w-full flex flex-col md:flex-row gap-4 mb-2">
            <div className="flex flex-wrap gap-3">
              <SelectSort
                options={sortOptions}
                path={`${basePath}/doctors`}
                initialSelectedValue="highest_rated"
              />
              <div className="flex-grow">
                <Search
                  suggestedData={searchOptions}
                  placeholder="Tìm kiếm bác sĩ theo tên"
                  path={`${basePath}/doctors`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Danh sách Bác sĩ
          </h1>

          {doctors.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">
                Không tìm thấy bác sĩ nào phù hợp.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <PaginatedItems
                items={doctors}
                itemsPerPage={6}
                displayView="grid"
                RenderComponent={DoctorList}
                userType={isGuest ? "guest" : "patient"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
