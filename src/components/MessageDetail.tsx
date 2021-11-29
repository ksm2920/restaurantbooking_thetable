import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import restaurantApi from "../api/restaurantApi";
import Contact from "../models/Contact";
import ErrorResponse from "../models/ErrorResponse";

type detailParams = {
  id: string;
};

const initialContact: Contact = {
  Email: "",
  Message: "",
  Name: "",
  IsRead: false,
};

export const MessageDetail = () => {
  const { id } = useParams<detailParams>();
  const [contactDetail, setContactDetail] = useState(initialContact);

  useEffect(() => {
    setAsReadMessage();
  }, [id]);

  const setAsReadMessage = async () => {
    let res = await restaurantApi.get<Contact | null>(`/contact/${id}`);
    let selectedContact = res.data as Contact;
    setContactDetail(selectedContact);
    console.log("### messageDetail is", selectedContact);
    const updates = {
      ...selectedContact,
      IsRead: true,
    };
    await restaurantApi.put<Contact | ErrorResponse>("/contact", {
      data: updates,
    });
    setContactDetail(updates);
    console.log("### SetAsRead is", updates);
  };

  return (
    <div className="container">
      <div className="back">
        <a href={"/message"}>
          <i className="fas fa-chevron-left back-arrow"></i> Message detail
        </a>
      </div>
      <div className="detail">
        <p>
          From: {contactDetail.Name}
          <i className="fas fa-angle-left arrow"></i>
          {contactDetail.Email}
          <i className="fas fa-angle-right arrow"></i>
        </p>
        <p>Message: </p>
        <p className="text-box">{contactDetail.Message}</p>
      </div>
    </div>
  );
};
