     import React from 'react'
     import Image from 'next/image'

     const DoctorDetailLayout = () => {
       return (
         <div className="flex flex-col">
           <div className="grid grid-cols-2">
             <div className="col-span-1">
               <Image width={200} height={200} alt="image-doctor" src={""} />
             </div>
             {/* <div className="col-span-2 flex flex-col justify-between font-sans px-3">
               <h2 className="text-lg text-gray-700 ">{doctor.currentWork}</h2>
               <p>{doctor.doctorDescription}...</p>
               <p className="text-gray-400">{doctor.specialtyNames}</p>
               <p className="font-semibold">
                 ({doctor.numberOfService} service take on)
               </p>
               <div className="flex flex-row">
                 <RatingStars rating={doctor.rating} />
                 <p>({doctor.numberOfExamination} examination)</p>
               </div>
             </div> */}
           </div>
         </div>
       );
     }
     
     export default DoctorDetailLayout