import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import MyBookingSearch from "./components/MyBookingSearch";
import ContactPage from "./components/ContactPage";
import BookingDelete from "./components/BookingDelete";
import { AdminPage } from "./components/AdminPage";
import { NotFound } from "./components/NotFound";
import { Home } from "./components/Home";
import { EditForm } from "./components/EditForm";
import { Messages } from "./components/Messages";
import { MessageDetail } from "./components/MessageDetail";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/booking" component={MyBookingSearch} />
        <Route exact path="/search" component={MyBookingSearch} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/cancel/:id" component={BookingDelete} />
        <Route exact path="/admin" component={AdminPage} />
        <Route exact path="/edit/:id" component={EditForm} />
        <Route exact path="/message" component={Messages} />
        <Route exact path="/message/:id" component={MessageDetail} />
        <Route exact path="/*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
