import React from "react";

export const Footer = () => {
  return (
    <footer className="relative top-80 mb-0 bg-gray-800 bg-opacity-90 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-4">
        {/* Logo and Description */}
        <div className="mb-6 md:mb-0">
          <img src="hospital-logo.svg" alt="Hospital Logo" className="h-10 mb-4" />
          <p>
            Dedicated to providing compassionate and comprehensive care to our community. Your health is our priority.
          </p>
          <div className="flex mt-4">
            <a href="#" className="text-gray-400 mr-3 hover:text-cyan-500">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 mr-3 hover:text-cyan-500">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 mr-3 hover:text-cyan-500">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-500">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Services */}
          <div>
            <h3 className="text-lg font-medium mb-4">Our Services</h3>
            <ul>
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
          <div>
            <h3 className="text-lg font-medium mb-4">About Us</h3>
            <ul>
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
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul>
              <li>
                <span className="text-cyan-500">Phone:</span> +1 (800) 123-4567
              </li>
              <li>
                <span className="text-cyan-500">Email:</span> contact@hospital.com
              </li>
              <li>
                <span className="text-cyan-500">Address:</span> 123 Health Street, Wellness City
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
    </footer>
  );
};
