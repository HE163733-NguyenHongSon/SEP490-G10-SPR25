import React from "react";
import Image from "next/image";
import { assets } from "@/public/images/assets";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const Footer = () => {
  return (
    <div className="bg-gray-800 bg-opacity-90 text-white py-8">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <div className="flex items-center space-x-4 mb-8 md:mb-0">
              <Image
                src={assets.logo}
                width={100} 
                height={100}
                alt="Logo"
                className="w-24 h-24 object-contain mb-4"
              />
              <p className="text-center md:text-left text-sm md:text-base">
                Dedicated to providing compassionate and comprehensive care to
                our community. Your health is our priority.
              </p>
            </div>

            <div className="flex mt-4 gap-5 justify-center md:justify-start">
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div className="flex flex-col md:flex-row md:space-x-10 text-center md:text-left">
            {/* Services */}
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">Our Services</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-cyan-500">
                    General Checkups
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-500">
                    Specialist Consultations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-500">
                    Diagnostic Tests
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-500">
                    Emergency Services
                  </a>
                </li>
              </ul>
            </div>

            {/* About Us */}
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-cyan-500">
                    Our Doctors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-500">
                    Facilities
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-500">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-500">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li>
                  <span className="text-cyan-500">Phone:</span> +1 (800)
                  123-4567
                </li>
                <li>
                  <span className="text-cyan-500">Email:</span>{" "}
                  contact@hospital.com
                </li>
                <li>
                  <span className="text-cyan-500">Address:</span> 123 Health
                  Street, Wellness City
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-500">
                    Book an Appointment
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-6 border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Wellness Hospital. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
