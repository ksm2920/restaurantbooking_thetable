import { useHistory } from "react-router-dom";
import React from "react";
import "./css/modal_style.css";

interface ModalProps {
  onClose: () => void;
  show: boolean;
}
export const MsgRecievedModal: React.FC<ModalProps> = ({ onClose, show }) => {
  const history = useHistory();
  if (!show) {
    return null;
  }

  const routeChange = () => {
    history.push("/");
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h1
            className="modal-title"
            style={{ fontSize: "80px", marginBottom: "0" }}
          >
            <i className="fas fa-check-circle"></i>
          </h1>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: "35px", marginTop: "0" }}>
            Your Message was sent successfully. Thanks.
          </p>
          <button onClick={routeChange} className="full-btn">
            OK
          </button>
        </div>
        <div className="modal-footer"></div>
        <button onClick={routeChange} className="close-icon">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};
