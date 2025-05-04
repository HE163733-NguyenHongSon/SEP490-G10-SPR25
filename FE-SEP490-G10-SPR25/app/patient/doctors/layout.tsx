import React, { ReactNode } from "react";
import DoctorsLayout from "@/common/layouts/DoctorsLayout";

interface DoctorsPageProps {
  children: ReactNode;
}

const PatientDoctorsLayout = ({ children }: DoctorsPageProps) => {
  return <DoctorsLayout children={children} basePath="/patient" />;
};

export default PatientDoctorsLayout;
