import React from "react";
import ReservationList from "../../components/patient/ReservationList";
import StatusButtonList from "../../components/patient/StatusButtonList";
import ReservationService from "../../services/ReservationService";
import { useEffect, useState } from "react";
import PaginatedItems from "../../components/common/PaginatedItems ";

interface Status {
  name: string;
  number: number;
}

const ReservationPage = () => {
  const [reservationList, setReservationList] = useState([]);
  const [status, setStatus] = useState("pending");
  const [sortBy, setSortBy] = useState("price_asc");
  const [statusList, setStatusList] = useState<Status[]>([]);
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
    const fetchReservationNumbersByStatus = async () => {
      const [reservation,...statuses] = await Promise.all([
                 ReservationService.getListReservationByStatusAndSort(

        ReservationService.getReservationCountByStatus("Pending"),
        ReservationService.getReservationCountByStatus("Confirmed"),
        ReservationService.getReservationCountByStatus("Completed"),
        ReservationService.getReservationCountByStatus("No-show"),
        ReservationService.getReservationCountByStatus("Cancelled"),
      ]);
      setStatusList(res);
    };
    fetchReservationNumbersByStatus();
  }, []);
  return (
    <div className="p-4 ">
      <h1 className="text-xl font-bold mb-4">Reservations</h1>
      <StatusButtonList statusList={statusList} />
      <PaginatedItems
        itemsPerPage={4}
        items={reservationList}
        renderItems={(currentItems) =>
          currentItems.length > 0 ? (
            <ReservationList reservationList={currentItems} />
          ) : (
            <p>No reservations available</p>
          )
        }
      />
    </div>
  );
};

export default ReservationPage;
