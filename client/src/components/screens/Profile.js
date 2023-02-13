import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "../../App"

const Profile = () => {

    const [mypics, setPics] = useState([])
    const { state, dispatch } = useContext(UserContext)

    useEffect(() => {
        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setPics(result.mypost)
            })
    }, [])

    return (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom: "1px solid gray"
            }}>
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                        src="https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="">
                    </img>
                </div>
                <div>
                    <h4>{state ? state.name : "loading..."}</h4>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                        <h6>40 Posts</h6>
                        <h6>40 Followers</h6>
                        <h6>40 Following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {mypics.map((item) => {
                    return (
                        <img className="item" src={item.photo} alt={item.title} key={item._id}></img>
                    )
                })}
            </div>
        </div>
    )
}

export default Profile