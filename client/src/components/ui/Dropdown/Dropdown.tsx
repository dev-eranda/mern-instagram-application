import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootTypes } from "../../../types";
import { AppDispatch } from "../../../store";
// import { getUserAsync } from "../../../slices/authSlice";
// import useAuth from "../../../hooks/useAuth";
import "./Dropdown.css";

interface dropdownProps {
  isOpen: boolean;
}

const Dropdown: React.FC<dropdownProps> = ({ isOpen }) => {
  const { user } = useSelector((state: RootTypes) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  // const { logout } = useAuth();
  const handleLogout = () => {
    // logout();
  };

  useEffect(() => {
    if (isOpen) {
      // dispatch(getUserAsync());
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className={`dropdown-container ${isOpen ? "open" : ""}`}>
          <div className="user-details">
            <img alt="img" src="./avatar.svg" />
            <div className="user-text-section">
              <span className="user-name">{user?.name}</span>
              <span className="online-status">online</span>
            </div>
          </div>
          <div className="dropdown-items">
            <Link to="/profile">Profile</Link>
            <Link to="" onClick={handleLogout}>
              Log out
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;
