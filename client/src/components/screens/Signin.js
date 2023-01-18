import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'

const Signin = () => {

    const history = useHistory()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const PostData = () => {

        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return M.toast({ html: "invalid email", classes: "#c62828 red darken-3" })
        }

        fetch("/singin", {
            method: "post",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.error) {
                M.toast({ html: data.error, classes: "#c62828 red darken-3" })
            }
            else {
                M.toast({ html: "Success", classes: "#43a047 green darken-1" })
                history.push('/')
            }
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={() => PostData()}
                >
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