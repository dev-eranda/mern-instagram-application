import React from 'react'

const Signin = () => {
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                    type="text"
                    placeholder="email"
                />
                <input
                    type="text"
                    placeholder="password"
                />
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2">
                    Sign in
                </button>
                <h5>
                    <a href="/signup">Do not have an account ?</a>
                </h5>
            </div>
        </div>
    )
}

export default Signin