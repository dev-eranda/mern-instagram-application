import React from "react";
import "./Dropdown.css";
import { Link, useLocation } from "react-router-dom";

interface dropdownProps {
  isOpen: boolean;
}

const Dropdown: React.FC<dropdownProps> = ({ isOpen }) => {
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div className={`dropdown-container ${isOpen ? "open" : ""}`}>
          <div className="user-details">
            <img alt="img" src="./avatar.svg" />
            <div className="user-text-section">
              <span className="user-name">Eranda Madusanka</span>
              <span className="online-status">online</span>
            </div>
          </div>
          <div className="dropdown-items">
            <Link to="/profile">Profile</Link>
            {/* <Link to="">Settings</Link> */}
            <Link to="/logout">Log out</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;
