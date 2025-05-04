"use client";
import React from "react";
import { Typography, Row, Col, Card, Divider, Space, Tag } from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const InvoiceList = ({ items }: { items: IReservation[] }) => {
  return (
    <>
      {items.map((item) => {
        const fullAppointmentTime = `${dayjs(item.appointmentDate).format(
          "DD/MM/YYYY"
        )} (${item.doctorSchedule.dayOfWeek}) - ${
          item.doctorSchedule.slotStartTime
        } đến ${item.doctorSchedule.slotEndTime}`;

        const servicePrice = item.doctorSchedule.servicePrice;

        return (
          <Card
            key={item.reservationId}
            style={{
              marginBottom: 16,
              borderRadius: 12,
              boxShadow: "0 10px 12px rgba(0, 0, 0, 0.3)",
              padding: 16,
              border: "1px solid #e6e6e6",
            }}
            title={
              <Row justify="space-between" align="middle">
                <Col>
                  <Title level={4} style={{ margin: 0 }}>
                    🧾 HÓA ĐƠN KHÁM BỆNH
                  </Title>
                </Col>
                <Col>
                  <Tag color="blue">Mã hóa đơn: {item.reservationId}</Tag>
                </Col>
              </Row>
            }
          >
            <Row gutter={[16, 12]}>
              {/* --- Thông tin bệnh nhân --- */}
              <Col span={24}>
                <Title level={5}>👤 Thông tin bệnh nhân</Title>
                <Divider style={{ margin: "4px 0" }} />
              </Col>
              <Col span={12}>
                <Text strong>Họ tên:</Text> {item.patient.userName}
              </Col>
              <Col span={12}>
                <Text strong>Giới tính:</Text> {item.patient.gender}
              </Col>
              <Col span={12}>
                <Text strong>Ngày sinh:</Text>{" "}
                {dayjs(item.patient.dob).format("DD/MM/YYYY")}
              </Col>
              <Col span={12}>
                <Text strong>Số điện thoại:</Text> {item.patient.phone}
              </Col>
              <Col span={24}>
                <Text strong>Địa chỉ:</Text> {item.patient.address}
              </Col>

              {/* --- Thông tin dịch vụ --- */}
              <Col span={24}>
                <Title level={5} style={{ marginTop: 16 }}>
                  🩺 Thông tin dịch vụ
                </Title>
                <Divider style={{ margin: "4px 0" }} />
              </Col>
              <Col span={12}>
                <Text strong>Bác sĩ:</Text> {item.doctorSchedule.academicTitle}{" "}
                {item.doctorSchedule.doctorName} ({item.doctorSchedule.degree})
              </Col>
              <Col span={12}>
                <Text strong>Dịch vụ:</Text> {item.doctorSchedule.serviceName}
              </Col>
              <Col span={12}>
                <Text strong>Thời gian khám:</Text> {fullAppointmentTime}
              </Col>
              <Col span={12}>
                <Text strong>Phòng khám:</Text> {item.doctorSchedule.roomName} -{" "}
                {item.doctorSchedule.location}
              </Col>
              <Col span={24}>
                <Text strong>Lý do khám:</Text> {item.reason}
              </Col>

              {/* --- Thanh toán --- */}
              <Col span={24}>
                <Title level={5} style={{ marginTop: 16 }}>
                  💳 Thông tin thanh toán
                </Title>
                <Divider style={{ margin: "4px 0" }} />
              </Col>
              <Col span={12}>
                <Text strong>Trạng thái:</Text>{" "}
                <Tag
                  color={
                    item.paymentStatus === "Đã thanh toán" ? "green" : "red"
                  }
                >
                  {item.paymentStatus}
                </Tag>
              </Col>
              <Col span={12}>
                <Text strong>Giá dịch vụ:</Text> {servicePrice}
              </Col>
              <Col span={24} style={{ textAlign: "right" }}>
                <Title level={4}>Tổng cộng: {servicePrice}</Title>
              </Col>

              {/* --- Thông tin thêm --- */}
              <Col span={24}>
                <Divider dashed style={{ marginTop: 16 }} />
                <Space direction="vertical">
                  <Text type="secondary">
                    🕓 Ngày lập hóa đơn:{" "}
                    {dayjs(item.createdDate).format("DD/MM/YYYY HH:mm")}
                  </Text>

                  <Text type="secondary">
                    📌 Ghi chú: Hóa đơn đã được xác nhận và lưu trữ.
                  </Text>
                </Space>
              </Col>
            </Row>
          </Card>
        );
      })}
    </>
  );
};

export default InvoiceList;
