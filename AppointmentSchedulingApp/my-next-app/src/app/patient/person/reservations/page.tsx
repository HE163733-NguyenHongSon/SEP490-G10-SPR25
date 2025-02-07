'use client'
import FilterButtonList from "../../../../components/common/FilterButtonList";
import ReservationService from "../../../../services/reservationService";
import { useEffect, useState } from "react";
import PaginatedItems from "../../../../components/common/PaginatedItems";
import ReservationList from "../../../../components/patient/ReservationList";
import SelectSort from "../../../../components/common/SelectSort";

const ReservationPage = () => {
  const [status, setStatus] = useState("pending");
  const [sortBy, setSortBy] = useState("price_asc");
  const [statusList, setStatusList] = useState<Status[]>([]);
  const [reservationList, setReservationList] = useState<Reservation[]>([]);

  const sortOptions: SortOption[] = [
    { label: "Upcoming appointment", value: "upcoming_appointment" },
    { label: "Past appointment", value: "past_appointment" },
    { label: "Service price ascending", value: "price_asc" },
    { label: "Service price descending", value: "price_desc" },
  ];
  // useEffect(() => {
  //   const fetchReservations = async () => {
  //     const reservations =
  //       await ReservationService.getListReservationByStatusAndSort(
  //         status,
  //         sortBy
  //       );
  //     setReservationList(reservations);
  //     console.log(reservations);
  //   };
  //   fetchReservations();
  // }, [status, sortBy]);

  useEffect(() => {
    const fetchDate = async () => {
      const [reservations, ...statuses] = await Promise.all([
        ReservationService.getListReservationByStatusAndSort(status, sortBy),
        ReservationService.getReservationCountByStatus("Pending"),
        ReservationService.getReservationCountByStatus("Confirmed"),
        ReservationService.getReservationCountByStatus("Completed"),
        ReservationService.getReservationCountByStatus("No-show"),
        ReservationService.getReservationCountByStatus("Cancelled"),
      ]);
      setStatusList(statuses);
      setReservationList(reservations);
    };
    fetchDate();
  }, [status, sortBy]);
  return (
    <div className="p-4 ">
      <h1 className="text-xl font-bold mb-4">Reservations</h1>
      <div className="flex flex-row">
        <SelectSort
          options={sortOptions}
          onSortChange={(value) => setSortBy(value)}
        />
        <FilterButtonList
          itemList={statusList}
          onFilterSelect={(value) => setStatus(value)}
        />

      </div>
      <PaginatedItems
        itemsPerPage={4}
        items={reservationList}
        renderItems={(currentItems) =>
          currentItems.length > 0 ? (
            <ReservationList reservationList={currentItems as Reservation[]} />
          ) : (
            <p>Loading </p>
          )
        }
      />
    </div>
  );
};

export default ReservationPage;
