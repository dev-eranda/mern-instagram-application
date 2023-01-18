import React from 'react'

const Home = () => {
    return (
        <div className="home">
            <div className="card home-card">
                <h5>John Doe</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8d2FsbHBhcGVyfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                        alt="" />
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{ color: "red" }}>favorite</i>
                    <h6>title</h6>
                    <p>this is Post</p>
                    <input type="text" placeholder="add a comment"></input>
                </div>
            </div>
            <div className="card home-card">
                <h5>John Doe</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8d2FsbHBhcGVyfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60" 
                        alt="" />
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{ color: "red" }}>favorite</i>
                    <h6>title</h6>
                    <p>this is Post</p>
                    <input type="text" placeholder="add a comment"></input>
                </div>
            </div>
        </div>
    )
}

export default Home