import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'
import { UserContext } from '../../App'

const Signin = () => {

    const history = useHistory()
    const { state, dispatch } = useContext(UserContext)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const PostData = () => {

        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return M.toast({ html: "invalid email", classes: "#c62828 red darken-3" })
        }

        fetch("/signin", {
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
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({ type: "USER", payload: data.user })
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
                <div class='row'>
                    <div class="input-field col s6">
                        <input placeholder="Placeholder" id="first_name" type="text" class="validate" />
                        <label for="first_name">First Name</label>
                    </div>
                </div>

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
                    Sign in
                </button>
                <h5>
                    <Link to="/signup">Do not have an account ?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signin