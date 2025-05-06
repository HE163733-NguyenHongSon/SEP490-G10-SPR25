"use client";
import FilterButtonList from "@/common/components/FilterButtonList";
import reservationService from "@/common/services/reservationService";
import PaginatedItems from "@/common/components/PaginatedItems";
import ReservationList from "./components/ReservationList";
import SelectSort from "@/common/components/SelectSort";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { LoadingTable } from "@/common/components/LoadingTable";
import { useSearchParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@/common/contexts/UserContext";

const ReservationPage = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Đang chờ");
  const sortBy = searchParams.get("sortBy") || "Cuộc hẹn gần đây";
  const [patientId, setPatientId] = useState<string>("1");
  const queryClient = useQueryClient();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setPatientId(user?.userId || "1");
    }
  }, [user]);

  const sortOptions: ISortOption[] = [
    { label: "Cuộc hẹn gần đây", value: "Cuộc hẹn gần đây" },
    { label: "Cuộc hẹn đã qua", value: "Cuộc hẹn đã qua" },
    { label: "Giá dịch vụ tăng dần", value: "Giá dịch vụ tăng dần" },
    { label: "Giá dịch vụ giảm dần", value: "Giá dịch vụ giảm dần" },
  ];

  const { data: reservationList = [], isLoading: isLoadingReservations } =
    useQuery({
      queryKey: ["reservations", patientId, status, sortBy],
      queryFn: async (): Promise<IReservation[]> => {
        const result = await reservationService.getListReservationByFilter(
          patientId,
          status,
          sortBy
        );

        return result;
      },
      staleTime: 0,
    });

  const { data: statusList = [], isLoading: isLoadingStatus } = useQuery({
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
    staleTime: 0,
  });

  const handleCancelSuccess = async () => {
    try {
      toast.success("Hủy đặt chỗ  đang xử lý!", {
        position: "top-right",
        autoClose: 3000,
        style: { marginTop: "4rem" },
      });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["reservations", patientId, status, sortBy],
        }),
        queryClient.invalidateQueries({ queryKey: ["statusList"] }),
      ]);
    } catch {
      toast.error("Có lỗi khi cập nhật dữ liệu");
    }
  };
  const handleCancelFailed = (error: { message: string }) => {
    toast.error(error?.message, {
      position: "top-right",
      autoClose: 3000,
      style: { marginTop: "4rem" },
    });
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
        ) : (
          <PaginatedItems
            itemsPerPage={4}
            items={reservationList}
            RenderComponent={(props) => (
              <ReservationList
                {...props}
                onCancelSuccess={handleCancelSuccess}
                onCancelFailed={(error) => handleCancelFailed(error)}
              />
            )}
          />
        )}
      </div>
    </>
  );
};

export default ReservationPage;
