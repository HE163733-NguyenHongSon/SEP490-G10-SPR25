import SpecialtiesPage from "@/common/pages/SpecialtiesPage";

export default function PatientSpecialtiesPage({
  searchParams,
}: {
  searchParams: { searchValues?: string };
}) {
  return <SpecialtiesPage isGuest={false} basePath="/patient" searchParams={searchParams} />;
}
