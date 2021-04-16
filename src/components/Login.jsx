import React, { useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const procesarDatos = (e) => {
        e.preventDefault();
        
    }
    return (
        <div className="mt-5">
            <h3 className="display-5">Acceso o registro de usuarios</h3>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Ingrese un email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <input
                            type="password"
                            className="form-control mb-2"
                            placeholder="Ingresar contraseña"
                            onChange={e => setPass(e.target.value)}
                            value={pass}
                        />
                        <button
                            className="btn btn-dark btn-block col-12 mb-1">
                            Registrarse
                            </button>
                        <button
                            className="btn btn-info btn-sm col-12">
                            ¿Ya esta registrado?
                            </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
