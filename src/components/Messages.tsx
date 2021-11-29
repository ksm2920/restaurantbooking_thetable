import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import restaurantApi from "../api/restaurantApi";
import Contact from "../models/Contact";
import "./css/style.css";

export const Messages = () => {
  const [contacts, setContacts] = useState([] as Contact[]);
  const history = useHistory();

  const showMore = (contact: Contact) => {
    history.push("/message/" + `${contact.id}`);
  };

  let divTag = contacts
    .sort((a, b) => (a.IsRead ? 1 : -1))
    .map((contact) => {
      return (
        <div
          key={contact.id}
          className={`list ${contact.IsRead ? "isread" : "notread"}`}
        >
          <div>{contact.Name}</div>
          {contact.Message.length > 5 ? (
            contact.Message.substring(0, 5) + "..."
          ) : (
            <div>{contact.Message}</div>
          )}
          <button onClick={() => showMore(contact)}>read more</button>
        </div>
      );
    });

  const fetchData = async () => {
    console.log("### Contacts from DB");
    const response = await restaurantApi.post<Contact[]>("/contact_search", {
      data: contacts,
    });
    console.log("### Response is ", response);
    setContacts(response.data as Contact[]);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="back">
        <a href={"/admin"}>
          <i className="fas fa-chevron-left"></i> Messages
        </a>
      </div>
      <h2> Messages</h2>
      <div>{divTag}</div>
    </div>
  );
};
