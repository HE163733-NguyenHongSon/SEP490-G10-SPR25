import { doctorService } from "@/services/doctorService";
import CollapsibleSection from "@/components/CollapsibleSection";
import { assets } from "@/public/images/assets";
export default async function DoctorDetails({
  params,
}: {
  params: { doctorId: string };
}) {
  const doctorDetail: IDoctorDetail = await doctorService.getDoctorDetailById(
    params.doctorId
  );
  console.log(doctorDetail.detailDescription);
  return (
    <>
      <CollapsibleSection
        title="Description"
        content={doctorDetail.detailDescription}
        defaultExpanded={true}
        titleImage={assets.description}
      />
      <CollapsibleSection
        title="Member organization "
        content={doctorDetail.organization}
        defaultExpanded={true}
        titleImage={assets.organization}
      />
      <CollapsibleSection
        title="Prize"
        content={doctorDetail.prize}
        defaultExpanded={true}
        titleImage={assets.prize}
      />
      <CollapsibleSection
        title="Research work"
        content={doctorDetail.researchProject}
        defaultExpanded={true}
        titleImage={assets.research_work}
      />
    </>
  );
}
