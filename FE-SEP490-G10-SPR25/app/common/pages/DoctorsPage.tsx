import { doctorService } from "@/common/services/doctorService";
import PaginatedItems from "@/common/components/PaginatedItems";
import Search from "@/common/components/Search";
import OptionFilter from "@/common/components/OptionFilter";
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
  const doctors = await doctorService.getDoctorList();
  
  const searchOptions = doctors.map((doctor) => ({
    label: doctor.userName,
    value: doctor.userId?.toString() || '',
  }));

  // Handle filtering by search values
  const searchValues = searchParams?.searchValues?.split(",") || [];
  let filteredDoctors = searchValues.length
    ? doctors.filter((doctor) => searchValues.includes(doctor.userId?.toString() || ''))
    : doctors;

  // Handle filtering by specialties
  const selectedSpecialties = searchParams?.specialties?.split(",") || [];
  if (selectedSpecialties.length) {
    filteredDoctors = filteredDoctors.filter((doctor) =>
      doctor.specialtyNames?.some(specialty => 
        selectedSpecialties.includes(specialty)
      )
    );
  }

  // Handle filtering by academic titles
  const selectedTitles = searchParams?.academicTitles?.split(",") || [];
  if (selectedTitles.length) {
    filteredDoctors = filteredDoctors.filter((doctor) =>
      selectedTitles.includes(doctor.academicTitle || '')
    );
  }

  // Handle filtering by degrees
  const selectedDegrees = searchParams?.degrees?.split(",") || [];
  if (selectedDegrees.length) {
    filteredDoctors = filteredDoctors.filter((doctor) =>
      selectedDegrees.includes(doctor.degree || '')
    );
  }

  // Handle sorting
  const sortBy = searchParams?.sortBy || "";
  if (sortBy === "name_asc") {
    filteredDoctors.sort((a, b) => a.userName.localeCompare(b.userName));
  } else if (sortBy === "name_desc") {
    filteredDoctors.sort((a, b) => b.userName.localeCompare(a.userName));
  } else if (sortBy === "rating_asc") {
    filteredDoctors.sort((a, b) => (a.rating || 0) - (b.rating || 0));
  } else if (sortBy === "rating_desc") {
    filteredDoctors.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  // Display view
  const displayView = searchParams?.displayView || "grid";

  // Sort options
  const sortOptions = [
    { label: "Tên A-Z", value: "name_asc" },
    { label: "Tên Z-A", value: "name_desc" },
    { label: "Đánh giá thấp đến cao", value: "rating_asc" },
    { label: "Đánh giá cao đến thấp", value: "rating_desc" },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-6 bg-gray-50 pt-20">
      <div className="container mx-auto px-4 max-w-screen-xl">
        {/* Header section */}
        <div className="w-full bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="w-full flex flex-col md:flex-row gap-4 mb-2">
            <div className="flex-grow">
              <Search
                suggestedData={searchOptions}
                placeholder="Tìm kiếm bác sĩ theo tên"
                path={`${basePath}/doctors`}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <OptionFilter searchParamList={["specialties", "academicTitles", "degrees"]} />
              <SelectSort 
                options={sortOptions} 
                path={`${basePath}/doctors`} 
                initialSelectedValue="name_asc"
              />
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Danh sách Bác sĩ</h1>
          
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">Không tìm thấy bác sĩ nào phù hợp.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <PaginatedItems
                items={filteredDoctors}
                itemsPerPage={8}
                RenderComponent={DoctorList}
                displayView={displayView}
                userType={isGuest ? 'guest' : 'patient'}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;