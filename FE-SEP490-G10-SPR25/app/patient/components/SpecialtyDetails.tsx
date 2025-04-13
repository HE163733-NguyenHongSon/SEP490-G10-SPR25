// import Image from 'next/image';
// import { useRouter } from "next/navigation"; 

// export const SpecialtyDetails = () => {
//   const router = useRouter(); 

//   return (
//     <div className="bg-gray-50 min-h-screen p-8">
//       <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
//         <button
//           onClick={() => router.back()} 
//           className="flex items-center text-blue-500 hover:underline mb-4"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 mr-2"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M9.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
//               clipRule="evenodd"
//             />
//           </svg>
//           Back
//         </button>
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-2xl font-bold">Specialty Details</h1>
//             <div className="text-gray-600 mt-2 space-y-2">
//               <a
//                 href="#introduce"
//                 className="block text-blue-500 hover:underline"
//               >
//                 · Introduce
//               </a>
//               <a
//                 href="#service"
//                 className="block text-blue-500 hover:underline"
//               >
//                 · Service
//               </a>
//               <a
//                 href="#doctor-take-on"
//                 className="block text-blue-500 hover:underline"
//               >
//                 · Doctor take on
//               </a>
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
//                   Book appointment
//               </button>
//           </div>
//                   <div className="mt-4">
//                     <h3 className="text-lg font-semibold">
//                       General Consultation
//                     </h3>
//                     <p className="text-gray-500">350,000 VND</p>
//                     <p className="text-gray-500">4.7 ★ (123 reviews)</p>
//                   </div>

//           </div>

//         </div>

//         {/* Tabs */}
//         <div className="flex space-x-4 border-b mb-6">
//           <button className="pb-2 border-b-2 border-blue-500 text-blue-500 font-semibold">
//             Overall
//           </button>
//           <button className="pb-2 text-gray-500 hover:text-blue-500">
//             Doctors
//           </button>
//           <button className="pb-2 text-gray-500 hover:text-blue-500">
//             Services
//           </button>
//         </div>

//         {/* Content */}
//         <div>
//           {/* Description */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold mb-2">Description</h2>
//             <p className="text-gray-700">
//               Limit waiting time: All medical examination/treatment steps are
//               prioritized to be carried out quickly. This helps customers save
//               maximum time on medical examinations, no longer falling into a
//               state of waiting and fatigue — especially for children, the
//               elderly, pregnant women or business customers.
//             </p>
//           </div>

//           {/* Devices */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold mb-2">Devices</h2>
//             <ul className="text-gray-700 list-disc pl-5">
//               <li>
//                 MRI Scanner (Magnetic Resonance Imaging device): Provides
//                 detailed imaging of internal organs.
//               </li>
//               <li>
//                 X-Ray Machine (Standard X-ray imaging device): Produces X-ray
//                 images for diagnostic purposes.
//               </li>
//             </ul>
//           </div>

//           {/* Process */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold mb-2">Process</h2>
//             <ul className="text-gray-700 list-disc pl-5">
//               <li>
//                 Registration/ Booking via hotline: (028) 123 456 or directly at
//                 hospital.
//               </li>
//               <li>
//                 Customers receive confirmation information and prepare required
//                 documents.
//               </li>
//               <li>
//                 Consult with a doctor with/without appointment and perform
//                 further medical actions as prescribed.
//               </li>
//               <li>Receive prescriptions and medications as required.</li>
//             </ul>
//           </div>

//           {/* Relevant Services */}
//           <div>
//             <h2 className="text-lg font-semibold mb-4">Relevant Services</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[1, 2, 3, 4].map((_, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
//                 >
//                   <Image 
//                     src="https://via.placeholder.com/150"
//                     alt="General Consultation"
//                     className="w-full h-40 object-cover rounded-t-lg"
//                   />

//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
