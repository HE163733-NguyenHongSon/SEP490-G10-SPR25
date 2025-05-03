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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    // Kiểm tra nếu có file đã được lưu trong localStorage
    const storedFileBase64 = localStorage.getItem("uploadedFileBase64");
    const storedFileName = localStorage.getItem("uploadedFileName");

    if (storedFileBase64 && storedFileName) {
      const file = new File([new Blob([storedFileBase64])], storedFileName, {
        type: "image/jpeg",
      });
      setSelectedFile(file);
    }

    const status = searchParams.get("status");
    const transactionId = searchParams.get("transactionId");
    const amount = searchParams.get("amount");
    const paymentMethod = searchParams.get("paymentMethod");
    const paymentStatus = searchParams.get("paymentStatus");
    const code = searchParams.get("code");
    const reservationId = searchParams.get("reservationId");

    if (status === "success") {
      setPopup({
        title: "✅ Thanh toán thành công",
        message: `Mã giao dịch: ${transactionId}\nSố tiền: ${
          amount ? Number(amount).toLocaleString("vi-VN") : "0"
        } VNĐ\nPhương thức: ${paymentMethod}\nTrạng thái: ${paymentStatus}`,
        isSuccess: true,
      });
      console.log(selectedFile, reservationId);

      if (selectedFile && reservationId) {
        const fileExt = selectedFile.name.substring(
          selectedFile.name.lastIndexOf(".")
        );
        const newFileName = `lichhen_${reservationId}${fileExt}`;

        const renamedFile = new File([selectedFile], newFileName, {
          type: selectedFile.type,
        });

        const formData = new FormData();
        formData.append("files", renamedFile);

        fetch("http://localhost:5220/api/Storage/UploadFiles", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Upload result:", data);
            localStorage.removeItem("uploadedFileBase64");
            localStorage.removeItem("uploadedFileName");
          })
          .catch((error) => {
            console.error("Upload failed:", error);
          });
      }
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
  }, [searchParams, router, selectedFile]);

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center justify-center"
      style={{ backgroundImage: 'url("/images/background_home.jpeg")' }}
      id="Body"
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>

      {popup && (
        <div className="z-20 bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md text-center animate-fade-in">
          <div
            className={`text-4xl mb-4 ${
              popup.isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {popup.isSuccess ? "🎉" : "⚠️"}
          </div>
          <h2
            className={`text-2xl font-semibold mb-2 ${
              popup.isSuccess ? "text-green-700" : "text-red-700"
            }`}
          >
            {popup.title}
          </h2>
          <pre className="whitespace-pre-wrap text-gray-700 text-sm">
            {popup.message}
          </pre>
          <p className="mt-6 text-sm text-gray-500 italic">
            Đang chuyển hướng về trang của bạn...
          </p>
        </div>
      )}
    </div>
  );
};

export default VNPayReturn;
