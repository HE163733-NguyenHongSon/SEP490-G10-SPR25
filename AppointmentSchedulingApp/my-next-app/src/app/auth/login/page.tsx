"use client";
import React from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.push("../../patient");
  };
  return (
    <div>
      LoginPage
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
