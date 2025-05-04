import SpecialtiesPage from "@/common/pages/SpecialtiesPage";

export default function GuestSpecialtiesPage({
  searchParams,
}: {
  searchParams: { searchValues?: string };
}) {
  return <SpecialtiesPage isGuest={true} basePath="/guest" searchParams={searchParams} />;
} 