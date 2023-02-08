import React, { useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
import M from 'materialize-css'

const CreatePost = () => {

    // const history = useHistory()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        if (url) {
            fetch("/createpost", {
                method: "post",
                headers: {
                    "Content-Type": "Application/json",
                    "authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    body,
                    photoURI: url
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: "Created post successfully", classes: "#43a047 green darken-1" })
                    // history.push('/')
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }, [url])

    const postDetails = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "dq0uxfwky")

        //store img
        fetch("https://api.cloudinary.com/v1_1/dq0uxfwky/image/upload", {
            method: "post",
            body: data
        })
        .then(res => res.json())
        .then(data => {
            setUrl(data.url)
            console.log(data, "eranda")
            if (data.error) {
                M.toast({ html: data.error.message, classes: "#c62828 red darken-3" })
            }

        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="card input-field"
            style={{
                margin: "30px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center"
            }}
        >
            <input
                type="text"
                placehalder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placehalder="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={() => postDetails()}
            >
                Submit
            </button>
        </div>
    )
}

export default CreatePost