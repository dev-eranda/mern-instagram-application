import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../slices/globalSlice";
import classNames from "classnames";
import { RootState } from "../types";
import "./NavBar.css";

interface navbarProps {
  mobileNav: boolean;
}

const NavBar: React.FC<navbarProps> = ({ mobileNav }) => {
  const dispatch = useDispatch();
  const { hamberger } = useSelector((state: RootState) => state.global);

  const handleSidebar = () => {
    dispatch(toggleSidebar(!hamberger));
  };

  return (
    <div id="navbar" className={`side-bar ${hamberger ? "open" : "close"}`}>
      <div className="user-section">
        <img alt="avatar" src="./burger-menu.svg" onClick={handleSidebar} />
        <img alt="hamburger" src="./logo512.png" />

        {/* <div className="user-details">
          <h2>Eranda Samarasinghe</h2>
          <span>online</span>
        </div> */}
      </div>
      <hr />
      <div className="nav-menu">
        <div className="nav-item select">Posts</div>
        <div className="nav-item">Profile</div>
        <div className="nav-item">Settings</div>
      </div>
      <div className="log-out">
        <span>Logout</span>
        <img alt="avatar" src="./logout.svg" />
      </div>
    </div>
  );
};

export default NavBar;
