import React, { useState, useEffect, useContext } from "react";
// import { UserContext } from "../../App";
// import M from 'materialize-css'

const Home = () => {
  const [data, setData] = useState([]);
  // const { state, dispatch } = useContext(UserContext);
  const state = "hello";

  useEffect(() => {
    fetch("/post", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.post);
      });
  }, []);

  const likePost = (id) => {
    fetch("/post/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unlikePost = (id) => {
    fetch("/post/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const makeComment = (text, postId) => {
    fetch("/post/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletepost = (postId) => {
    fetch(`/post/${postId}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const updatedData = data.filter((item) => item._id !== result._id);
        //In here still not update
        setData(updatedData);
        // M.toast({ html: "Successfully deleted", classes: "#c62828 red darken-3" });
      })
      .catch((error) => {
        console.log(error);
      })
      .then((res) => res.json())
      .then((result) => {
        const updatedData = data.filter((item) => item._id !== result._id);
        //In here still not update
        setData(updatedData);
        // M.toast({ html: "Successfully deleted", classes: "#c62828 red darken-3" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5>
              {item.postedBy.name}
              {item.postedBy._id === state._id && (
                <i
                  className="material-icons"
                  style={{ float: "right", cursor: "pointer" }}
                  onClick={() => deletepost(item._id)}
                >
                  delete
                </i>
              )}
            </h5>
            <div className="card-image">
              <img src={item.photo} alt="" />
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              {item.likes.includes(state._id) ? (
                <i
                  className="material-icons"
                  onClick={() => {
                    unlikePost(item._id);
                  }}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  onClick={() => {
                    likePost(item._id);
                  }}
                >
                  thumb_up
                </i>
              )}
              <h6>{item.likes.length} likes </h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {item.comments.map((record) => {
                return (
                  <h6 key={record._id}>
                    <span style={{ fontWeight: "500" }}>{record.commentedBy.name}</span>{" "}
                    {record.text}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                }}
              >
                <input type="text" placeholder="add a comment"></input>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
