import React, { ReactNode } from "react";
import DoctorsLayout from "@/common/layouts/DoctorsLayout";

interface DoctorsPageProps {
  children: ReactNode;
}

const GuestDoctorsLayout = ({ children }: DoctorsPageProps) => {
  return <DoctorsLayout children={children} basePath="/guest" />;
};

export default GuestDoctorsLayout;
