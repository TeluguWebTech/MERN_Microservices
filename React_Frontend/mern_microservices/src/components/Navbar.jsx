import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const token = localStorage.getItem("token")

    const username = localStorage.getItem("username")

    const navigate = useNavigate()

    const logoutHandler = () => {

        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("userId")

        navigate("/login")
    }

    return (

        <div className="navbar">

           <Link to="/">
            <div className="logo">
                MERN E-comm
            </div>
           </Link>

            <div className="navLinks">

                <div className="welcomeText">
                    Welcome {username}
                </div>

                <Link to="/">Home</Link>

                <Link to="/cart">Cart</Link>

                {
                    token ? (

                        <button
                            className="logoutBtn"
                            onClick={logoutHandler}
                        >
                            Logout
                        </button>

                    ) : (

                        <>

                            <Link to="/register">
                                Register
                            </Link>

                            <Link to="/login">
                                Login
                            </Link>

                        </>

                    )
                }

            </div>

        </div>
    )
}

export default Navbar