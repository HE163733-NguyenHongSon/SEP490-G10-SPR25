"use client";
import React, { useState, useMemo } from "react";
import {
  Select,
  DatePicker,
  Spin,
  Typography,
  Row,
  Col,
  Divider,
  Button,
} from "antd";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import reservationService from "@/common/services/reservationService";
import { useUser } from "@/common/contexts/UserContext";
import PaginatedItems from "@/common/components/PaginatedItems";
import InvoiceList from "@/guest/components/InvoiceList";

const { Title } = Typography;

const InvoicePage = ({ patientId }: { patientId: number }) => {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    "Đã thanh toán",
    "Đã hoàn tiền",
  ]);
  const [selectedMonth, setSelectedMonth] = useState<Dayjs | null>(dayjs());
  const { user } = useUser();

  const { data: reservationList = [], isLoading } = useQuery({
    queryKey: ["reservations", patientId],
    queryFn: async (): Promise<IReservation[]> => {
      return await reservationService.getListReservationByPatientId(
        user?.userId
      );
    },
    staleTime: 30000,
  });

  const filteredAndSortedReservations = useMemo(() => {
    return reservationList
      .filter((r) => {
        const isStatusMatch = selectedStatuses.includes(r.paymentStatus);
        const isSameMonth = selectedMonth
          ? dayjs(r.appointmentDate).isSame(selectedMonth, "month")
          : true;
        return isStatusMatch && isSameMonth;
      })
      .sort(
        (a, b) =>
          dayjs(b.appointmentDate).valueOf() -
          dayjs(a.appointmentDate).valueOf()
      );
  }, [reservationList, selectedStatuses, selectedMonth]);

  const handleClearFilters = () => {
    setSelectedStatuses(["Đã thanh toán", "Đã hoàn tiền"]);
    setSelectedMonth(dayjs());
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={3} style={{ marginBottom: 16, textAlign: "center" }}>
        🧾 Danh sách hóa đơn khám bệnh
      </Title>

      <Row
        gutter={[16, 16]}
        align="middle"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 25,
        }}
      >
        <Col xs={24} sm={12} md={8}>
          <Select
            mode="multiple"
            value={selectedStatuses}
            onChange={setSelectedStatuses}
            placeholder="Chọn trạng thái thanh toán"
            options={[
              { label: "Đã thanh toán", value: "Đã thanh toán" },
              { label: "Đã hoàn tiền", value: "Đã hoàn tiền" },
            ]}
            style={{ width: "100%", color: "#000" }}
          />
        </Col>

        <Col xs={24} sm={12} md={6}>
          <DatePicker
            picker="month"
            value={selectedMonth}
            onChange={setSelectedMonth}
            allowClear
            placeholder="Lọc theo tháng"
            format="MM/YYYY"
            style={{ width: "100%" }}
          />
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Button onClick={handleClearFilters} style={{ width: "100%" }}>
            Clear
          </Button>
        </Col>
      </Row>

      <Divider style={{ margin: "8px" }} />

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <Spin size="large" />
        </div>
      ) : filteredAndSortedReservations.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="150"
            height="150"
            style={{ margin: "auto", display: "block" }}
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#888"
              strokeWidth="4"
              fill="none"
            />
            <line
              x1="30"
              y1="30"
              x2="70"
              y2="70"
              stroke="#888"
              strokeWidth="4"
            />
            <line
              x1="70"
              y1="30"
              x2="30"
              y2="70"
              stroke="#888"
              strokeWidth="4"
            />
            <path
              fill="none"
              stroke="#888"
              strokeWidth="4"
              d="M50 15C29.506 15 15 29.506 15 50s14.506 35 35 35 35-14.506 35-35S70.494 15 50 15z"
            />
          </svg>
          <p style={{ color: "#888" }}>Chúng tôi không tìm thấy kết quả nào!</p>
        </div>
      ) : (
        <PaginatedItems
          itemsPerPage={2}
          items={filteredAndSortedReservations}
          RenderComponent={InvoiceList}
        />
      )}
    </div>
  );
};

export default InvoicePage;
