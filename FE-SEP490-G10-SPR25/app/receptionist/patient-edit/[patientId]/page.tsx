// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { patientService } from "@/services/patientService";

// export default function PatientEditPage({ params }: { params: { patientId: string } }) {
//   const router = useRouter();
//   const [patient, setPatient] = useState<IPatient | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [formData, setFormData] = useState({
//     userName: "",
//     citizenId: "",
//     gender: "",
//     dob: "",
//     address: "",
//     phoneNumber: "",
//     email: "",
//     guardianName: "",
//     guardianPhone: "",
//     guardianEmail: "",
//   });

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         const patientData = await patientService.getPatientDetailById(params.patientId);
//         setPatient(patientData);
//         setFormData({
//           userName: patientData.userName || "",
//           citizenId: patientData.citizenId || "",
//           gender: patientData.gender || "",
//           dob: patientData.dob || "",
//           address: patientData.address || "",
//           phoneNumber: patientData.phoneNumber || "",
//           email: patientData.email || "",
//           guardianName: patientData.guardianName || "",
//           guardianPhone: patientData.guardianPhone || "",
//           guardianEmail: patientData.guardianEmail || "",
//         });
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to fetch patient data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatientData();
//   }, [params.patientId]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await patientService.updatePatient(params.patientId, formData);
//       router.push(`/receptionist/patient-detail/${params.patientId}`);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to update patient data");
//     }
//   };

//   if (loading) {
//     return <div className="text-center mt-10">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center mt-10 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
//       <h1 className="text-2xl font-bold mb-6">Chỉnh sửa hồ sơ bệnh nhân</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
//           <input
//             type="text"
//             name="userName"
//             value={formData.userName}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">CCCD</label>
//           <input
//             type="text"
//             name="citizenId"
//             value={formData.citizenId}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Giới tính</label>
//           <input
//             type="text"
//             name="gender"
//             value={formData.gender}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
//           <input
//             type="date"
//             name="dob"
//             value={formData.dob}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
//           <input
//             type="text"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Người giám hộ</label>
//           <input
//             type="text"
//             name="guardianName"
//             value={formData.guardianName}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Số điện thoại người giám hộ</label>
//           <input
//             type="text"
//             name="guardianPhone"
//             value={formData.guardianPhone}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Email người giám hộ</label>
//           <input
//             type="email"
//             name="guardianEmail"
//             value={formData.guardianEmail}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Lưu thay đổi
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }