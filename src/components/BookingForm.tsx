import React, { useState, useEffect } from "react";
import restaurantApi from "../api/restaurantApi";
import { ConfirmationModal } from "../modals/ComfirmationModal";
import Booking from "../models/Booking";
import ErrorResponse from "../models/ErrorResponse";
import Utilities from "../Utilities";
import "./css/style.css";

const initialBookingInfo: Booking = {
  BookingTime: "",
  NoOfPeople: 0,
  Email: "",
  Preferences: "",
  Name: "",
  Phone: "",
  BookedTableCount: 0,
};

const BookingForm = (props: any) => {
  const [bookingInfo, setBookingInfo] = useState(initialBookingInfo);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [gdprChecked, setGdprChecked] = useState(false);

  useEffect(() => {
    const dt = new Date(props.bookingDate);
    let bookingTimeText = "";
    if (props.slot.TimeSlotIndex === 0) {
      bookingTimeText = new Date(new Date(dt).setHours(18, 0, 0, 0)).toString();
    } else if (props.slot.TimeSlotIndex === 1) {
      bookingTimeText = new Date(new Date(dt).setHours(21, 0, 0, 0)).toString();
    }
    setBookingInfo({
      ...bookingInfo,
      BookingTime: bookingTimeText,
      NoOfPeople: props.peopleCount,
    });
  }, [props]);

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

  const validate = (): boolean => {
    let valid = true;
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

  const saveData = async (e: any) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    const x = await restaurantApi.post<string | ErrorResponse>("/booking", {
      data: bookingInfo,
    });
    console.log("response data", x.data);
    console.log("response data type", typeof x.data);
    let err: ErrorResponse = {
      Code: "",
      Message: "",
    };
    let dType = typeof x.data;
    if (dType === "string") {
      setBookingInfo({ ...bookingInfo, id: x.data as string });
      setShowConfirmation(true);
    } else {
      err = x.data as ErrorResponse;
    }

    if (props.onSave) {
      props.onSave(err, bookingInfo);
    }
  };

  return (
    <div>
      <form>
        <h3>Booking Form</h3>
        <input disabled type="text" value={props.bookingDate}></input>
        <input disabled type="text" value={props.slot.TimeSlotText}></input>
        <input disabled type="text" value={props.peopleCount}></input>
        <h3>Contact Info</h3>
        <input type="text" placeholder="Name" onChange={nameChanged}></input>
        {errorName ? (
          <p className="error">
            <i className="fas fa-exclamation-triangle"></i> Please enter your
            name
          </p>
        ) : (
          ""
        )}
        <input type="text" placeholder="Phone" onChange={phoneChanged}></input>
        <input type="email" placeholder="Email" onChange={emailChanged}></input>
        {errorEmail ? (
          <p className="error">
            <i className="fas fa-exclamation-triangle"></i> Please enter a valid
            email
          </p>
        ) : (
          ""
        )}
        <div style={{ padding: "20px" }}>
          <input
            type="checkbox"
            id="info"
            name="info"
            checked={gdprChecked}
            style={{ width: "5%" }}
            onChange={() => setGdprChecked(!gdprChecked)}
          />
          <label htmlFor="info">
            We use your info for better customer experience
          </label>
        </div>
        <div>
          <button
            className="full-btn"
            disabled={!gdprChecked}
            onClick={saveData}
          >
            Book
          </button>
        </div>
      </form>
      <ConfirmationModal
        onClose={() => setShowConfirmation(false)}
        show={showConfirmation}
        props={bookingInfo}
      />
    </div>
  );
};

export default BookingForm;
