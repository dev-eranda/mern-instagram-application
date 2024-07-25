import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "../../components/ui/Card";
import { RootState } from "../../types";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar";
import "./Post.css";

const Post = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const fetchInitiated = useRef(false);

  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const { hamberger } = useSelector((state: RootState) => state.global);

  // console.log(hamberger);
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
      console.error("Error", error);
    }
  };

  // useEffect(() => {
  //   if (isAuthenticated && token) {
  //     fetchInitiated.current = true;
  //     fetchData(token);
  //   }
  // }, [isAuthenticated]);

  const handleNavbar = () => {
    setOpen(!open);
  };

  return (
    <>
      <Header />
      <NavBar mobileNav={open} />
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
