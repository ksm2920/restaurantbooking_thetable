import React, { useState } from "react";
import restaurantApi from "../api/restaurantApi";
import ErrorResponse from "../models/ErrorResponse";
import ContactForm from "./ContactForm";

const ContactPage = () => {
  const [isSent, setIsSent] = useState(false);

  const sendMail = (payload: any) => {
    restaurantApi
      .post<string | ErrorResponse>("/contact", { data: payload })
      .catch((error) => console.log("Error", error))
      .then((response) => {
        if (response) {
          setIsSent(true);
          console.log("Response data", response.data);
        }
      });
  };

  return <ContactForm post={sendMail} setIsSent={setIsSent} />;
};

export default ContactPage;
