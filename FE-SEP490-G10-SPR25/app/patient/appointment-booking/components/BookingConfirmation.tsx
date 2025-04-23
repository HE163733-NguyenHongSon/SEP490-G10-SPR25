import { useDispatch, useSelector } from "react-redux";
import {
  setSymptoms,
  selectBooking,
  selectSpecialties,
  selectServices,
  selectDoctors,
} from "../bookingSlice";

const BookingConfirmation = () => {
  const dispatch = useDispatch();
  
  // Select all needed data from Redux store
  const {
    selectedPatient,
    symptoms,
    specialtyId,
    serviceId,
    doctorId,
    // selectedDate,
    // selectedTime,
    suggestionData,
  } = useSelector(selectBooking);

  const specialties = useSelector(selectSpecialties);
  const services = useSelector(selectServices);
  const doctors = useSelector(selectDoctors);

  // Helper functions to get display values
  const getSpecialtyName = () => {
    const specialty = specialties.find(
      (s) => s.specialtyId === specialtyId?.toString()
    );
    return specialty ? specialty.specialtyName : "";
  };

  const getService = () => {
    const service = services.find((s) => s.serviceId === serviceId);
    return service || suggestionData?.service;
  };

  const getDoctorName = () => {
    const doctor = doctors.find((d) => d.value === doctorId);
    return doctor ? doctor.label : "";
  };

  // const getFormattedDateTime = () => {
  //   if (selectedDate && selectedTime) {
  //     return `${formatAppointmentDate(selectedDate)} - ${selectedTime}`;
  //   }
  //   return "";
  // };

  const calculateAge = (dob: string) => {
    if (!dob) return "";

    const [day, month, year] = dob.split("/").map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const handleSymptomsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setSymptoms(e.target.value));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-cyan-500 px-6 py-4 border-b border-gray-300">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  XÁC NHẬN ĐẶT LỊCH KHÁM
                </h1>
                <p className="text-blue-200 mt-1">
                  Vui lòng kiểm tra lại thông tin trước khi xác nhận
                </p>
              </div>
              <div className="bg-white rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-cyan-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-cyan-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              THÔNG TIN BỆNH NHÂN
            </h2>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Họ và tên
                  </label>
                  <div className="mt-1 p-2 bg-gray-50 rounded border border-gray-200">
                    <p className="text-gray-800">
                      {selectedPatient?.userName || "Không có thông tin"}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Ngày sinh
                  </label>
                  <div className="mt-1 p-2 bg-gray-50 rounded border border-gray-200">
                    <p className="text-gray-800">
                      {selectedPatient?.dob || "Không có thông tin"}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Địa chỉ
                  </label>
                  <div className="mt-1 p-2 bg-gray-50 rounded border border-gray-200">
                    <p className="text-gray-800">
                      {selectedPatient?.address || "Không có thông tin"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Tuổi
                  </label>
                  <div className="mt-1 p-2 bg-gray-50 rounded border border-gray-200">
                    <p className="text-gray-800">
                      {selectedPatient?.dob
                        ? calculateAge(selectedPatient.dob).toLocaleString()
                        : "Không có thông tin"}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Giới tính
                  </label>
                  <div className="mt-1 p-2 bg-gray-50 rounded border border-gray-200">
                    <p className="text-gray-800">
                      {selectedPatient?.gender || "Không có thông tin"}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Số điện thoại
                  </label>
                  <div className="mt-1 p-2 bg-gray-50 rounded border border-gray-200">
                    <p className="text-gray-800">
                      {selectedPatient?.phone || "Không có thông tin"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Information */}
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-cyan-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              THÔNG TIN ĐẶT LỊCH
            </h2>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Chuyên khoa
                  </label>
                  <div className="mt-1 p-2 bg-gray-50 rounded border border-gray-200">
                    <p className="text-gray-800">
                      {getSpecialtyName() || "Không có thông tin"}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Dịch vụ y tế
                  </label>
                  <div className="mt-1 p-2 bg-gray-50 rounded border border-gray-200">
                    <p className="text-gray-800 ">
                      {getService() && (
                        <div>
                          <p className="font-bold">
                            {getService()?.serviceName}
                          </p>
                          <p>
                            {" "}
                            {Number(getService()?.price ?? 0).toLocaleString(
                              "en-US"
                            )}{" "}
                            VND{" "}
                          </p>
                        </div>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Bác sĩ
                  </label>
                  <div className="mt-1 p-2 bg-gray-50 rounded border border-gray-200">
                    <p className="text-gray-800">
                      {getDoctorName() || "Không có thông tin"}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Thời gian hẹn
                  </label>
                  {/* <div className="mt-1 p-2 bg-gray-50 rounded border border-gray-200">
                    <p className="text-gray-800">
                      {getFormattedDateTime() || "Không có thông tin"}
                    </p>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-600">
                Triệu chứng/Lý do khám
              </label>
              <div className="mt-1">
                <textarea
                  rows={4}
                  className="w-full text-gray-700 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={symptoms}
                  onChange={handleSymptomsChange}
                  placeholder="Mô tả chi tiết triệu chứng hoặc lý do khám của bạn"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-600">
                Giá dịch vụ / Tổng chi phí khám
              </label>
              <div className="mt-2 px-4 py-3 border border-gray-300 rounded-md bg-gray-50">
                <p className="text-gray-700 font-semibold text-lg">
                  {Number(getService()?.price ?? 0).toLocaleString("en-US")} VND{" "}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Bao gồm phí khám, xét nghiệm cơ bản, và tư vấn chuyên khoa
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional hospital information */}
        <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-cyan-500">
            <h3 className="text-lg font-medium text-white">THÔNG TIN HỖ TRỢ</h3>
          </div>
          <div className="px-6 py-4">
            <div className="flex items-start mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-cyan-500 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Liên hệ hỗ trợ</h4>
                <p className="mt-1 text-gray-600">
                  📧 Email: support@hospital.com
                </p>
                <p className="text-gray-600">⏰ Phản hồi trong vòng 24 giờ</p>
                <p className="text-gray-600">📞 Hotline: 1900 1234 567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;