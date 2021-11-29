import restaurantApi from "../api/restaurantApi";
import Booking from "../models/Booking";
import ErrorResponse from "../models/ErrorResponse";
import "./css/modal_style.css";

interface ModalProps {
  onClose: () => void;
  show: boolean;
  bookingId: string | undefined;
}
export const DeleteModal: React.FC<ModalProps> = ({
  onClose,
  show,
  bookingId,
}) => {
  if (!show) {
    return null;
  }

  const deleteBooking = async () => {
    console.log("delete booking" + bookingId);
    await restaurantApi.delete<Booking | ErrorResponse>(
      `/booking/${bookingId}`
    );
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title">Delete reservation</h1>
        </div>
        <div className="modal-body">
          <h3>Delete selected reservation?</h3>
          <p> Booking no.: {bookingId}</p>
        </div>
        <div className="modal-footer">
          <button onClick={deleteBooking} className="full-btn">
            Yes
          </button>
          <button onClick={onClose} className="empty-btn">
            No
          </button>
        </div>
        <button onClick={onClose} className="close-icon">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};
