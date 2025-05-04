"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VNPayReturn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [popup, setPopup] = useState<{
    title: string;
    message: string;
    isSuccess: boolean;
  } | null>(null);

  useEffect(() => {
    const status = searchParams.get("status");
    const transactionId = searchParams.get("transactionId");
    const amount = searchParams.get("amount");
    const paymentMethod = searchParams.get("paymentMethod");
    const paymentStatus = searchParams.get("paymentStatus");
    const code = searchParams.get("code");

    if (status === "success") {
      setPopup({
        title: "✅ Thanh toán thành công",
        message: `Mã giao dịch: ${transactionId}\nSố tiền: ${
          amount ? Number(amount).toLocaleString("en-US") : "0"
        } VNĐ\nPhương thức: ${paymentMethod}\nTrạng thái: ${paymentStatus}`,
        isSuccess: true,
      });
    } else {
      setPopup({
        title: "❌ Giao dịch thất bại",
        message: `Mã lỗi: ${code}`,
        isSuccess: false,
      });
    }

    const timer = setTimeout(() => {
      router.push("/patient");
    }, 5000);

    return () => clearTimeout(timer);
  }, [searchParams, router]);

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center justify-center z-10"
      style={{ backgroundImage: 'url("/images/background_home.jpeg")' }}
      id="Body"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {popup && (
          <div className="bg-white shadow-lg rounded-xl p-6 max-w-md text-center">
            <h2
              className={`text-xl font-bold ${
                popup.isSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {popup.title}
            </h2>
            <p className="mt-4 whitespace-pre-line">{popup.message}</p>
            <p className="mt-6 text-sm text-gray-400">Đang chuyển hướng...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VNPayReturn;
