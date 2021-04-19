import React from 'react'
import { Link, NavLink, withRouter } from "react-router-dom"
import { auth } from "../firebase"

function Navbar(props) {

    const cerrarSession = () => {
        auth.signOut()
            .then(() => {
                props.history.push("/login")
            })
    }

    return (
        <div className="navbar navbar-dark bg-dark p-1">
            <Link to="/" className="navbar-brand">
                Auth
            </Link>
            <div className="d-flex">
                <NavLink to="/" exact className="btn btn-dark mx-2">
                    Inicio
                </NavLink>
                {
                    props.firebaseUser !== null ? (
                        <NavLink to="/admin" className="btn btn-dark mx-2">
                            Admin
                        </NavLink>
                    ) : null
                }

                {
                    props.firebaseUser !== null ? (
                        <button
                            className="btn btn-danger mx-2"
                            onClick={cerrarSession}>
                            Cerrar Sesión
                        </button>
                    ) : (
                        <NavLink to="/login"
                            className="btn btn-dark mx-2">
                            Login
                        </NavLink>
                    )
                }
            </div>
        </div>
    )
}

export default withRouter(Navbar)
