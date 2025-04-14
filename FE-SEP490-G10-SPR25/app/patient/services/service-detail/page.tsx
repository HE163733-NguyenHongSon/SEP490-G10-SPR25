'use client';
import { Star } from "lucide-react";
import Image from 'next/image';

const ServiceDetailPage = () => {
    //const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;

    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center p-6 mt-16">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6">
                {/* Header Section */}
                <div className="flex items-center space-x-6 border-b pb-4">
                    {/* <Image                 
                     src={`${imgUrl}/${doctor.avatarUrl}`} 
                     height={100}
                     width={100}
                    alt="Service" className="rounded-lg" /> */}
                    <div>
                        <h1 className="text-3xl font-bold">General Consultation</h1>
                        <p className="text-gray-500">30-minute 1-to-1 doctor take on</p>
                        <div className="flex items-center space-x-4 mt-2">
                            <span className="text-2xl font-semibold text-blue-600">350.000vnđ</span>
                            <div className="flex items-center text-yellow-500">
                                <Star size={18} />
                                <span className="ml-1">4.7 (123 treatment)</span>
                            </div>
                        </div>
                        <button className="mt-3 px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">Book Service</button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-4 flex space-x-8 text-gray-600 border-b pb-2">
                    <span className="font-semibold text-blue-600 border-b-2 border-blue-600 pb-1 cursor-pointer">Overall</span>
                    <span className="cursor-pointer">Doctors take on</span>
                    <span className="cursor-pointer">Feedback</span>
                </div>

                {/* Description Section */}
                <div className="mt-6">
                    <h2 className="font-semibold text-lg">Description</h2>
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                        Limit waiting time. All medical examination/treatment steps are prioritized to be carried out quickly.
                        This helps customers save maximum time on medical examination.
                    </p>
                </div>

                {/* Devices Section */}
                <div className="mt-6">
                    <h2 className="font-semibold text-lg">Devices</h2>
                    <ul className="text-gray-600 mt-2 text-sm list-disc pl-6">
                        <li><b>MRI Scanner</b> (Magnetic Resonance Imaging) for internal organs</li>
                        <li><b>X-Ray Machine</b> (Standard X-ray Imaging) for diagnostic purposes</li>
                    </ul>
                </div>

                {/* Process Section */}
                <div className="mt-6">
                    <h2 className="font-semibold text-lg">Process</h2>
                    <p className="text-gray-600 mt-2 text-sm">
                        Registration Booking via hotline: <b>0287 102 6789 - 093 180 6358</b>. <br/>
                        Customers receive confirmation information and attend medical examination.
                    </p>
                </div>

                {/* Relevant Services Section */}
                <div className="mt-8">
                    <h2 className="font-semibold text-lg">Relevant Services</h2>
                    <div className="mt-4 flex space-x-6 overflow-x-auto">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="min-w-[220px] p-4 shadow-md bg-white rounded-lg border">
                                <Image src="/images/service_icon.png" alt="Service" className="w-full h-28 object-cover rounded-lg" />
                                <p className="text-sm font-semibold mt-3 text-center">General Consultation</p>
                                <div className="flex justify-center items-center text-yellow-500 text-xs mt-2">
                                    <Star size={14} /> <span className="ml-1">4.7 (123)</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailPage;
