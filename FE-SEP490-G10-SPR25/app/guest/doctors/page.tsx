import DoctorsPage from "@/common/pages/DoctorsPage";

export default function GuestDoctorsPage({
  searchParams,
}: {
  searchParams: {
    specialties?: string;
    academicTitles?: string;
    degrees?: string;
    sortBy?: string;
    searchValues?: string;
    displayView?: string;
  };
}) {
  return <DoctorsPage isGuest={true} basePath="/guest" searchParams={searchParams} />;
} 