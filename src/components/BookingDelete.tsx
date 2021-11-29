import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import restaurantApi from "../api/restaurantApi";
import { DeleteModal } from "../modals/DeleteModal";
import Booking from "../models/Booking";

type deleteParams = {
  id: string;
};

const initialBookingInfo: Booking = {
  BookingTime: "",
  NoOfPeople: 0,
  Email: "",
  Preferences: "",
  Name: "",
  Phone: "",
  BookedTableCount: 0,
};

const BookingDelete = () => {
  const { id } = useParams<deleteParams>();
  const history = useHistory();
  const [bookingInfo, setBookingInfo] = useState(initialBookingInfo);
  const [dataFetched, setDataFetched] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (dataFetched) {
      setShowDeleteModal(true);
    }
  }, [dataFetched]);

  const fetchData = async () => {
    const res = await restaurantApi.get<Booking | null>(`/booking/${id}`);
    setBookingInfo(res.data as Booking);
    setDataFetched(true);
  };

  const handleClose = () => {
    history.replace("/");
  };

  return (
    <div className="container">
      {bookingInfo ? (
        <div>
          <DeleteModal
            show={showDeleteModal}
            bookingId={id}
            onClose={handleClose}
          />
        </div>
      ) : (
        <p>Invalid reservation number!</p>
      )}
    </div>
  );
};

export default BookingDelete;
