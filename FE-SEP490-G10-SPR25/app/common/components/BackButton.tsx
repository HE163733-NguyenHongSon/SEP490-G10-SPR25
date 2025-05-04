"use client";

import { useRouter, usePathname } from "next/navigation";

interface BackButtonProps {
  fallbackPath?: string;
}

export default function BackButton({ fallbackPath }: BackButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    // Quyết định đường dẫn quay lại dựa trên URL hiện tại
    if (fallbackPath) {
      router.push(fallbackPath);
    } else if (pathname.includes('/guest/doctors')) {
      router.push('/guest/doctors');
    } else if (pathname.includes('/patient/doctors')) {
      router.push('/patient/doctors');
    } else if (pathname.includes('/guest/services/service-detail/')) {
      router.push('/guest/services');
    } else if (pathname.includes('/patient/services/service-detail/')) {
      router.push('/patient/services');
    } else if (pathname.includes('/guest/specialties/')) {
      router.push('/guest/specialties');
    } else if (pathname.includes('/patient/specialties/')) {
      router.push('/patient/specialties');
    } else if (pathname.includes('/guest/blogs/')) {
      router.push('/guest/blogs');
    } else if (pathname.includes('/patient/blogs/')) {
      router.push('/patient/blogs');
    } else if (pathname.includes('/guest/')) {
      router.push('/guest');
    } else {
      router.push('/patient');
    }
  };

  return (
    <button
      onClick={handleBack}
      className="absolute top-2 left-5 text-3xl font-semibold hover:text-cyan-500"
    >
      ←
    </button>
  );
}
