"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, isAuthenticated } from "../services/authService";
import { AppRole, normalizeRole } from "../types/roles";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <div className="ml-3 text-blue-500">Loading...</div>
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
  redirectTo = "/auth/login",
}: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        setIsLoading(true);

        // Redirect non-logged-in users from /patient/ to /guest/
        if (
          window.location.pathname.startsWith("/patient") &&
          !window.location.pathname.includes("/appointment-booking") &&
          !window.location.pathname.includes("/person")
        ) {
          const isUserAuthenticated = isAuthenticated();
          
          if (!isUserAuthenticated) {
            // Redirect to equivalent guest page
            const guestPath = window.location.pathname.replace("/patient", "/guest");
            const queryString = window.location.search || '';
            window.location.href = guestPath + queryString;
            return;
          }
          
          setIsAllowed(true);
          setIsLoading(false);
          return;
        }

        // Authentication check for protected routes
        const isUserAuthenticated = isAuthenticated();

        if (!isUserAuthenticated) {
          window.location.href = redirectTo;
          return;
        }

        // User role check
        const user = getCurrentUser();
        if (!user) {
          window.location.href = redirectTo;
          return;
        }

        // Normalize the user role
        const normalizedUserRole = normalizeRole(user.role);

        if (!normalizedUserRole) {
          window.location.href = "/unauthorized";
          return;
        }

        // Special case for Patient/Guardian roles
        if (
          (Array.isArray(allowedRoles) &&
            allowedRoles.includes(AppRole.Patient)) ||
          (!Array.isArray(allowedRoles) && allowedRoles === AppRole.Patient)
        ) {
          // Consider both Patient and Guardian roles as having access to Patient routes
          if (
            normalizedUserRole === AppRole.Patient ||
            normalizedUserRole === AppRole.Guardian
          ) {
            setIsAllowed(true);
            setIsLoading(false);
            return;
          }
        }

        // Check if user has any of the allowed roles
        let hasAccess = false;

        if (Array.isArray(allowedRoles)) {
          hasAccess = allowedRoles.includes(normalizedUserRole);
        } else {
          hasAccess = allowedRoles === normalizedUserRole;
        }

        if (hasAccess) {
          setIsAllowed(true);
        } else {
          window.location.href = "/unauthorized";
        }
      } catch (error) {
        console.error("Error in auth check:", error);
        window.location.href = redirectTo;
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [allowedRoles, redirectTo, router]);

  if (isLoading) {
    return <Loading />;
  }

  return isAllowed ? <>{children}</> : null;
};

export default ProtectedRoute;
