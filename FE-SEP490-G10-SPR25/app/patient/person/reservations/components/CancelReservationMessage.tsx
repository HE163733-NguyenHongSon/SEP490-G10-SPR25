interface MessengerProps {
  userName?: string;
  reservation?: IReservation | null;
  cancelledCountThisMonth: number | null;
}

const CancelReservationMessage: React.FC<MessengerProps> = ({
  userName,
  reservation,
  cancelledCountThisMonth,
}) => {
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
          Kính gửi <strong style={{}}>{userName || "Quý khách"}</strong>,
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
              Bệnh nhân:
            </td>
            <td style={{ padding: "12px", color: "#374151" }}>
              {reservation?.patient.userName}
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
              {reservation?.doctorSchedule.slotStartTime &&
                ` - ${reservation.doctorSchedule.slotEndTime}`}
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
              {reservation?.doctorSchedule.doctorName || "N/A"}
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
              {reservation?.doctorSchedule.serviceName || "N/A"}
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
          {cancelledCountThisMonth === null ? (
            <>Đang kiểm tra số lần hủy trong tháng này...</>
          ) : (
            <>
              {cancelledCountThisMonth >= 0 && cancelledCountThisMonth < 2 ? (
                <span>
                  Chú ý: bạn còn{" "}
                  <strong className="text-orange-600">
                    {3 - (cancelledCountThisMonth + 1)}
                  </strong>{" "}
                  lần hủy trong tháng này.
                  <br />
                </span>
              ) : (
                <span className="text-red-600 font-semibold">
                  Bạn đã hết lượt hủy trong tháng.
                  <br />
                </span>
              )}
              Vui lòng liên hệ chúng tôi nếu bạn cần hỗ trợ thêm hoặc muốn đặt
              lịch mới.
            </>
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
