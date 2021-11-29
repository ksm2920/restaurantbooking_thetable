import { useHistory } from "react-router-dom";
import Booking from "../models/Booking";
import "./css/modal_style.css";

interface ModalProps {
  onClose: () => void;
  show: boolean;
  props: Booking;
}

export const ConfirmationModal: React.FC<ModalProps> = ({
  onClose,
  show,
  props,
}) => {
  const history = useHistory();
  if (!show) {
    return null;
  }

  let date = new Date(props.BookingTime);
  let bookedDate = date.toISOString().split("T")[0];
  let bookedTime = date.toLocaleTimeString("sv-SE", { timeStyle: "short" });

  const routeChange = () => {
    history.push("/");
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title">Thank you {props.Name}</h1>
          <p>Your reservation has been confirmed</p>
        </div>
        <div className="modal-body">
          <p>Reservation number</p>
          <p>{props.id}</p>
          <p>
            Date: <span> {bookedDate}</span>
          </p>
          <p>
            Time: <span> {bookedTime}</span>
          </p>
          <p>
            Number of people: <span> {props.NoOfPeople}</span>
          </p>
          {/* <p>Preference: <span> {props.Preferences}</span></p> */}
        </div>
        <button onClick={routeChange} className="empty-btn">
          <b>GOT IT</b>
        </button>
        <div className="modal-footer">
          <p>Your reservation request confirmation was sent to {props.Email}</p>
          <p>
            Questions? Go to<a href="/contact"> Contact us</a>
          </p>
        </div>
        <button onClick={routeChange} className="close-icon">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};
