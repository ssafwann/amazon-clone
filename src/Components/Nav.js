import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "../Nav.css";
function Nav() {
  return (
    <div className="nav">
      {/* Nav Menu */}
      <div className="nav__menu">
        <span>
          <MenuIcon className="nav__menuIcon" />
          <span>
            <strong>All</strong>
          </span>
        </span>
      </div>

      {/* Nav List*/}
      <div className="nav__list">
        <ul>
          <li>
            <span>Today's Deals</span>
          </li>
          <li>
            <span>Customer Service</span>
          </li>
          <li>
            <span>Buy Again</span>
          </li>
          <li>
            <span>Browsing History</span>
          </li>
          <li>
            <span>Amazon.com</span>
          </li>
          <li>
            <span>Gift Cards</span>
          </li>
        </ul>
      </div>

      <div className="nav__right">
        <span>Get Free Shipping</span>
      </div>
    </div>
  );
}

export default Nav;
