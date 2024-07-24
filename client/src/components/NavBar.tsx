import React from "react";
import classNames from "classnames";
import "./NavBar.css";

interface navbarProps {
  mobileNav: boolean;
}

const NavBar: React.FC<navbarProps> = ({ mobileNav }) => {
  return (
    <div id="navbar" className={`side-bar ${mobileNav ? "open" : "close"}`}>
      <div className="user-section">
        <img alt="avatar" src="./logo512.png" />
        <div className="user-details">
          <h2>Eranda Samarasinghe</h2>
          <span>online</span>
        </div>
      </div>
      <hr />
      <div className="nav-menu">
        <div className="nav-item select">Posts</div>
        <div className="nav-item">Profile</div>
        <div className="nav-item">Settings</div>
      </div>
      <div className="log-out">
        <span>logout</span>
        <img className="log-out-icon" alt="avatar" src="./logo512.png" />
      </div>
    </div>
  );
};

export default NavBar;
