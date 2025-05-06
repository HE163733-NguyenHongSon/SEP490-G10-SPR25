"use client";

import { jwtDecode } from "jwt-decode";
import { AppRole, normalizeRole } from "@/common/types/roles";

export interface User {
  userId: string;
  userName: string;
  email: string;
  role: string;
  token: string;
}

export interface LoginCredentials {
  userName: string;
  password: string;
}

export interface RegistrationCredentials {
  name: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  gender: string;
  dob: string;
  address: string;
  citizenId: number;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: Record<string, unknown> | null;
  errors?: Record<string, string[]> | null;
}

// Lưu thông tin đăng nhập trong localStorage
const saveUserToLocalStorage = (user: User) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("currentUser", JSON.stringify(user));
    
  }
};

// Lấy thông tin người dùng từ localStorage
export const getCurrentUser = (): User | null => {
  if (typeof window !== "undefined") {
    const userString = localStorage.getItem("currentUser");
   
    if (userString) {
      try {
        const user = JSON.parse(userString);
        return user;
      } catch (error) {
        return null;
      }
    }
  }
  return null;
};

// Đăng ký người dùng mới (bệnh nhân)
export const register = async (
  credentials: RegistrationCredentials
): Promise<ApiResponse> => {
  try {

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/User/Register-Patient`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });


    if (!response.ok && response.status !== 200) {
      // Handle HTTP errors (non-2xx)
      const errorText = await response.text();
      console.error("HTTP error:", response.status, errorText);

      throw new Error(
        `Lỗi kết nối đến server (${response.status}): ${
          response.status === 404
            ? "Không tìm thấy API"
            : response.status === 500
            ? "Lỗi nội bộ server"
            : "Kiểm tra lại kết nối mạng và cấu hình API"
        }`
      );
    }

    // Check if response is valid JSON
    const responseText = await response.text();

    let result: ApiResponse;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      throw new Error(
        `Server trả về định dạng không hợp lệ. Có thể là lỗi server hoặc cấu hình sai. Chi tiết: ${responseText.substring(
          0,
          100
        )}...`
      );
    }


    return result;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// Đăng xuất
export const logout = (): void => {
  localStorage.removeItem("currentUser");
  // Dispatch sự kiện để thông báo rằng người dùng đã logout
  window.dispatchEvent(new Event("storage"));
};

// Kiểm tra token còn hạn dùng không
const isTokenValid = (token: string): boolean => {
  try {
    interface DecodedToken {
      exp?: number;
      [key: string]: unknown; // Add specific fields as needed
    }

    const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
    if (!decoded.exp) return false;

    // Kiểm tra hạn của token
    const expiryTime = decoded.exp * 1000; // Convert to milliseconds
    return Date.now() < expiryTime;
  } catch (e) {
    console.error("Error decoding token", e);
    return false;
  }
};

// Đăng nhập
export const login = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // Make API call to authenticate
    const response = await fetch(`${apiUrl}/api/User/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    // First try parsing the response as JSON, but handle parsing errors gracefully
    let data;
    try {
      const responseText = await response.text();
     

      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON parsing error:", parseError);
        throw new Error(
          `Failed to parse API response as JSON. Server may be returning invalid format. Response: ${responseText.substring(
            0,
            50
          )}...`
        );
      }
    } catch (error) {
      console.error("Error processing response:", error);
      throw new Error(
        "Could not process server response. Please try again later."
      );
    }

   
    if (!data.success) {
      throw new Error(data.message || "Đăng nhập không thành công");
    }

    // Extract token from API response
    const token = data.data.token;
    if (!token) {
      throw new Error("Token không hợp lệ");
    }


    // Extract user information from API response or decoded token
    let user: User;

    // If API directly provides user information
    if (data.data.user) {
      const apiUser = data.data.user;

      // If API response includes a single role string
      let primaryRole = "";
      if (apiUser.role) {
        primaryRole = apiUser.role;
      }
      // If API response only includes roles array
      else if (apiUser.roles && apiUser.roles.length > 0) {
        primaryRole = apiUser.roles[0];
      }

      user = {
        userId: apiUser.userId?.toString() || "0",
        userName: apiUser.userName || "",
        email: apiUser.email || "",
        role: primaryRole,
        token,
      };

      
    } else {
      // Fallback to decoding the token if user info not provided
      interface DecodedToken {
        nameid?: string;
        UserName?: string;
        email?: string;
        role?: string | string[];
        [key: string]: unknown; // Add specific fields as needed
      }
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);

      // Extract roles from JWT token
      let roles: string[] = [];

      try {
        // Handle roles from ClaimTypes.Role and custom "role" claim
        if (decoded.role) {
          // Handle if role is a string or an array
          if (Array.isArray(decoded.role)) {
            roles = decoded.role;
          } else if (typeof decoded.role === "string") {
            roles = [decoded.role];
          }
        }

        // Also check for http://schemas.microsoft.com/ws/2008/06/identity/claims/role
        // which is the standard ClaimTypes.Role value
        const standardRoleClaim =
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
        if (decoded[standardRoleClaim]) {
          if (Array.isArray(decoded[standardRoleClaim])) {
            // Add any roles not already in the array
            decoded[standardRoleClaim].forEach((role: string) => {
              if (typeof role === "string" && !roles.includes(role)) {
                roles.push(role);
              }
            });
          } else if (
            typeof decoded[standardRoleClaim] === "string" &&
            !roles.includes(decoded[standardRoleClaim])
          ) {
            roles.push(decoded[standardRoleClaim]);
          
          }
        }

      } catch (error) {
        console.error("Error extracting roles from token:", error);
      }

      user = {
        userId: String(
          decoded.nameid ||
            decoded[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ] ||
            "0"
        ),
        userName: String(
          decoded.UserName ||
            decoded[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
            ] ||
            ""
        ),
        email: decoded.email || "",
        role: roles.length > 0 ? roles[0] : "Unknown",
        token,
      };
    }

    

    // Save user to localStorage
    saveUserToLocalStorage(user);

    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Kiểm tra người dùng đã đăng nhập chưa
