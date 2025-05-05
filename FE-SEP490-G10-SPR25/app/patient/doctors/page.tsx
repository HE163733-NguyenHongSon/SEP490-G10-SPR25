import DoctorsPage from "@/common/pages/DoctorsPage";
import DoctorsLayout from "@/common/layouts/DoctorsLayout";

export default function PatientDoctorsPage({
  searchParams,
}: {
  searchParams: {
    specialties?: string;
    academicTitles?: string;
    degrees?: string;
    sortBy: string;
    searchValues?: string;
    displayView: string;
  };
}) {
  return (
    <DoctorsLayout basePath="/patient">
      <DoctorsPage
        isGuest={false}
        basePath="/patient"
        searchParams={searchParams}
      />
    </DoctorsLayout>
  );
}
