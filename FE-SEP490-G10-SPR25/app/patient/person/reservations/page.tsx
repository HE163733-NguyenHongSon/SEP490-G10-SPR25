"use client";
import FilterButtonList from "@/components/FilterButtonList";
import reservationService from "@/services/reservationService";
import PaginatedItems from "@/components/PaginatedItems";
import ReservationList from "../../components/ReservationList";
import SelectSort from "@/components/SelectSort";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { LoadingTable } from "@/components/LoadingTable";
import { useSearchParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReservationPage = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Đang chờ");
  const sortBy = searchParams.get("sortBy") || "Cuộc hẹn gần đây";
  const [patientId, setPatientId] = useState<string>("1");
  const queryClient = useQueryClient();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser) as IUser;
      setPatientId(user?.userId);
    }
  }, []);

  const sortOptions: ISortOption[] = [
    { label: "Cuộc hẹn gần đây", value: "Cuộc hẹn gần đây" },
    { label: "Cuộc hẹn đã qua", value: "Cuộc hẹn đã qua" },
    { label: "Giá dịch vụ tăng dần", value: "Giá dịch vụ tăng dần" },
    { label: "Giá dịch vụ giảm dần", value: "Giá dịch vụ giảm dần" },
  ];

  const {
    data: reservationList = [],
    isLoading: isLoadingReservations,
    error: reservationError,
  } = useQuery({
    queryKey: ["reservations", patientId, status, sortBy],
    queryFn: async (): Promise<IReservation[]> => {
      const result = await reservationService.getListReservationByFilter(
        patientId,
        status,
        sortBy
      );

      return result;
    },
    staleTime: 30000,
  });

  const {
    data: statusList = [],
    isLoading: isLoadingStatus,
    error: statusError,
  } = useQuery({
    queryKey: ["statusList"],
    queryFn: async () => {
      const statuses = await Promise.all([
        reservationService.getNumberOfReservationsByPatientIdAndStatus(
          patientId,
          "Đang chờ"
        ),
        reservationService.getNumberOfReservationsByPatientIdAndStatus(
          patientId,
          "Xác nhận"
        ),
        reservationService.getNumberOfReservationsByPatientIdAndStatus(
          patientId,
          "Hoàn thành"
        ),
        reservationService.getNumberOfReservationsByPatientIdAndStatus(
          patientId,
          "Không đến"
        ),
        reservationService.getNumberOfReservationsByPatientIdAndStatus(
          patientId,
          "Đã hủy"
        ),
      ]);
      return statuses;
    },
    staleTime: 30000,
  });

  // Thêm hàm xử lý khi hủy thành công
  const handleCancelSuccess = async (reservationId: string) => {
    try {
      // 1. Hiển thị thông báo
      toast.success("Hủy đặt chỗ  thành công!", {
        position: "top-right",
        autoClose: 3000,
        style: { marginTop: "4rem" },
      });

      // 2. Làm mới toàn bộ dữ liệu
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["reservations", patientId, status, sortBy],
        }),
        queryClient.invalidateQueries({ queryKey: ["statusList"] }),
      ]);
    } catch (error) {
      toast.error("Có lỗi khi cập nhật dữ liệu");
      console.error("Update error:", error);
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {reservationList.length === 0 ? (
        <div>
          <p>Bệnh nhân chưa có lịch hẹn</p>
        </div>
      ) : (
        <div className="p-4 my-5">
          <div className="flex flex-row items-center justify-center gap-3  ">
            {isLoadingReservations || isLoadingStatus ? (
              <p>Loading...</p>
            ) : (
              <>
                <SelectSort
                  options={sortOptions}
                  path="/patient/person/reservations"
                  initialSelectedValue="Cuộc hẹn gần đây"
                />
                <FilterButtonList
                  itemList={statusList}
                  onFilterSelect={(value) => setStatus(value)}
                  selectedItem={status}
                />
              </>
            )}
          </div>

          {isLoadingReservations || isLoadingStatus ? (
            <LoadingTable />
          ) : reservationError || statusError ? (
            <p>Error loading data</p>
          ) : (
            <PaginatedItems
              itemsPerPage={4}
              items={reservationList}
              RenderComponent={(props) => (
                <ReservationList
                  {...props}
                  onCancelSuccess={handleCancelSuccess}
                />
              )}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ReservationPage;