export const isAuthenticated = (): boolean => {
  const user = getCurrentUser();
  return user !== null;
};

// Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
export const requireAuth = (callback?: () => void): boolean => {
  const isLoggedIn = isAuthenticated();

  if (!isLoggedIn) {
    // Nếu không phải môi trường server và cần chuyển hướng
    if (typeof window !== "undefined") {
      // Lưu URL hiện tại để sau khi đăng nhập có thể chuyển lại
      const currentPath = window.location.pathname;
      sessionStorage.setItem("redirectAfterLogin", currentPath);

      // Chuyển hướng đến trang đăng nhập
      window.location.href = "/auth/login";
    }
    return false;
  }

  // Nếu đã đăng nhập và có callback thì thực thi
  if (callback) {
    callback();
  }

  return true;
};

// Lấy URL để chuyển hướng sau khi đăng nhập
export const getRedirectUrl = (): string => {
  // Xem có đường dẫn đã lưu không
  if (typeof window !== "undefined") {
    const redirectUrl = sessionStorage.getItem("redirectAfterLogin");
    if (redirectUrl) {
      sessionStorage.removeItem("redirectAfterLogin"); // Xóa sau khi đã sử dụng
      return redirectUrl;
    }
  }

  // Nếu không có đường dẫn đã lưu, chuyển hướng dựa trên vai trò
  const user = getCurrentUser();
  if (user) {
    // Sử dụng normalizeRole để chuẩn hóa vai trò
    const normalizedRole = normalizeRole(user.role);

    // Chuyển hướng theo vai trò chuẩn hóa
    if (normalizedRole === AppRole.Admin) {
      return "/admin";
    } else if (normalizedRole === AppRole.Doctor) {
      return "/doctor/dashboard";
    } else if (normalizedRole === AppRole.Receptionist) {
      return "/receptionist/dashboard";
    } else if (normalizedRole === AppRole.Patient) {
      return "/patient/dashboard";
    } else if (normalizedRole === AppRole.Guardian) {
      return "/patient/dashboard";
    }
  }

  // Mặc định nếu không xác định được vai trò
  return "/";
};

// Kiểm tra vai trò người dùng
export const hasRole = (requiredRole: AppRole | AppRole[]): boolean => {
  const user = getCurrentUser();
  if (!user) {
    return false;
  }

 

  // Chuẩn hóa vai trò người dùng
  const normalizedUserRole = normalizeRole(user.role);

  if (!normalizedUserRole) {
    return false;
  }

  // Nếu requiredRole là mảng, kiểm tra xem người dùng có ít nhất một vai trò nào trong đó không
  if (Array.isArray(requiredRole)) {
    const hasAnyRole = requiredRole.some((role) => normalizedUserRole === role);
    return hasAnyRole;
  }

  // Nếu requiredRole là một giá trị đơn, kiểm tra trực tiếp
  const hasRole = normalizedUserRole === requiredRole;
  return hasRole;
};

// Lấy token để gửi request
export const getAuthHeader = ():
  | { Authorization: string }
  | Record<string, unknown> => {
  const user = getCurrentUser();
  if (!user || !isTokenValid(user.token)) return {};

  return {
    Authorization: `Bearer ${user.token}`,
  };
};
