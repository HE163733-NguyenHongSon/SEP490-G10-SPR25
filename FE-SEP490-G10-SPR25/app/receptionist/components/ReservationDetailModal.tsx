import { Modal, Row, Col, Form, Button, Select } from "antd";
import React from "react";

export default function ReservationDetailModal({
  open,
  onClose,
  reservation,
  showDoctorList = false,
  alternativeDoctors = [],
  selectedDoctorId = null,
  setSelectedDoctorId = () => {},
  onChangeDoctor = () => {},
  onUpdateDoctor = () => {},
}: {
  open: boolean;
  onClose: () => void;
  reservation: any; // Nên thay bằng interface chuẩn nếu có
  showDoctorList?: boolean;
  alternativeDoctors?: any[];
  selectedDoctorId?: number | null;
  setSelectedDoctorId?: (id: number) => void;
  onChangeDoctor?: () => void;
  onUpdateDoctor?: () => void;
}) {
  if (!reservation) return null;
  return (
    <Modal
      title="Chi tiết lịch hẹn"
      open={open}
      onCancel={onClose}
      width={700}
      footer={[
        reservation?.status === "Xác nhận" && !showDoctorList && (
          <Button
            key="change-doctor"
            type="default"
            onClick={onChangeDoctor}
            style={{ backgroundColor: "#4CAF50", color: "#fff" }}
            title="Chuyển ca khám cho bác sĩ khác và hủy lịch ở bác sĩ hiện tại"
          >
            Danh sách bác sĩ có thể đổi ca
          </Button>
        ),
        reservation?.status === "Xác nhận" && showDoctorList && (
          <Button
            key="update-doctor"
            type="primary"
            onClick={onUpdateDoctor}
            disabled={!selectedDoctorId}
          >
            Cập nhật bác sĩ
          </Button>
        ),
        <Button key="back" onClick={onClose}>Đóng</Button>,
      ]}
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <div>
              <label>Tên bệnh nhân: {reservation.patient?.userName}</label>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <label>CCCD: {reservation.patient?.citizenId}</label>
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <div>
              <label>Số điện thoại: {reservation.patient?.phone}</label>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <label>Email: {reservation.patient?.email}</label>
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <div>
              <label>Tên bác sĩ: {reservation.doctorSchedule?.doctorName}</label>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <label>Chuyên khoa: {reservation.doctorSchedule?.degree}</label>
            </div>
          </Col>
        </Row>
        <Row>
          <div>
            <label>Dịch vụ: {reservation.doctorSchedule?.serviceName}</label>
          </div>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <div>
              <label>Phòng khám: {reservation.doctorSchedule?.roomName}</label>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <label>Giá dịch vụ: {reservation.doctorSchedule?.servicePrice}</label>
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <div>
              <label>Ngày hẹn: {reservation.appointmentDate}</label>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <label>Trạng thái lịch hẹn: {reservation.status}</label>
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <div>
              <label>
                thời gian: {reservation.doctorSchedule?.slotStartTime} - {reservation.doctorSchedule?.slotEndTime}
              </label>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <label>Trạng thái thanh toán: {reservation.paymentStatus}</label>
            </div>
          </Col>
        </Row>
        {showDoctorList && alternativeDoctors.length > 0 && (
          <Form.Item label="Chọn bác sĩ thay thế">
            <Select
              placeholder="Chọn bác sĩ mới"
              value={selectedDoctorId ?? undefined}
              onChange={setSelectedDoctorId}
            >
              {alternativeDoctors.map((doctor) => (
                <Select.Option
                  key={doctor.doctorScheduleId}
                  value={doctor.doctorScheduleId}
                >
                  {doctor.doctorName} - {doctor.doctorId}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
} 