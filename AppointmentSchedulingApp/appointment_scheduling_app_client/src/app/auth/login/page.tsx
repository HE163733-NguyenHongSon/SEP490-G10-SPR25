"use client";
import React from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.push("../../patient");
  };
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center justify-center z-10"
      style={{ backgroundImage: 'url("/background_register_treatment.jpeg")' }}
      id="Body"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>
      <form className="z-30 bg-white rounded-3xl p-10 text-xl bg-opacity-95">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-xl font-medium text-gray-900">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-xl"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-xl font-medium text-gray-900">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-xl"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Login
        </button>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <a href="/register" className="text-indigo-600 hover:underline">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
