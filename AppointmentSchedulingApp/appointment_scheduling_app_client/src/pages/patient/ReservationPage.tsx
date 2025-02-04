import React from "react";
import ReservationList from "../../components/patient/ReservationList";
import StatusButtonList from "../../components/patient/StatusButtonList";
import ReservationService from "../../services/ReservationService";
import { useEffect, useState } from "react";
import PaginatedItems from "../../components/common/PaginatedItems ";
const ReservationPage = () => {
  const [reservationList, setReservationList] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const reservations = await ReservationService.getAllReservations();
      setReservationList(reservations);
      console.log(reservations);
    };
    fetchReservations();
  }, []);
  return (
    <div className="p-4 ">
      <h1 className="text-xl font-bold mb-4">Reservations</h1>

      <StatusButtonList
        statusList={[
          { name: "Pending", number: 4 },
          { name: "Confirm", number: 8 },
          { name: "Complete", number: 12 },
          { name: "No show", number: 2 },
          { name: "Cancel", number: 6 },
        ]}
      />
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
