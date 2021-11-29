import { useState } from "react";
import { MsgRecievedModal } from "../modals/MsgRecievedModal";
import Utilities from "../Utilities";
import "./css/style.css";

interface ContactFormProps {
  setIsSent?: any;
  post(payload: any): any;
}

const ContactForm = (props: ContactFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showMsgRecievedModal, setShowMsgRecievedModal] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  function handleNameChange(event: any) {
    setName(event.target.value);
  }

  function handleEmailChange(event: any) {
    setEmail(event.target.value);
  }

  function handleMessageChange(event: any) {
    setMessage(event.target.value);
  }

  const validate = (): boolean => {
    let valid = true;
    if (name === "") {
      setErrorName(true);
      valid = false;
    } else {
      setErrorName(false);
    }
    if (!Utilities.validateEmail(email)) {
      setErrorEmail(true);
      valid = false;
    } else {
      setErrorEmail(false);
    }
    if (message === "") {
      setErrorMessage(true);
      valid = false;
    } else {
      setErrorMessage(false);
    }
    return valid;
  };
  async function handleSubmit() {
    if (!validate()) {
      return;
    }
    const payload = {
      Name: name,
      Email: email,
      Message: message,
    };

    await props.post(payload);
    setShowMsgRecievedModal(true);
  }

  return (
    <div className="container">
      <div className="back">
        <a href={"/"} data-testid="admin">
          <i className="fas fa-chevron-left"></i> Contac us
        </a>
      </div>
      <p>Please Contact Us Using the Form Below</p>
      <form>
        <div>
          <input
            type="text"
            value={name}
            placeholder="Name"
            required
            onChange={handleNameChange}
          />
        </div>
        {errorName ? (
          <p className="error">
            <i className="fas fa-exclamation-triangle"></i> Please enter your
            name
          </p>
        ) : (
          ""
        )}
        <div>
          <input
            type="email"
            value={email}
            placeholder="Email"
            required
            onChange={handleEmailChange}
          />
        </div>
        {errorEmail ? (
          <p className="error">
            <i className="fas fa-exclamation-triangle"></i> Please enter a valid
            email
          </p>
        ) : (
          ""
        )}
        <div>
          <input
            type="text"
            value={message}
            placeholder="Message"
            required
            onChange={handleMessageChange}
          />
        </div>
        {errorMessage ? (
          <p className="error">
            <i className="fas fa-exclamation-triangle"></i> Please enter a
            Message
          </p>
        ) : (
          ""
        )}

        <button className="full-btn" type="button" onClick={handleSubmit}>
          Send
        </button>
      </form>

      <MsgRecievedModal
        onClose={() => setShowMsgRecievedModal(false)}
        show={showMsgRecievedModal}
      />
    </div>
  );
};

export default ContactForm;
