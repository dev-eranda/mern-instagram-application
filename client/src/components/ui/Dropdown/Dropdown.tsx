import React from "react";
import "./Dropdown.css";

interface dropdownProps {
  isOpen: boolean;
}

const Dropdown: React.FC<dropdownProps> = ({ isOpen }) => {
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
            <div className="item">Profile</div>
            <div className="item">Settings</div>
            <div className="item">Log out</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;
