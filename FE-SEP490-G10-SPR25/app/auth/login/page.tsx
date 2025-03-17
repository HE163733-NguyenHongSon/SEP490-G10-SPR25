"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LoginPage = () => {
  const router = useRouter();
  
  const handleLogin = () => {
    router.push("../../patient");
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Image 
        src="/images/background_home.jpeg"
        alt="Login Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 w-full h-full"
      />
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg shadow-lg w-96">
        <h2 className="text-center text-xl font-bold text-blue-500 mb-6">Welcome to HAS</h2>
        
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 text-gray-700">User name</label>
          <input type="text" id="username" className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 text-gray-700">Password</label>
          <input type="password" id="password" className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div className="text-right mb-4">
          <a href="#" className="text-blue-500 text-sm">Forgot password?</a>
        </div>

        <div className="flex justify-between mb-4">
          <button onClick={handleLogin} className="w-1/2 bg-blue-500 text-white py-2 rounded-lg mr-2">Login</button>
          <button className="w-1/2 bg-blue-400 text-white py-2 rounded-lg">Register</button>
        </div>

        <div className="text-center text-gray-500 mb-4">Or</div>
        
        <div className="text-center">
          <button className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg">
            <Image src="/google-icon.png" alt="Google Icon" width={20} height={20} className="mr-2" />
            Login via Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;