"use client";
import React, { useEffect, useState } from "react";
import { serviceService } from "../../common/services/serviceService";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { isAuthenticated } from "../../common/services/authService";
import { Star, Calendar, ArrowLeft, MessageSquare, Clock } from "lucide-react";
import { feedbackService } from "../../common/services/feedbackService";
import FeedbackList from "../../guest/components/FeedbackList";
import { doctorService } from "../../common/services/doctorService";

const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;

// Interface for doctor data from the API
interface IDoctor {
  userId: number;
  userName: string;
  academicTitle?: string;
  degree?: string;
  avatarUrl?: string;
  experience?: string;
  specialtyNames?: string[];
  numberOfService?: number;
  numberOfExamination?: number;
}

// Type for doctor data used in the component
interface IRelatedDoctorEnhanced {
  doctorId: number;
  doctorName: string;
  academicTitle?: string;
  degree?: string;
  image?: string;
  avatarUrl?: string;
  experience?: string;
}

// Type for service data with additional fields
interface IServiceDetailDTO {
  serviceId: string;
  serviceName: string;
  overview?: string;
  process?: string;
  treatmentTechniques?: string;
  price: number;
  estimatedTime?: string;
  isPrepayment?: boolean;
  specialtyId: number;
  specialtyName?: string;
  image: string;
  rating?: number;
  ratingCount?: number;
  feedbacks?: any[];
  duration?: string;
  requiredDevices?: string[];
}

