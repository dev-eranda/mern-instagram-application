import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import "./Dropdown.css";

interface dropdownProps {
  isOpen: boolean;
}

const Dropdown: React.FC<dropdownProps> = ({ isOpen }) => {
  const { user, refreshToken, logout } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();

  const handleLogout = async () => {
    try {
      const response = await axiosPrivate.post(
        "/logout",
        { refreshToken },
        {
          signal: controller.signal,
        }
      );

      logout();
      if (response.status === 200) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
