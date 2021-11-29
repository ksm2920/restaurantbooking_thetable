import { useEffect, useState } from "react";
import restaurantApi from "../api/restaurantApi";
import { DeleteModal } from "../modals/DeleteModal";
import Booking from "../models/Booking";
import { useHistory } from "react-router-dom";
import Contact from "../models/Contact";
import "./css/style.css";
import "./css/preloader.css";

export const AdminPage = () => {
  let dateNow = new Date().toDateString();
  const history = useHistory();
  const [bookings, setBookings] = useState([] as Booking[]);
  const [contacts, setContacts] = useState([] as Contact[]);
  const [date, setDate] = useState(dateNow);
  const [loading] = useState(false);
  const [completed, setcompleted] = useState(false);
  const [deleteBookingId, setDeleteBookingId] = useState<string>();

  let currentDate = new Date(date);
  let numberOfMlSeconds = currentDate.getTime();
  let dayToMlSeconds = 24 * 60 * 60 * 1000;
  let previousDate = new Date(
    numberOfMlSeconds - dayToMlSeconds
  ).toDateString();
  let nextDate = new Date(numberOfMlSeconds + dayToMlSeconds).toDateString();
  let totalNoOfPeople = bookings.reduce(
    (acc, curr) => acc + curr.NoOfPeople,
    0
  );

  const fetchData = async () => {
    console.log("### bookings from DB");
    setTimeout(async () => {
      const response = await restaurantApi.post<Booking[]>("/admin_search", {
        data: date,
      });
      const rs = await restaurantApi.post<Contact[]>("/contact_search", {
        data: contacts,
      });
      console.log("### Response is ", response);
      setBookings(response.data as Booking[]);
      setContacts(rs.data as Contact[]);
      setcompleted(true);
    }, 1000);
  };

  useEffect(() => {
    console.log("AdminPage.useEffect called");
    fetchData();
    console.log(bookings);
  }, [date]);

  const getEditForm = (booking: Booking) => {
    history.push("/edit/" + `${booking.id}`);
  };

  const routeChange = () => {
    history.push("/search");
  };

  function onDeleteDone() {
    setDeleteBookingId(undefined);
    fetchData();
  }

  function dateStringToTime(datestr: string) {
    let date = new Date(datestr);
    return date.toLocaleTimeString("sv-SE", { timeStyle: "short" });
  }

  let divTag = bookings.map((booking) => {
    return (
      <div key={booking.id} className="list" data-testid="booking">
        <div>{dateStringToTime(booking.BookingTime)}</div>
        <div>
          <i className="fas fa-user-friends guest"></i>
          {booking.NoOfPeople}
        </div>
        <div>{booking.Name}</div>
        <div className="buttons">
          <button onClick={() => getEditForm(booking)} className="edit-icon">
            <i className="fas fa-pen"></i>
          </button>
          <button
            onClick={() => setDeleteBookingId(booking.id)}
            className="delete-icon"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    );
  });

  let unreadCount = contacts.filter((c) => !c.IsRead).length;
  return (
    <div className="container">
      <div className="back">
        <a href={"/"} data-testid="admin">
          <i className="fas fa-chevron-left"></i> Admin
        </a>
      </div>
      <div>
        <h2>
          {date}
          <button
            onClick={() => setDate(previousDate)}
            disabled={date === dateNow}
            className="decrease"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={() => setDate(nextDate)}
            className="increase"
            data-testid="increment"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </h2>
      </div>
      <p className="total">
        Total: {bookings.length} bookings and {totalNoOfPeople} people
        <a href="/message" className="notification">
          <span>
            <i className="fas fa-envelope envelope"></i>
          </span>
          {unreadCount === 0 ? (
            <span className="badge">0</span>
          ) : (
            <span className="badge">{unreadCount}</span>
          )}
        </a>
      </p>
      <div className="add">
        <button
          onClick={routeChange}
          className="add-icon"
          data-testid="add-btn"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
      {!completed ? (
        <>
          {!loading ? (
            <div className="wrap">
              <div className="loading">
                <div className="bounceball"></div>
                <div className="text">NOW LOADING</div>
              </div>
            </div>
          ) : (
            <div className="completed">&#x2713;</div>
          )}
        </>
      ) : (
        <div>{divTag}</div>
      )}
      <DeleteModal
        onClose={onDeleteDone}
        show={deleteBookingId ? true : false}
        bookingId={deleteBookingId!}
      />
    </div>
  );
};
