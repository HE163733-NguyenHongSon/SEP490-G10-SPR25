"use client";
import FilterButtonList from "../../../../components/common/FilterButtonList";
import reservationService from "../../../../services/reservationService";
import PaginatedItems from "../../../../components/common/PaginatedItems";
import ReservationList from "../../../../components/patient/ReservationList";
import SelectSort from "../../../../components/common/SelectSort";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LoadingTable } from "../../../../components/common/LoadingTable";
const ReservationPage = () => {
  const [status, setStatus] = useState("Pending");
  const [sortBy, setSortBy] = useState("recent_appointment");

  const sortOptions: ISortOption[] = [
    { label: "Recent appointment", value: "recent_appointment" },
    { label: "Past appointment", value: "past_appointment" },
    { label: "Service price ascending", value: "price_asc" },
    { label: "Service price descending", value: "price_desc" },
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
        reservationService.getReservationCountByStatus("Pending"),
        reservationService.getReservationCountByStatus("Confirmed"),
        reservationService.getReservationCountByStatus("Completed"),
        reservationService.getReservationCountByStatus("No-show"),
        reservationService.getReservationCountByStatus("Cancelled"),
      ]);
      return statuses;
    },
    staleTime: 30000,
  });
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Reservations</h1>
      <div className="flex flex-row items-center justify-center  ">
        {isLoadingReservations || isLoadingStatus ? (
          <p>Loading...</p>
        ) : (
          <SelectSort
            options={sortOptions}
            onSortChange={(value) => setSortBy(value)}
            selectedOption={sortBy}
          />
        )}
        <FilterButtonList
          itemList={statusList}
          onFilterSelect={(value) => setStatus(value)}
          selectedItem={status}
        />
      </div>

      {isLoadingReservations || isLoadingStatus ? (
        <LoadingTable />
      ) : reservationError || statusError ? (
        <p>Error loading data</p>
      ) : (
        <PaginatedItems
          itemsPerPage={4}
          items={reservationList}
          renderItems={(currentItems) =>
            currentItems.length > 0 ? (
              <ReservationList
                reservationList={currentItems as IReservations}
              />
            ) : (
              <p>No reservations found.</p>
            )
          }
        />
      )}
    </div>
  );
};

export default ReservationPage;
