"use client";
import FilterButtonList from "@/components/FilterButtonList";
import reservationService from "@/services/reservationService";
import PaginatedItems from "@/components/PaginatedItems";
import ReservationList from "../../components/ReservationList";
import SelectSort from "@/components/SelectSort";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LoadingTable } from "@/components/LoadingTable";
import { useSearchParams } from "next/navigation";
const ReservationPage = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Pending");
  const sortBy = searchParams.get("sortBy") || "recent_appointment";
  // const [sortBy, setSortBy] = useState(
  //   searchParams.get("sortBy") || "recent_appointment"
  // );

  const sortOptions: ISortOption[] = [
    { label: "Cuộc hẹn gần đây", value: "recent_appointment" },
    { label: "Cuộc hẹn đã qua", value: "past_appointment" },
    { label: "Giá dịch vụ tăng dần", value: "price_asc" },
    { label: "Giá dịch vụ giảm dần", value: "price_desc" },
];


  const {
    data: reservationList = [],
    isLoading: isLoadingReservations,
    error: reservationError,
    fetchStatus,
  } = useQuery({
    queryKey: ["reservations", status, sortBy],
    queryFn: () =>
      reservationService.getListReservationByStatusAndSort(status, sortBy),
    staleTime: 30000,
  });
  console.log(fetchStatus);

  const {
    data: statusList = [],
    isLoading: isLoadingStatus,
    error: statusError,
  } = useQuery({
    queryKey: ["statusList"],
    queryFn: async () => {
      const statuses = await Promise.all([
        reservationService.getReservationCountByStatus("Đang chờ"),
        reservationService.getReservationCountByStatus("Xác nhận"),
        reservationService.getReservationCountByStatus("Hoàn thành"),
        reservationService.getReservationCountByStatus("Không đến"),
        reservationService.getReservationCountByStatus("Đã hủy"),
      ]);
      return statuses;
    },
    staleTime: 30000,
  });
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Reservations</h1>
      <div className="flex flex-row items-center justify-center gap-3  ">
        {isLoadingReservations || isLoadingStatus ? (
          <p>Loading...</p>
        ) : (
          <>
            <SelectSort
              options={sortOptions}
              path="/patient/person/reservations"
              initialSelectedValue="recent_appointment"
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
          RenderComponent={ReservationList}
        />
      )}
    </div>
  );
};

export default ReservationPage;
