import React, { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { PostCard } from "../../components/ui/Card";
import { Row, Col, Container } from "react-bootstrap";
import { RootState } from "../../types";
// import { photo } from "../../assets/images/logo.jpg";

const Post = () => {
  const dispatch = useDispatch();
  const fetchInitiated = useRef(false);

  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);

  console.log(token);
  console.log(isAuthenticated);

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
      console.log(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  // component

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchInitiated.current = true;
      fetchData(token);
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="side-bar"></div>
      <PostCard name="Eranda Madusanka" title="title" description="desc" />
      <PostCard name="Eranda Madusanka" title="title" description="desc" />
    </>
  );
};

export default Post;
