import React from "react";
import { assets } from "@/public/images/assets";
import Image from "next/image";
import { doctorService } from "@/common/services/doctorService";
import { serviceService } from "@/common/services/serviceService";
import { specialtyService } from "@/common/services/specialtyService";
import { patientService } from "@/common/services/patientService";

export const About = () => {
  const numberOfDoctors = doctorService.getNumberOfDoctors();
  const numberOfServices = serviceService.getNumberOfServices();
  const numberOfSpecialties = specialtyService.getNumberOfSpecialties();
  const numberOfExaminedPatients = patientService.getNumberOfExaminedPatients();

  return (
    <div
      className="my-16 flex flex-col items-center justify-center container p-14 md:px-20 lg:px-32 w-full bg-white rounded-3xl mx-auto"
      id="About"
    >
      <h1 className="text-cyan-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center">
        Tổng quan về
        <span className="ml-3 underline underline-offset-4 decoration-1 font-light">
          chúng tôi
        </span>
      </h1>
      <p className="text-cyan-500 text-base sm:text-base md:max-w-6xl lg:max-w-full text-center mb-8">
        Chúng tôi là đơn vị y tế hàng đầu với đội ngũ bác sĩ chuyên môn cao và
        cơ sở vật chất hiện đại. Tại đây, bạn sẽ được trải nghiệm dịch vụ khám
        chữa bệnh chất lượng với sự tận tâm, chuyên nghiệp và hiệu quả.
      </p>
      <div className="flex flex-col md:flex-row items-center md:items-start md:gap-10">
        <Image
          src={assets.banners[0]}
          alt="Hình ảnh tổng quan"
          width={500}
          height={250}
          className="sm:w-1/3 md:w-1/2 lg:max-w-md rounded-lg py-3"
        />
        <div className="flex flex-col items-center md:items-start mx-3 text-cyan-500">
          <div className="grid grid-cols-2 gap-6 md:gap-10 w-full 2xl:pr-28">
            <div className="text-center md:text-left">
              <p className="text-4xl font-medium text-cyan-500">
                {numberOfDoctors}
              </p>
              <p>Bác sĩ có trình độ</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-4xl font-medium text-cyan-500">
                {numberOfSpecialties}
              </p>
              <p>Chuyên khoa</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-4xl font-medium text-cyan-500">
                {numberOfServices}
              </p>
              <p>Dịch vụ y tế</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-4xl font-medium text-cyan-500">
                {numberOfExaminedPatients}
              </p>
              <p>Bệnh nhân đã khám</p>
            </div>
          </div>
          <p className="m-4 max-w-lg text-center md:text-left">
            Với sứ mệnh mang đến giải pháp chăm sóc sức khỏe toàn diện, chúng
            tôi không ngừng nâng cao chất lượng dịch vụ và mở rộng hệ thống
            chuyên môn nhằm đáp ứng mọi nhu cầu của bệnh nhân.
          </p>
          {/* <button className="ml-3 bg-cyan-500 text-white px-8 py-2 rounded hover:bg-cyan-600">
            Tìm hiểu thêm
          </button> */}
        </div>
      </div>
    </div>
  );
};
