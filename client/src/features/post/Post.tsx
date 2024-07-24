import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { PostCard } from "../../components/ui/Card";
import { Row, Col, Container } from "react-bootstrap";
import { RootState } from "../../types";
// import { photo } from "../../assets/images/logo.jpg";

import NavBar from "../../components/NavBar";

import "./Post.css";

const Post = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const fetchInitiated = useRef(false);

  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);

  // console.log(token);
  // console.log(isAuthenticated);

  const fetchData = async (token: string) => {
    try {
      const response = await fetch("/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // console.log(data);
    } catch (error) {
      // console.error("There was a problem with the fetch operation:", error);
    }
  };

  // component

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchInitiated.current = true;
      fetchData(token);
    }
  }, [isAuthenticated]);

  const handleNavbar = () => {
    setOpen(!open);

    // const navbar = document.getElementById("navbar");
    // if (navbar) {
    //   navbar.classList.toggle("active");
    // }
  };

  // useEffect(() => {
  //   console.log(open);
  // }, [open]);

  return (
    <>
      <NavBar mobileNav={open} />

      <div className="mobile-header">
        <img alt="logo" src="./logo512.png" />
        <img alt="hamberger" src="./logo512.png" onClick={handleNavbar} />
      </div>

      <div className="post-section">
        <div className="post-wrapper">
          <PostCard name="Eranda Madusanka" title="title" description="desc" />
          <PostCard name="Eranda Madusanka" title="title" description="desc" />
        </div>
      </div>
    </>
  );
};

export default Post;
