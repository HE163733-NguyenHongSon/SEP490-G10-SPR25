"use client";
import Image from "next/image";
import React, { useState, useEffect, FormEvent } from "react";
import { login, LoginCredentials } from "../../services/authService";
import { AppRole, normalizeRole } from "../../types/roles";

const LoginPage = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    userName: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [apiStatus, setApiStatus] = useState<string>("");

  useEffect(() => {
    // Clear any existing errors when component mounts
    setError("");

    const checkApiConnection = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        console.log("Checking API connection:", apiUrl);

        const response = await fetch(`${apiUrl}/api/User/Test`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          console.log("API connection successful!");
          setApiStatus("API connection successful");
        } else {
          console.warn("API connection failed, status:", response.status);
          setApiStatus(`API may not be available (${response.status})`);
        }
      } catch (error) {
        console.error("Error checking API connection:", error);
        setApiStatus("Cannot connect to API - check configuration and backend");
      }
    };

    checkApiConnection();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Login attempt with username:", credentials.userName);
      const user = await login({
        userName: credentials.userName,
        password: credentials.password,
      });

      // Log user information after login
      console.log(
        "Login successful, user:",
        JSON.stringify({
          ...user,
          token: user.token ? `${user.token.substring(0, 10)}...` : undefined,
        })
      );
      console.log("User role:", user.role);

      // Use normalized role for redirection
      const normalizedRole = normalizeRole(user.role);
      console.log("Normalized role:", normalizedRole);

      // Set redirect path based on normalized role
      let redirectPath = "/patient"; // Default fallback

      if (normalizedRole === AppRole.Admin) {
        redirectPath = "/admin";
        console.log("Redirecting to admin dashboard");
      } else if (normalizedRole === AppRole.Doctor) {
        redirectPath = "/doctor";
        console.log("Redirecting to doctor dashboard");
      } else if (normalizedRole === AppRole.Receptionist) {
        redirectPath = "/receptionist";
        console.log("Redirecting to receptionist dashboard");
      } else if (normalizedRole === AppRole.Patient) {
        redirectPath = "/patient";
        console.log("Redirecting to patient dashboard");
      } else if (normalizedRole === AppRole.Guardian) {
        redirectPath = "/patient";
        console.log("Redirecting to guardian dashboard");
      } else {
        console.log(
          "Unknown role, using default redirection to patient dashboard"
        );
      }

      console.log(`Final redirect path: ${redirectPath}`);

      // Redirect user
      window.location.href = redirectPath;
    } catch (err: unknown) {
      console.error("Login error:", err);
      if (err instanceof Error) {
        setError(
          err.message || "Đăng nhập không thành công. Vui lòng thử lại."
        );
      } else {
        setError("Đăng nhập không thành công. Vui lòng thử lại.");
      }
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{
        backgroundImage: 'url("/images/background_home.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Welcome to HAS</h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userName"
            >
              Username or Email
            </label>
            <input
              id="userName"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Username or Email"
              value={credentials.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="******************"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <div className="text-right mt-1">
              <a
                href="#"
                className="text-blue-500 text-sm hover:text-blue-700"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle forgot password here
                }}
              >
             
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded ${
                loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold focus:outline-none focus:shadow-outline`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
           
           
          </div>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Bạn chưa có tài khoản?{" "}
            <a
              href="/common/auth/register"
              className="text-blue-500 hover:text-blue-700"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
