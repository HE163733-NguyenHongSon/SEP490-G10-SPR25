import { SpecialtyList } from "@/guest/components/SpecialtyList";
import { specialtyService } from "@/common/services/specialtyService";
import PaginatedItems from "@/common/components/PaginatedItems";
import Search from "@/common/components/Search";

interface SpecialtiesPageProps {
  isGuest?: boolean;
  basePath: string; // "/guest" or "/patient"
  searchParams?: { searchValues?: string };
}

const SpecialtiesPage = async ({
  isGuest = false,
  basePath,
  searchParams,
}: SpecialtiesPageProps) => {
  const specialties = await specialtyService.getSpecialtyList();
  const searchOptions: ISearchOption[] = specialties.map((s) => ({
    label: s.specialtyName,
    value: s.specialtyId.toString(),
  }));

  const selectedIds = searchParams?.searchValues?.split(",") || [];
  const filteredSpecialties = selectedIds.length
    ? specialties.filter((s) => selectedIds.includes(s.specialtyId.toString()))
    : specialties;

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center justify-center z-10"
      style={{ backgroundImage: 'url("/images/background_specialties.jpeg")' }}
      id="Body"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>
      <div className="relative h-[750px] w-full z-30 flex items-center flex-col container mx-auto max-w-screen-xl bg-white rounded-xl shadow-2xl p-6 sm:p-10 text-gray-700">
        <Search
          suggestedData={searchOptions}
          placeholder="Chọn hoặc tìm kiếm nhiều chuyên khoa theo tên"
          path={`${basePath}/specialties`}
        />
        {filteredSpecialties.length === 0 ? (
          <p className="text-white text-center py-10">
            Không tìm thấy chuyên khoa nào phù hợp.
          </p>
        ) : (
          <PaginatedItems
            items={filteredSpecialties}
            itemsPerPage={8}
            RenderComponent={SpecialtyList}
            displayView="grid"
          />
        )}
      </div>
      {isGuest && (
        <div className="relative z-30 text-center mt-8">
          <a
            href="/common/auth/login"
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg text-white text-lg font-medium"
          >
            Đăng nhập để đặt lịch khám
          </a>
        </div>
      )}
    </div>
  );
};

export default SpecialtiesPage;
