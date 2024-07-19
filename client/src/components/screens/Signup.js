import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
// import M from 'materialize-css'

const Signup = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const PostData = () => {

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            // return M.toast({ html: "invalid email", classes: "#c62828 red darken-3" })
        }

        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    // M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    // M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                    history.push("/signin")
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
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={() => PostData()}
                >
                    Sign up
                </button>
                <h5>
                    <Link to="/signin">Already have an account ?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup