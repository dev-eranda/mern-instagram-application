import React from 'react'

const CreatePost = () => {
    return (
        <div className="card input-field"
            style={{
                margin: "30px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center"
            }}
        >
            <input type="text" placehalder="title" />
            <input type="text" placehalder="body" />
            <div class="file-field input-field">
                <div class="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" />
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1">
                Sign in
            </button>
        </div>
    )
}

export default CreatePost