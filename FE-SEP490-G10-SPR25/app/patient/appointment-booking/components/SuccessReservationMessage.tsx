import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { RootState } from"@/store";

const SuccessReservationMessage = () => {
  const {
    selectedPatient,
    selectedDate,
    selectedTime,
    doctorId,
    doctors,
    services,
    serviceId,
    symptoms
  } = useSelector((state: RootState) => state.booking);
  const service = services.find(
    (s) => String(s.serviceId) === String(serviceId)
  );
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "24px",
        border: "2px solid #d1fae5",
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
          color: "#10b981",
          marginBottom: "16px",
          paddingBottom: "8px",
          borderBottom: "2px solid #d1fae5",
        }}
      >
        Xác Nhận Đặt Lịch Thành Công
      </h2>

      <div style={{ marginBottom: "24px" }}>
        <p style={{ marginBottom: "8px", color: "#374151" }}>
          Kính gửi <strong>{selectedPatient?.userName || "Quý khách"}</strong>,
        </p>
        <p style={{ color: "#4b5563" }}>
          Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi. Dưới đây là
          thông tin chi tiết về lịch hẹn của bạn:
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
        <tbody style={{ border: "2px solid #d1fae5" }}>
          <tr style={{ borderBottom: "1px solid #d1fae5" }}>
            <td style={{ padding: "12px", fontWeight: 600, color: "#4b5563" }}>
              Ngày hẹn:
            </td>
            <td style={{ padding: "12px", color: "#374151" }}>
              {`${moment(selectedDate).format(
                "DD-MM-YYYY"
              )} vào lúc ${selectedTime}`}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #d1fae5" }}>
            <td style={{ padding: "12px", fontWeight: 600, color: "#4b5563" }}>
              Bác sĩ:
            </td>
            <td style={{ padding: "12px", color: "#374151" }}>
              {doctors.find((d) => d.value === doctorId)?.label}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #d1fae5" }}>
            <td style={{ padding: "12px", fontWeight: 600, color: "#4b5563" }}>
              Dịch vụ:
            </td>
            <td style={{ padding: "12px", color: "#374151" }}>
              {service && (
                <div>
                  <p>{service?.serviceName}</p>
                  <p>
                    {" "}
                    {Number(service.price ?? 0).toLocaleString(
                      "en-US"
                    )} VND{" "}
                  </p>
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "12px", fontWeight: 600, color: "#4b5563" }}>
              Ghi chú:
            </td>
            <td style={{ padding: "12px", color: "#374151" }}>
              {symptoms || "Không có ghi chú thêm"}
            </td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
          fontSize: "14px",
          color: "#065f46",
          backgroundColor: "#ecfdf5",
          padding: "16px",
          borderRadius: "8px",
          border: "2px solid #d1fae5",
        }}
      >
        <p style={{ marginBottom: "8px" }}>
          Vui lòng đến đúng giờ hẹn và mang theo giấy tờ tùy thân nếu cần thiết.
          Nếu bạn có bất kỳ thắc mắc hoặc muốn thay đổi lịch hẹn, đừng ngần ngại
          liên hệ với chúng tôi.
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

export default SuccessReservationMessage;
