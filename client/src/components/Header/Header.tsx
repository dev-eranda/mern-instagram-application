import React, { useState } from "react";
import { toggleSidebar } from "../../slices/globalSlice";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../types";

const Header = () => {
  const dispatch = useDispatch();
  const { hamburger } = useSelector((state: RootState) => state.global);

  const handleHamberger = () => {
    dispatch(toggleSidebar(!hamburger));
  };

  return (
    <div className="header-container">
      <div className="header-left">
        <img alt="hamburger" src="./burger-menu.svg" onClick={handleHamberger} />
        <img alt="hamburger" src="./logo512.png" />
      </div>
      <div className="header-center"></div>
      <div className="header-right">
        <img alt="notification" src="./bell.svg" />
        <img alt="profile" src="./avatar.svg" />
      </div>
    </div>
  );
};

export default Header;
