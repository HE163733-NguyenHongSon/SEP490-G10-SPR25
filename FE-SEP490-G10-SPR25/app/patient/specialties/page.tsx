import { SpecialtyList } from "@/patient/components/SpecialtyList";
import { specialtyService } from "@/services/specialtyService";
import { FaChevronRight, FaSearch } from "react-icons/fa";
import PaginatedItems from "@/components/PaginatedItems";

const SpecialtiesPage = async () => {
  const specialties = await specialtyService.getSpecialtyList();
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center justify-center z-10"
      style={{ backgroundImage: 'url("/images/background_specialties.jpeg")' }}
      id="Body"
    >
      <div className="absolute  inset-0 bg-black bg-opacity-50 z-20"></div>
      <div className="relative z-30 container w-full bg-white rounded-xl shadow-2xl p-6 md:px-5 lg:px-10 lg:mx-48 text-gray-700">
        {/* Thanh tìm kiếm */}
        <div className="flex justify-center mb-3 mt-20 relative z-30">
          <div className="relative flex items-center w-[400px] bg-white rounded-full shadow-md border border-gray-300 overflow-hidden">
            <button className="flex items-center bg-blue-500 text-white px-3 py-2">
              Name <FaChevronRight className="ml-2" />
            </button>
            <input
              type="text"
              placeholder="Enter the service's name to search"
              className="w-full px-3 py-2 outline-none"
            />
            <button className="absolute right-3 text-gray-500">
              <FaSearch />
            </button>
          </div>

        </div>
        {specialties.length === 0 ? (
          <p className="text-white text-center">
            Không tìm thấy chuyên khoa nào.
          </p>
        ) : (
          <PaginatedItems
            items={specialties}
            itemsPerPage={8}
            RenderComponent={SpecialtyList}
            displayView="grid"
          />
        )}
      </div>
    </div>
  );
};

export default SpecialtiesPage;
