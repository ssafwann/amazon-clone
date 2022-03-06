import React from "react";
import "../Footer.css";
import { Link } from "react-router-dom";

// ctrl + p to find file
function Footer() {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="footer">
      <div className="footer__button">
        <button className="totopbtn" onClick={goToTop}>
          Back to top
        </button>
      </div>
      <div className="footer__list">
        <div className="footer__column">
          <ul>
            <li>
              <span>Get to Know Us</span>
            </li>
            <li>Careers</li>
            <li>Blog</li>
            <li>About Amazon</li>
            <li>Investor Relations</li>
            <li>Amazon Devices</li>
            <li>Amazon Science</li>
          </ul>
        </div>

        <div className="footer__column">
          <ul>
            <li>
              <span>Make Money with Us</span>
            </li>
            <li>Sell products on Amazon</li>
            <li>Sell on Amazon Business</li>
            <li>Sell apps on Amazon</li>
            <li>Become an Affiliate</li>
            <li>Advertise Your Products</li>
            <li>Self-Publish with Us</li>
            <li>Host an Amazon Hub</li>
          </ul>
        </div>

        <div className="footer__column">
          <ul>
            <li>
              <span>Amazon Payment Products</span>
            </li>
            <li>Amazon Business Card</li>
            <li>Shop with Points</li>
            <li>Reload Your Balance</li>
            <li>Amazon Currency Converter</li>
          </ul>
        </div>

        <div className="footer__column">
          <ul>
            <li>
              <span>Let Us Help You</span>
            </li>
            <li>Amazon and COVID-19</li>
            <li>Your Account</li>
            <Link className="text-link" to="/orders">
              <li>Your Orders</li>
            </Link>
            <li>Shipping Rates &amp; Policies</li>
            <li>Returns &amp; Replacements</li>
            <li>Manage Your Content and Devices</li>
            <li>Amazon Assistant</li>
            <li>Help</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