interface ServiceDetailPageProps {
  params: {
    serviceId: string;
  };
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ params }) => {
  const router = useRouter();
  const serviceId = params.serviceId;
  const [service, setService] = useState<IServiceDetailDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overall");
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [doctors, setDoctors] = useState<IRelatedDoctorEnhanced[]>([]);

  // Log API endpoints for debugging
  const logApiEndpoints = () => {
    console.log('API endpoints:', {
      serviceDetail: `${process.env.NEXT_PUBLIC_API_URL}/api/Services/details/${serviceId}`,
      doctorsByService: `${process.env.NEXT_PUBLIC_API_URL}/api/Doctors/GetDoctorListByServiceId/${serviceId}`
    });
  };

  // Function to convert doctor data from API to component format
  const convertToRelatedDoctor = (doctor: IDoctor): IRelatedDoctorEnhanced => {
    return {
      doctorId: doctor.userId,
      doctorName: doctor.userName || "Bác sĩ không xác định",
      academicTitle: doctor.academicTitle,
      degree: doctor.degree,
      image: doctor.avatarUrl,
      avatarUrl: doctor.avatarUrl,
      experience: doctor.experience || (doctor.specialtyNames ? doctor.specialtyNames.join(", ") : "")
    };
  };

  // Load service details and related doctors
  useEffect(() => {
    setLoading(true);
    logApiEndpoints();
    
    // Fetch service details
    serviceService.getServiceDetailById(Number(serviceId))
      .then((data) => {
        console.log('Service data received:', data);
        setService(data as IServiceDetailDTO);
        
        // Get feedback data if available
        if ((data as IServiceDetailDTO).feedbacks) {
          try {
            const serviceFeedbacks = feedbackService.extractServiceFeedback((data as IServiceDetailDTO).feedbacks || []);
            setFeedbacks(serviceFeedbacks);
          } catch (err) {
            console.error("Error processing feedback:", err);
          }
        }

        // Fetch doctors for this service in all cases
        doctorService.getDoctorListByServiceId(Number(serviceId))
          .then(doctorData => {
            console.log('Doctors fetched for service:', doctorData);
            
            if (doctorData && doctorData.length > 0) {
              // Convert doctors to expected format with proper type casting
              const formattedDoctors = doctorData.map((doc: any) => convertToRelatedDoctor({
                userId: doc.userId,
                userName: doc.userName,
                academicTitle: doc.academicTitle,
                degree: doc.degree,
                avatarUrl: doc.avatarUrl,
                experience: doc.experience,
                specialtyNames: doc.specialtyNames
              }));
              setDoctors(formattedDoctors);
              
              // Set first doctor as selected with proper numeric conversion
              if (doctorData[0] && doctorData[0].userId) {
                const doctorId = Number(doctorData[0].userId);
                if (!isNaN(doctorId)) {
                  setSelectedDoctor(doctorId);
                }
              }
            }
            setLoading(false);
          })
          .catch(err => {
            console.error('Error fetching doctors:', err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error("Error fetching service:", err);
        setError("Không thể tải thông tin dịch vụ.");
        setLoading(false);
      });
  }, [serviceId]);

  const handleBookService = () => {
    if (!isAuthenticated()) {
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        sessionStorage.setItem("redirectAfterLogin", currentPath);
        router.push("/common/auth/login");
      }
      return;
    }
    
    // Ensure service ID and selected doctor ID are valid numbers
    const validServiceId = service?.serviceId && !isNaN(Number(service.serviceId)) 
      ? Number(service.serviceId) 
      : null;
      
    // If user selects a specific doctor, include that in booking
    const queryParams = validServiceId 
      ? (selectedDoctor 
          ? `serviceId=${validServiceId}&doctorId=${selectedDoctor}` 
          : `serviceId=${validServiceId}`)
      : "";
    
    if (validServiceId) {
      router.push(`/patient/appointment-booking?${queryParams}`);
    } else {
      console.error("Invalid service ID for booking");
      // Optionally display error message to user
    }
  };

  const handleDoctorSelect = (doctorId: number) => {
    setSelectedDoctor(doctorId);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center pt-20">
        <p className="text-red-500">{error || "Không tìm thấy dịch vụ"}</p>
        <div className="mt-4 flex space-x-4">
          <Link
            href="/patient/services"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Quay lại danh sách dịch vụ
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center z-10"
      style={{ backgroundImage: 'url("/images/background_doctors.jpeg")' }}
    >
      <div className="relative container w-90 text-gray-600 p-5 mt-20 mb-5 z-30 bg-white rounded-xl shadow-2xl">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-500 hover:underline mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Quay lại
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-10">
          {/* Left - text */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-black mb-4">{service.serviceName}</h1>
 
            <div className="text-gray-600 space-y-3">
              {/* Chuyên khoa */}
              <div>
                <span className="font-semibold">Chuyên khoa: </span>
                <Link href={`/patient/specialties/${service.specialtyId}`} className="text-blue-600 hover:underline">
                  {service.specialtyName}
                </Link>
              </div>
              
              {/* Giá */}
              <span className="text-blue-600 font-semibold text-xl block">
                {service.price?.toLocaleString()} VNĐ
              </span>
              
              {/* Overview preview */}
              <p className="text-gray-700 mt-2 line-clamp-2">{service.overview}</p>
            </div>
          </div>
          
          {/* Right - image */}
          <div className="w-full md:w-72 h-52 mt-6 md:mt-0 md:ml-6">
            <Image
              src={service.image ? (imgUrl ? `${imgUrl}/${service.image}` : service.image) : "/images/service.png"}
              alt={service.serviceName}
              width={288}
              height={208}
              className="w-full h-full object-cover rounded-lg shadow"
              unoptimized
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap space-x-1 md:space-x-4 border-b mb-6">
          <button
            className={`pb-2 px-3 ${activeTab === 'overall' ? 'border-b-2 border-blue-500 text-blue-500 font-semibold' : 'text-gray-500 hover:text-blue-500'}`}
            onClick={() => setActiveTab('overall')}
          >
            Tổng quan
          </button>
          <button
            className={`pb-2 px-3 ${activeTab === 'doctors' ? 'border-b-2 border-blue-500 text-blue-500 font-semibold' : 'text-gray-500 hover:text-blue-500'}`}
            onClick={() => setActiveTab('doctors')}
          >
            Bác sĩ
          </button>        
        </div>

        {/* Content */}
        {activeTab === 'overall' && (
          <div>
            {/* Overview */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-black">Thông tin tổng quan</h2>
              <p className="text-gray-700">{service.overview || "Không có thông tin tổng quan."}</p>
            </div>
            
            {/* Devices */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-black">Thiết bị sử dụng</h2>
              {service.requiredDevices && service.requiredDevices.length > 0 ? (
                <ul className="text-gray-700 list-disc pl-5 space-y-1">
                  {service.requiredDevices.map((device: string, idx: number) => (
                    <li key={idx}>{device}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">Không có thông tin về thiết bị.</p>
              )}
            </div>
            
            {/* Process */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-black">Quy trình khám</h2>
              <div className="text-gray-700 whitespace-pre-line">
                {service.process ? (
                  <div dangerouslySetInnerHTML={{ __html: service.process }} />
                ) : (
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Đăng ký qua hotline hoặc trực tiếp tại bệnh viện.</li>
                    <li>Nhận xác nhận và chuẩn bị hồ sơ.</li>
                    <li>Tham vấn với bác sĩ và thực hiện các thủ thuật cần thiết.</li>
                    <li>Nhận đơn thuốc và thuốc.</li>
                  </ul>
                )}
              </div>
            </div>
            
            {/* Treatment Techniques */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-black">Kỹ thuật điều trị</h2>
              <p className="text-gray-700 whitespace-pre-line">{service.treatmentTechniques || "Không có thông tin về kỹ thuật điều trị."}</p>
            </div>
          </div>
        )}

        {activeTab === 'doctors' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-black">Bác sĩ cung cấp dịch vụ này</h2>
              
              {/* Info text about booking with doctor */}
              <p className="text-sm text-gray-500 italic">
                Chọn bác sĩ trước khi đặt lịch
              </p>
            </div>
            
            {doctors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor, idx) => {
                  const validDoctorId = doctor.doctorId && !isNaN(Number(doctor.doctorId)) ? Number(doctor.doctorId) : null;
                  const doctorImage = doctor.avatarUrl || doctor.image || "/images/placeholder-doctor.png";
                  
                  return (
                    <div
                      key={idx}
                      className={`bg-white rounded-lg border-2 p-4 hover:shadow-lg transition-shadow flex flex-col items-center cursor-pointer
                        ${selectedDoctor === validDoctorId ? 'border-blue-500 shadow-md' : 'border-gray-200'}`}
                      onClick={() => validDoctorId && handleDoctorSelect(validDoctorId)}
                    >
                      <div className="w-32 h-32 mb-3 rounded-full overflow-hidden relative">
                        <Image
                          src={doctorImage ? (imgUrl ? `${imgUrl}/${doctorImage}` : doctorImage) : "/images/placeholder-doctor.png"}
                          alt={doctor.doctorName || "Bác sĩ"}
                          className="object-cover"
                          fill
                          unoptimized
                        />
                      </div>
                      <h3 className="font-semibold text-md text-center">
                        {doctor.academicTitle || ''} {doctor.degree || ''} {doctor.doctorName || "Bác sĩ không xác định"}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 text-center">{doctor.experience || ""}</p>
                      
                      <div className="mt-3 flex space-x-2">
                        <button
                          className={`px-3 py-1 text-sm rounded 
                            ${selectedDoctor === validDoctorId 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            validDoctorId && handleDoctorSelect(validDoctorId);
                          }}
                          disabled={!validDoctorId}
                        >
                          Chọn
                        </button>
                        {validDoctorId ? (
                          <Link
                            href={`/patient/doctors/${validDoctorId}`}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Chi tiết
                          </Link>
                        ) : (
                          <button 
                            className="px-3 py-1 bg-gray-100 text-gray-400 rounded cursor-not-allowed text-sm"
                            disabled
                          >
                            Chi tiết
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-700">Hiện chưa có bác sĩ nào cung cấp dịch vụ này.</p>
            )}
            
            {/* Booking button for the doctor tab */}
            {doctors.length > 0 && (
              <div className="mt-8 flex justify-center">
                <button
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 flex items-center"
                  onClick={handleBookService}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Đặt lịch với bác sĩ đã chọn
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Booking button fixed at bottom for mobile */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t">
          <button
            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow hover:bg-blue-600 flex items-center justify-center"
            onClick={handleBookService}
          >
            <Calendar className="h-5 w-5 mr-2" />
            Đặt lịch ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage; 