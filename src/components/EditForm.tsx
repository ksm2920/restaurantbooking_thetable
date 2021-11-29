import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import restaurantApi from "../api/restaurantApi";
import Booking from "../models/Booking";
import ErrorResponse from "../models/ErrorResponse";
import SearchInfo from "../models/SearchInfo";
import SearchRequest from "../models/SearchRequest";
import Utilities from "../Utilities";
import "./css/style.css";

type editParams = {
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

const initialData: SearchInfo[] = [];

export const EditForm = () => {
  const { id } = useParams<editParams>();

  const [bookingInfo, setBookingInfo] = useState(initialBookingInfo);
  const [bookedDate, setBookedDate] = useState("");
  const [bookedTime, setBookedTime] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [disabledContact, setDisableContact] = useState(false);
  const [searchData, setSearchData] = useState(initialData);
  const [dataFetched, setDataFetched] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [errorNum, setErrorNum] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [notclick, setNotClick] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await restaurantApi.get<Booking | null>(`/booking/${id}`);
    let selectedBooking = res.data as Booking;
    setBookingInfo(selectedBooking);
    console.log(res.data);
    let date = new Date(selectedBooking.BookingTime);
    setBookedDate(date.toISOString().split("T")[0]);
    setBookedTime(date.toLocaleTimeString("sv-SE", { timeStyle: "short" }));
  };

  const searchTable = async () => {
    setNotClick(false);
    setDisableContact(false);
    if (!validate()) {
      return;
    }
    setHidden(true);
    let peopleCount = bookingInfo.NoOfPeople;
    console.log("Date value", bookedDate);
    console.log("People value", peopleCount);
    const payload: SearchRequest = {
      BookingDate: new Date(bookedDate),
      PeopleCount: peopleCount,
      CurrentBookingId: bookingInfo.id,
    };
    console.log("Payload", payload);
    const x = await restaurantApi.post<SearchInfo[]>("/search", {
      data: payload,
    });
    setSearchData(x.data as SearchInfo[]);
    setDataFetched(true);
    console.log("response data", x.data);
  };

  const saveData = async () => {
    console.log(bookingInfo);
    if (!validate()) {
      return;
    }
    await restaurantApi.put<Booking | ErrorResponse>("/booking", {
      data: bookingInfo,
    });
    history.push("/admin");
  };

  const onDateChange = (e: any) => {
    setBookedDate(e.target.value);
    validateDate();
  };

  const onNumberOfPeopleChange = (e: any) => {
    setBookingInfo({
      ...bookingInfo,
      NoOfPeople: Number.parseInt(e.target.value.toString()),
    });
  };

  const nameChanged = (e: any) => {
    const name = e.target.value.toString();
    setBookingInfo({ ...bookingInfo, Name: name });
  };

  const phoneChanged = (e: any) => {
    setBookingInfo({ ...bookingInfo, Phone: e.target.value.toString() });
  };

  const emailChanged = (e: any) => {
    const email = e.target.value.toString();
    setBookingInfo({ ...bookingInfo, Email: email });
  };

  const activate = () => {
    setDisabled(false);
    setNotClick(true);
    setDisableContact(true);
  };

  const openForm = (timeSlot: SearchInfo) => {
    bookingTime(timeSlot);
  };

  const validate = (): boolean => {
    let valid = true;
    if (isNaN(bookingInfo.NoOfPeople)) {
      setErrorNum(true);
      valid = false;
    } else {
      setErrorNum(false);
    }
    if (bookingInfo.Name === "") {
      setErrorName(true);
      valid = false;
    } else {
      setErrorName(false);
    }
    if (!Utilities.validateEmail(bookingInfo.Email)) {
      setErrorEmail(true);
      valid = false;
    } else {
      setErrorEmail(false);
    }
    return valid;
  };
  const validateDate = (): boolean => {
    let valid = true;
    if (!searchTable) {
      setNotClick(true);
      valid = false;
    } else {
      setNotClick(false);
    }
    return valid;
  };

  return (
    <div className="container">
      <div className="back">
        <a href={"/admin"}>
          <i className="fas fa-chevron-left back-arrow"></i> Edit form
        </a>
      </div>
      <div>
        <div>
          <p>
            Booking information
            <span className="edit" onClick={activate}>
              <i className="fas fa-pen"></i>
            </span>
          </p>
        </div>
        <input
          type="date"
          value={bookedDate}
          onChange={onDateChange}
          disabled={disabled}
        />
        <input
          type="number"
          placeholder="Number of people"
          value={bookingInfo.NoOfPeople}
          onChange={onNumberOfPeopleChange}
          disabled={disabled}
        />
        {errorNum ? (
          <p className="error">
            <i className="fas fa-exclamation-triangle"></i>Please enter number
            of people!
          </p>
        ) : (
          ""
        )}
        <input type="text" value={bookedTime} disabled hidden={hidden} />
        <div className="radio">
          {searchData.map((data, index) => (
            <div className="radio-btn" key={index}>
              <input
                type="radio"
                value={data.TimeSlotText}
                disabled={!data.IsTableAvailable}
                name="slot"
                onClick={() => openForm(data)}
              />
              <label>{data.TimeSlotText}</label>
              {!data.IsTableAvailable ? <span> (Full)</span> : ""}
            </div>
          ))}
        </div>
        <div>
          <button
            className="empty-btn"
            style={{ backgroundColor: "black" }}
            disabled={disabled}
            onClick={searchTable}
          >
            Check available tabels
          </button>
          {notclick ? (
            <p className="error">
              <i className="fas fa-exclamation-triangle"></i> Check available
              tabels first!{" "}
            </p>
          ) : (
            ""
          )}
        </div>
        <p>Contact information</p>
        <input
          type="text"
          placeholder="Name"
          value={bookingInfo.Name}
          onChange={nameChanged}
        />
        {errorName ? (
          <p className="error">
            <i className="fas fa-exclamation-triangle"></i>Please enter your
            name
          </p>
        ) : (
          ""
        )}
        <input
          type="text"
          placeholder="Mobile number"
          value={bookingInfo.Phone}
          onChange={phoneChanged}
        />
        <input
          type="text"
          placeholder="Email"
          value={bookingInfo.Email}
          onChange={emailChanged}
        />
        {errorEmail ? (
          <p className="error">
            <i className="fas fa-exclamation-triangle"></i>Please enter a valid
            email
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="modal-footer">
        <button
          onClick={saveData}
          className="empty-btn"
          disabled={disabledContact}
          style={{ backgroundColor: "black" }}
        >
          Save
        </button>
      </div>
    </div>
  );
  function bookingTime(slot: SearchInfo) {
    console.log("Changed Slot", slot);
    console.log(bookedDate);
    const dt = new Date(bookedDate.toString());
    let bookingTimeText = "";
    if (slot.TimeSlotIndex === 0) {
      bookingTimeText = new Date(new Date(dt).setHours(18, 0, 0, 0)).toString();
    } else if (slot.TimeSlotIndex === 1) {
      bookingTimeText = new Date(new Date(dt).setHours(21, 0, 0, 0)).toString();
    }
    console.log("Changed booking time", bookingTimeText);
    setBookingInfo({ ...bookingInfo, BookingTime: bookingTimeText });
  }
};
