import DoctorsPage from "@/common/pages/DoctorsPage";

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
  return <DoctorsPage isGuest={false} basePath="/patient" searchParams={searchParams} />;
}
