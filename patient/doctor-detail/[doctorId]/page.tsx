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
  console.log(doctorDetail);
  return (
    <>
      <CollapsibleSection
        title="Mô tả"
        content={doctorDetail.detailDescription}
        defaultExpanded={true}
        titleImage={assets.description}
      />
      <CollapsibleSection
        title="Tổ chức thành viên"
        content={doctorDetail.organization}
        defaultExpanded={true}
        titleImage={assets.organization}
      />
      <CollapsibleSection
        title="Giải thưởng"
        content={doctorDetail.prize}
        defaultExpanded={true}
        titleImage={assets.prize}
      />
      <CollapsibleSection
        title="Công trình nghiên cứu"
        content={doctorDetail.researchProject}
        defaultExpanded={true}
        titleImage={assets.research_work}
      />
    </>
  );
}
