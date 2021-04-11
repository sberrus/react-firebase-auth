import React from 'react'
import { Link, NavLink } from "react-router-dom"

function Navbar() {
    return (
        <div className="navbar navbar-dark bg-dark p-1">
            <Link to="/" className="navbar-brand">
                Auth
            </Link>
            <div className="d-flex">
                <NavLink to="/" exact className="btn btn-dark mx-2">
                    Inicio
                </NavLink>
                <NavLink to="/login" className="btn btn-dark mx-2">
                    Login
                </NavLink>
                <NavLink to="/admin" className="btn btn-dark mx-2">
                    Admin
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar
