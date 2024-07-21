import React, { useState, useEffect } from 'react'
// import M from 'materialize-css'

const CreatePost = () => {

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        if (url) {
            fetch("/post", {
                method: "post",
                headers: {
                    "Content-Type": "Application/json",
                    "authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    body,
                    image_url: url
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        // M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                    }
                    else {
                        // M.toast({ html: "Created post successfully", classes: "#43a047 green darken-1" })
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
        data.append("cloud_name", "dgbgvecx3")

        //store img
        fetch("https://api.cloudinary.com/v1_1/dgbgvecx3/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)
                if (data.error) {
                    // M.toast({ html: data.error.message, classes: "#c62828 red darken-3" })
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