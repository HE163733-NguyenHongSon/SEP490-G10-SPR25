import React, { useEffect, useState } from "react";
import reservationService from "@/services/reservationService";

interface MessengerProps {
  reservation?: IReservation | null;
}

const CancelReservationMessage: React.FC<MessengerProps> = ({ reservation }) => {
  const [cancelCount, setCancelCount] = useState<number>(0);

  useEffect(() => {
    const fetchCancelledCount = async () => {
      if (reservation?.patient?.userId) {
        const { count } =
          await reservationService.getCancelledReservationsThisMonth(
            reservation.patient.userId
          );

        setCancelCount(count);
      }
    };

    fetchCancelledCount();
  }, [reservation]);

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "24px",
        border: "2px solid #e0f2fe",
        borderRadius: "12px",
        boxShadow: "0 24px 26px -1px rgba(0, 0, 0, 0.1)",
        fontFamily: "Poppins, sans-serif",
        
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#6b7280",
          marginBottom: "16px",
          paddingBottom: "8px",
          borderBottom: "2px solid #e0f2fe",
        }}
      >
        Thông Báo Hủy Lịch Hẹn
      </h2>

      <div style={{ marginBottom: "24px" }}>
        <p style={{ marginBottom: "8px", color: "#374151" }}>
          Kính gửi{" "}
          <strong style={{}}>
            {reservation?.patient?.userName || "Quý khách"}
          </strong>
          ,
        </p>
        <p style={{ color: "#4b5563" }}>
          Chúng tôi xin thông báo về việc hủy lịch hẹn của bạn:
        </p>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "24px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <tbody
          style={{
            border: "2px solid #e0f2fe",
            boxShadow: "px 10px 10px 10px",
          }}
        >
          <tr style={{ borderBottom: "1px solid #e0f2fe" }}>
            <td
              style={{
                padding: "12px",
                fontWeight: "600",
                color: "#4b5563",
              }}
            >
              Mã lịch hẹn:
            </td>
            <td style={{ padding: "12px", color: "#374151" }}>
              {reservation?.reservationId || "N/A"}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #e0f2fe" }}>
            <td
              style={{
                padding: "12px",
                fontWeight: "600",
                color: "#4b5563",
              }}
            >
              Ngày hẹn:
            </td>
            <td style={{ padding: "12px", color: "#374151" }}>
              {reservation?.appointmentDate
                ? new Date(reservation.appointmentDate).toLocaleDateString(
                    "vi-VN"
                  )
                : "N/A"}
              {reservation?.startTime && ` - ${reservation.startTime}`}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #e0f2fe" }}>
            <td
              style={{
                padding: "12px",
                fontWeight: "600",
                color: "#4b5563",
              }}
            >
              Bác sĩ:
            </td>
            <td style={{ padding: "12px", color: "#374151" }}>
              {reservation?.doctorName || "N/A"}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #e0f2fe" }}>
            <td
              style={{
                padding: "12px",
                fontWeight: "600",
                color: "#4b5563",
              }}
            >
              Dịch vụ:
            </td>
            <td style={{ padding: "12px", color: "#374151" }}>
              {reservation?.serviceName || "N/A"}
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "12px",
                fontWeight: "600",
                color: "#4b5563",
              }}
            >
              Lý do hủy:
            </td>
            <td style={{ padding: "12px", color: "#374151" }}>
              {reservation?.cancellationReason || "Không có thông tin"}
            </td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
          fontSize: "14px",
          color: "#4b5563",
          backgroundColor: "#ffffff",
          padding: "16px",
          borderRadius: "8px",
          border: "2px solid #e0f2fe",
        }}
      >
        <p style={{ marginBottom: "8px" }}>
          {cancelCount !== null ? (
            <>
              Chú ý bạn còn <strong>{Math.max(3 - cancelCount, 0)}</strong> lần
              hủy trong tháng này.
              <br />
              Vui lòng liên hệ chúng tôi nếu bạn cần hỗ trợ thêm hoặc muốn đặt
              lịch mới.
            </>
          ) : (
            <>Đang kiểm tra số lần hủy trong tháng này...</>
          )}
        </p>

        <p>
          Trân trọng,
          <br />
          <strong style={{ textDecoration: "underline" }}>
            Đội ngũ hỗ trợ
          </strong>
        </p>
      </div>
    </div>
  );
};

export default CancelReservationMessage;
