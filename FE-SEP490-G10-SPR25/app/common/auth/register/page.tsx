"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { register, RegistrationCredentials } from "../../services/authService";

interface RegistrationData {
  name: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  gender: string;
  dob: string;
  address: string;
  citizenId: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    gender: 'nam',
    dob: '',
    address: '',
    citizenId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Xóa lỗi của trường khi người dùng sửa
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Kiểm tra họ tên
    if (!formData.name.trim()) {
      errors.name = "Vui lòng nhập họ tên";
    }

    // Kiểm tra tên đăng nhập
    if (!formData.userName.trim()) {
      errors.userName = "Vui lòng nhập tên đăng nhập";
    } else if (formData.userName.includes(" ")) {
      errors.userName = "Tên đăng nhập không được chứa khoảng trắng";
    }

    // Kiểm tra email
    if (!formData.email) {
      errors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email không đúng định dạng";
    }

    // Kiểm tra mật khẩu
    if (!formData.password) {
      errors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    // Kiểm tra xác nhận mật khẩu
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Mật khẩu và xác nhận mật khẩu không khớp";
    }

    // Kiểm tra số điện thoại
    if (!formData.phoneNumber) {
      errors.phoneNumber = "Vui lòng nhập số điện thoại";
    } else if (
      !/^(0|\+84)([0-9]{9})$/.test(formData.phoneNumber.replace(/\s/g, ""))
    ) {
      errors.phoneNumber =
        "Số điện thoại không đúng định dạng (VD: 0xxxxxxxxx hoặc +84xxxxxxxxx)";
    }

    // Kiểm tra ngày sinh
    if (!formData.dob) {
      errors.dob = "Vui lòng nhập ngày sinh";
    }

    // Kiểm tra giới tính
    if (!formData.gender) {
      errors.gender = "Vui lòng chọn giới tính";
    }

    // Kiểm tra địa chỉ
    if (!formData.address.trim()) {
      errors.address = "Vui lòng nhập địa chỉ";
    }

    // Kiểm tra CCCD/CMND
    if (!formData.citizenId) {
      errors.citizenId = "Vui lòng nhập số CCCD/CMND";
    } else if (!/^[0-9]{9}([0-9]{3})?$/.test(formData.citizenId)) {
      errors.citizenId = 'Số CCCD/CMND không hợp lệ (9 hoặc 12 số - không bắt đầu bằng "0")';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Kiểm tra form trước khi gửi
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    // Map the form data to match the RegistrationDTO in the API
    const registrationData: RegistrationCredentials = {
      name: formData.name,
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      phoneNumber: formData.phoneNumber,
      gender: formData.gender,
      dob: formData.dob, // API expects format yyyy-MM-dd
      address: formData.address,
      citizenId: parseInt(formData.citizenId),
    };

    try {
      const result = await register(registrationData);

      if (result.success) {
        setSuccess(true);
        window.scrollTo(0, 0);
        // Chuyển hướng đến trang đăng nhập sau 2 giây
        setTimeout(() => {
          router.push("/common/auth/login");
        }, 2000);
      } else {
        setError(
          result.message || "Đăng ký không thành công. Vui lòng thử lại."
        );

        // Xử lý lỗi chi tiết từ server nếu có
        if (result.errors) {
          const serverErrors: Record<string, string> = {};

          // Chuyển đổi định dạng lỗi từ server
          Object.entries(result.errors).forEach(([key, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              // Chuẩn hóa key (viết thường chữ cái đầu)
              const normalizedKey = key.charAt(0).toLowerCase() + key.slice(1);
              serverErrors[normalizedKey] = messages[0];
            }
          });

          setFieldErrors(serverErrors);
        }

        window.scrollTo(0, 0);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error during registration:", err);
        setError(
          err.message ||
            "Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau."
        );
      } else {
        console.error("Unexpected error during registration:", err);
        setError(
          "Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau."
        );
      }
      window.scrollTo(0, 0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-screen">
      <Image
        src="/images/background_home.jpeg"
        alt="Register Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 w-full h-full"
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-10 px-4">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
          <h2 className="text-center text-2xl font-bold text-blue-600 mb-6">
            Đăng ký tài khoản
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
              Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    fieldErrors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  required
                  placeholder="Nhập họ tên đầy đủ"
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    fieldErrors.userName ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  required
                  placeholder="Tên đăng nhập"
                />
                {fieldErrors.userName && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.userName}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  fieldErrors.email ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                required
                placeholder="your@email.com"
              />
              {fieldErrors.email && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu <span className="text-red-500">*</span></label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    fieldErrors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  required
                  placeholder="Tối thiểu 6 ký tự"
                  minLength={6}
                />
                {fieldErrors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu <span className="text-red-500">*</span></label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    fieldErrors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md`}
                  required
                  placeholder="Nhập lại mật khẩu"
                />
                {fieldErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    fieldErrors.phoneNumber
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md`}
                  required
                  placeholder="Số điện thoại liên hệ"
                />
                {fieldErrors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.phoneNumber}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="citizenId" className="block text-sm font-medium text-gray-700 mb-1">CCCD/CMND <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="citizenId"
                  name="citizenId"
                  value={formData.citizenId}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    fieldErrors.citizenId ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  required
                  placeholder="Số CCCD/CMND (9 hoặc 12 số)"
                />
                {fieldErrors.citizenId && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.citizenId}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Giới tính <span className="text-red-500">*</span></label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    fieldErrors.gender ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  required
                >
                  <option value="nam">Nam</option>
                  <option value="nữ">Nữ</option>
                </select>
                {fieldErrors.gender && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.gender}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    fieldErrors.dob ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  required
                />
                {fieldErrors.dob && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.dob}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ <span className="text-red-500">*</span></label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  fieldErrors.address ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                rows={2}
                required
                placeholder="Nhập địa chỉ đầy đủ"
              ></textarea>
              {fieldErrors.address && (
                <p className="mt-1 text-sm text-red-600">
                  {fieldErrors.address}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mt-6">
              <Link
                href="/common/auth/login"
                className="text-sm text-blue-600 hover:underline"
              >
                Đã có tài khoản? Đăng nhập
              </Link>

              <button
                type="submit"
                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Đăng ký"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
