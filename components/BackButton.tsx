"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (document.referrer) {
      router.back();
    } else {
      router.push("/patient/doctors");
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
