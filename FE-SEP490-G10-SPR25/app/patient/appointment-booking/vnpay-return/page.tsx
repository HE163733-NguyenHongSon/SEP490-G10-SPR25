"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import reservationService from "@/common/services/reservationService";
import SuccessReservationMessage from "../components/SuccessReservationMessage";
import { emailService } from "@/common/services/emailService";

// Main component for handling VNPay payment result
const VNPayReturn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [popup, setPopup] = useState<{
    title: string;
    message: string;
    isSuccess: boolean;
  } | null>(null);

  const [fileFromStorage, setFileFromStorage] = useState<File | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  // Fetch user from localStorage when the component is mounted
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) as IUser;
      setUser(parsedUser);
    }
  }, []);

  // Fetch file from localStorage if available
  useEffect(() => {
    const base64 = localStorage.getItem("uploadedFileBase64");
    const name = localStorage.getItem("uploadedFileName");

    if (base64 && name) {
      const base64Data = base64.split(",")[1];
      const byteChars = atob(base64Data);
      const byteNumbers = Array.from(byteChars).map((c) => c.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);
      const file = new File([byteArray], name, { type: "image/jpeg" });
      setFileFromStorage(file);
    }
  }, []);

  // Handle the payment result based on the search parameters (payment status, reservationId, etc.)
  useEffect(() => {
    const handlePaymentResult = async () => {
      const status = searchParams.get("status");
      const transactionId = searchParams.get("transactionId");
      const amount = searchParams.get("amount");
      const paymentMethod = searchParams.get("paymentMethod");
      const paymentStatus = searchParams.get("paymentStatus");
      const code = searchParams.get("code");
      const reservationId = searchParams.get("reservationId");

      // If status is missing, we stop execution
      if (!status) return;

      // If the payment is successful
      if (status === "success") {
        setPopup({
          title: "✅ Thanh toán thành công",
          message: `Mã giao dịch: ${transactionId}\nSố tiền: ${
            amount ? Number(amount).toLocaleString("vi-VN") : "0"
          } VNĐ\nPhương thức: ${paymentMethod}\nTrạng thái: ${paymentStatus}`,
          isSuccess: true,
        });

        // If reservationId is available, process the reservation
        if (reservationId) {
          try {
            const reservation = await reservationService.getReservationById(
              reservationId
            );
            console.log("useremail", user?.email);

            // Prepare email content
            const htmlMessage = ReactDOMServer.renderToStaticMarkup(
              <SuccessReservationMessage
                addedReservation={reservation}
                userName={user?.userName}
              />
            );

            // Send email to user
            await emailService.sendEmail({
              toEmail: user?.email || "",
              subject: "Thông báo đặt lịch thành công!",
              message: htmlMessage,
            });
          } catch (err) {
            console.error("Gửi email thất bại:", err);
          }
        }

        // If there's a file from storage, upload it to the server
        if (fileFromStorage && reservationId) {
          const ext = fileFromStorage.name.substring(
            fileFromStorage.name.lastIndexOf(".")
          );
          const newFileName = `lichhen_${reservationId}${ext}`;
          const renamedFile = new File([fileFromStorage], newFileName, {
            type: fileFromStorage.type,
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
              // Clear localStorage after upload
              localStorage.removeItem("uploadedFileBase64");
              localStorage.removeItem("uploadedFileName");
            })
            .catch((err) => console.error("Upload error:", err));
        }
      } else {
        // If the payment failed
        setPopup({
          title: "❌ Giao dịch thất bại",
          message: `Mã lỗi: ${code}`,
          isSuccess: false,
        });
      }

      const timer = setTimeout(() => {
        router.push("/patient");
      }, 3000);

      return () => clearTimeout(timer);
    };

    handlePaymentResult();
  }, [searchParams, router, fileFromStorage, user]);

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center justify-center"
      style={{ backgroundImage: 'url("/images/background_home.jpeg")' }}
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
