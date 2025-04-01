"use client";

import { jwtDecode } from 'jwt-decode';
import { AppRole, normalizeRole } from "@/types/roles";

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
  data: any;
  errors?: any;
}

// Lưu thông tin đăng nhập trong localStorage
const saveUserToLocalStorage = (user: User) => {
  if (typeof window !== "undefined") {
    localStorage.setItem('currentUser', JSON.stringify(user));
    console.log('User saved to localStorage with key "currentUser":', user.userName);
  }
};

// Lấy thông tin người dùng từ localStorage
export const getCurrentUser = (): User | null => {
  if (typeof window !== "undefined") {
    const userString = localStorage.getItem("currentUser");
    console.log("getCurrentUser - userString from localStorage:", userString ? "found" : "not found");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        console.log("getCurrentUser - parsed user:", user.userName);
        return user;
      } catch (error) {
        console.error("Error parsing user data", error);
        return null;
      }
    }
  }
  return null;
};

// Đăng ký người dùng mới (bệnh nhân)
export const register = async (credentials: RegistrationCredentials): Promise<ApiResponse> => {
  try {
    console.log('Registration attempt with:', credentials);
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
    
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/User/Register-Patient`;
    console.log('Full API URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    console.log('Response status:', response.status);
    
    if (!response.ok && response.status !== 200) {
      // Handle HTTP errors (non-2xx)
      const errorText = await response.text();
      console.error('HTTP error:', response.status, errorText);
      
      throw new Error(`Lỗi kết nối đến server (${response.status}): ${
        response.status === 404 ? 'Không tìm thấy API' : 
        response.status === 500 ? 'Lỗi nội bộ server' : 
        'Kiểm tra lại kết nối mạng và cấu hình API'
      }`);
    }
    
    // Check if response is valid JSON
    const responseText = await response.text();
    console.log('Raw response:', responseText);
    
    let result: ApiResponse;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      throw new Error(`Server trả về định dạng không hợp lệ. Có thể là lỗi server hoặc cấu hình sai. Chi tiết: ${responseText.substring(0, 100)}...`);
    }
    
    console.log('Registration response:', result);
    
    return result;
  } catch (error) {
    console.error('Registration error:', error);
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
    const decoded: any = jwtDecode(token);
    if (!decoded.exp) return false;
    
    // Kiểm tra hạn của token
    const expiryTime = decoded.exp * 1000; // Convert to milliseconds
    return Date.now() < expiryTime;
  } catch (e) {
    console.error('Error decoding token', e);
    return false;
  }
};

// Đăng nhập
export const login = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log('Login API URL:', apiUrl);
    
    // Make API call to authenticate
    const response = await fetch(`${apiUrl}/api/User/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    // First try parsing the response as JSON, but handle parsing errors gracefully
    let data;
    try {
      const responseText = await response.text();
      console.log('Raw API response:', responseText.substring(0, 100) + (responseText.length > 100 ? '...' : ''));
      
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        throw new Error(`Failed to parse API response as JSON. Server may be returning invalid format. Response: ${responseText.substring(0, 50)}...`);
      }
    } catch (error) {
      console.error('Error processing response:', error);
      throw new Error('Could not process server response. Please try again later.');
    }
    
    console.log('Login API response:', {
      success: data.success, 
      message: data.message, 
      hasData: !!data.data
    });
    
    if (!data.success) {
      throw new Error(data.message || 'Đăng nhập không thành công');
    }
    
    // Extract token from API response
    const token = data.data.token;
    if (!token) {
      throw new Error('Token không hợp lệ');
    }
    
    console.log('Token received, processing user data');
    
    // Extract user information from API response or decoded token
    let user: User;
    
    // If API directly provides user information
    if (data.data.user) {
      console.log('API provided user info directly');
      const apiUser = data.data.user;
      
      // If API response includes a single role string
      let primaryRole = '';
      if (apiUser.role) {
        primaryRole = apiUser.role;
        console.log('Using direct role from API response:', primaryRole);
      } 
      // If API response only includes roles array
      else if (apiUser.roles && apiUser.roles.length > 0) {
        primaryRole = apiUser.roles[0];
        console.log('Using first role from roles array:', primaryRole);
      }
      
      user = {
        userId: apiUser.userId?.toString() || '0',
        userName: apiUser.userName || '',
        email: apiUser.email || '',
        role: primaryRole,
        token
      };
      
      console.log('Created user object from API response:', {
        userId: user.userId,
        userName: user.userName,
        role: user.role
      });
    } else {
      // Fallback to decoding the token if user info not provided
      console.log('No direct user info provided, decoding from token');
      const decoded: any = jwtDecode(token);
      console.log('Decoded token:', decoded);
      
      // Extract roles from JWT token
      let roles: string[] = [];
      
      try {
        // Handle roles from ClaimTypes.Role and custom "role" claim
        if (decoded.role) {
          // Handle if role is a string or an array
          if (Array.isArray(decoded.role)) {
            roles = decoded.role;
            console.log('Extracted array of roles from token.role:', roles);
          } else if (typeof decoded.role === 'string') {
            roles = [decoded.role];
            console.log('Extracted single role from token.role:', roles);
          }
        }
        
        // Also check for http://schemas.microsoft.com/ws/2008/06/identity/claims/role
        // which is the standard ClaimTypes.Role value
        const standardRoleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
        if (decoded[standardRoleClaim]) {
          if (Array.isArray(decoded[standardRoleClaim])) {
            // Add any roles not already in the array
            decoded[standardRoleClaim].forEach((role: string) => {
              if (typeof role === 'string' && !roles.includes(role)) {
                roles.push(role);
                console.log('Added role from standard claim:', role);
              }
            });
          } else if (typeof decoded[standardRoleClaim] === 'string' && !roles.includes(decoded[standardRoleClaim])) {
            roles.push(decoded[standardRoleClaim]);
            console.log('Added single role from standard claim:', decoded[standardRoleClaim]);
          }
        }
        
        console.log('Final extracted roles from token:', roles);
      } catch (error) {
        console.error('Error extracting roles from token:', error);
      }
      
      user = {
        userId: decoded.nameid || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || '0',
        userName: decoded.UserName || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || '',
        email: decoded.email || '',
        role: roles.length > 0 ? roles[0] : 'Unknown',
        token
      };
    }
    
    console.log('User object created:', JSON.stringify({ ...user, token: token.substring(0, 20) + '...' }));
    console.log('Role value check:', JSON.stringify(user.role));
    
    // Save user to localStorage
    saveUserToLocalStorage(user);
    
    return user;
  } catch (error) {
    console.error('Login error:', error);
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
    console.log("getRedirectUrl - user role:", user.role);
    console.log("getRedirectUrl - normalized role:", normalizedRole);
    
    // Chuyển hướng theo vai trò chuẩn hóa
    if (normalizedRole === AppRole.Admin) {
      console.log("getRedirectUrl - redirecting to admin page");
      return "/admin";
    } else if (normalizedRole === AppRole.Doctor) {
      return "/doctor/dashboard";
    } else if (normalizedRole === AppRole.Receptionist) {
      return "/receptionist/dashboard";
    } else if (normalizedRole === AppRole.Patient) {
      return "/patient/dashboard";
    } else if (normalizedRole === AppRole.Guardian) {
      return "/guardian/dashboard";
    }
  }
  
  // Mặc định nếu không xác định được vai trò
  return "/";
};

