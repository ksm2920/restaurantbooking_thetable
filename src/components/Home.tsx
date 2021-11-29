import "./css/home.css";
import Table_logo from "./assets/The_Table_logo.png";

export const Home = () => {
  return (
    <div className="home">
      <div className="logo">
        <img src={Table_logo} alt="restaurant-logo" className="logo-img"></img>
      </div>
      <div className="bookingLink">
        <a href="/booking">
          <h1 id="book">
            <span>BOOK </span>
            <span id="table"> YOUR TABLE </span>
            <span id="here"> HERE </span>
          </h1>
        </a>
      </div>
      <div className="links">
        <div>
          <a href="/contact">
            Contact us <i className="fas fa-chevron-down"></i>
          </a>
        </div>
        <div>
          <a href="/admin">
            Admin <i className="fas fa-chevron-down"></i>
          </a>
        </div>
      </div>
    </div>
  );
};
