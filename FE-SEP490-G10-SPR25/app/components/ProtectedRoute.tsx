"use client";

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {  getCurrentUser, isAuthenticated } from '../services/authService';
import { AppRole, normalizeRole } from '../types/roles';

// Tạo component Loading tạm thời nếu không có sẵn
const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <div className="ml-3 text-blue-500">Đang kiểm tra quyền truy cập...</div>
    </div>
  );
};

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: AppRole | AppRole[];
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  children, 
  allowedRoles, 
  redirectTo = '/auth/login'
}: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true);
      console.log('=========== ProtectedRoute Check ===========');
      console.log('Current URL:', window.location.pathname);
      console.log('Allowed roles:', Array.isArray(allowedRoles) 
        ? allowedRoles.map(r => r.toString()).join(', ') 
        : allowedRoles.toString());
      
      // Check if user is authenticated
      const isUserAuthenticated = isAuthenticated();
      console.log('User is authenticated:', isUserAuthenticated);
      
      if (!isUserAuthenticated) {
        console.log('User is not authenticated, redirecting to:', redirectTo);
        window.location.href = redirectTo;
        return;
      }
      
      // Get current user and check roles
      const user = getCurrentUser();
      if (!user) {
        console.log('Could not get current user, redirecting to:', redirectTo);
        window.location.href = redirectTo;
        return;
      }
      
      console.log('User:', user.userName);
      console.log('User role (raw):', JSON.stringify(user.role));
      
      // Normalize the user role
      const normalizedUserRole = normalizeRole(user.role);
      console.log('Normalized user role:', normalizedUserRole);
      
      if (!normalizedUserRole) {
        console.log('Could not normalize user role, redirecting to unauthorized');
        window.location.href = '/unauthorized';
        return;
      }
      
      // Special case for Patient/Guardian roles
      if ((Array.isArray(allowedRoles) && allowedRoles.includes(AppRole.Patient)) ||
          (!Array.isArray(allowedRoles) && allowedRoles === AppRole.Patient)) {
          
        console.log('Checking Patient/Guardian access');
        
        // Consider both Patient and Guardian roles as having access to Patient routes
        if (normalizedUserRole === AppRole.Patient || normalizedUserRole === AppRole.Guardian) {
          console.log('✓ Allowing access based on Patient/Guardian role');
          setIsAllowed(true);
          setIsLoading(false);
          return;
        }
      }
      
      // Check if user has any of the allowed roles
      let hasAccess = false;
      
      if (Array.isArray(allowedRoles)) {
        hasAccess = allowedRoles.includes(normalizedUserRole);
        console.log('Checking against multiple roles:', hasAccess);
      } else {
        hasAccess = allowedRoles === normalizedUserRole;
        console.log('Checking against single role:', hasAccess);
      }
      
      if (hasAccess) {
        console.log('✓ Access GRANTED - user has required role');
        setIsAllowed(true);
      } else {
        console.log('✗ Access DENIED - user does not have required role');
        console.log('Redirecting to unauthorized page');
        window.location.href = '/unauthorized';
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, [allowedRoles, redirectTo, router]);
  
  if (isLoading) {
    return <Loading />;
  }
  
  return isAllowed ? <>{children}</> : null;
};

export default ProtectedRoute; 