// Kiểm tra vai trò người dùng
export const hasRole = (requiredRole: AppRole | AppRole[]): boolean => {
  const user = getCurrentUser();
  if (!user) {
    console.log("hasRole - No user found");
    return false;
  }

  console.log("hasRole - Checking if user has role:", user.role);
  console.log("hasRole - Required role:", requiredRole);
  
  // Chuẩn hóa vai trò người dùng
  const normalizedUserRole = normalizeRole(user.role);
  console.log("hasRole - Normalized user role:", normalizedUserRole);
  
  if (!normalizedUserRole) {
    console.log("hasRole - Could not normalize user role");
    return false;
  }

  // Nếu requiredRole là mảng, kiểm tra xem người dùng có ít nhất một vai trò nào trong đó không
  if (Array.isArray(requiredRole)) {
    console.log("hasRole - Checking against array of roles:", requiredRole);
    const hasAnyRole = requiredRole.some(role => normalizedUserRole === role);
    console.log("hasRole - User has any required role:", hasAnyRole);
    return hasAnyRole;
  }
  
  // Nếu requiredRole là một giá trị đơn, kiểm tra trực tiếp
  const hasRole = normalizedUserRole === requiredRole;
  console.log("hasRole - User has required role:", hasRole);
  return hasRole;
};

// Lấy token để gửi request
export const getAuthHeader = (): { Authorization: string } | {} => {
  const user = getCurrentUser();
  if (!user || !isTokenValid(user.token)) return {};
  
  return {
    Authorization: `Bearer ${user.token}`
  };
}; 