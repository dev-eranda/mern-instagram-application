import React from 'react'

const NavBar = () => {
    return (
        <nav>
            <div className="nav-wrapper white">
                <a href="/" className="brand-logo left">Instagram</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="/signin">Sing in</a></li>
                    <li><a href="/signup">Sing up</a></li>
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/createpost">CreatePost</a></li>

                </ul>
            </div>
        </nav>
    )
}

export default NavBar