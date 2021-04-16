import React, { useState } from 'react'
import { auth } from "../firebase"

const Login = () => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState(null);
    const [esRegistro, setEsRegistro] = useState(true);

    const procesarDatos = (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setError("Ingrese email");
            return
        }
        if (!pass.trim()) {
            setError("Ingrese password");
            return
        }
        if (pass.length < 6) {
            setError("La contraseña debe tener más de 6 caractéres");
            return
        }

        if (esRegistro) {
            registrar();
        }
        console.log("correcto")

        setEmail("");
        setPass("");
        setError("");
    }

    const registrar = React.useCallback(async () => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass);
            console.log(res)
        } catch (error) {
            console.log(error);
            if(error.code === "auth/email-already-in-use"){
                setError("Usuario ya registrado");
            }
            if(error.code === "auth/invalid-email"){
                setError("Formato de email no válido")
            }

        }
    }, [email, pass])


    return (
        <div className="mt-5">
            <h3 className="display-5">
                {
                    esRegistro ? "Registro" : "Acceder a su cuenta"
                }
            </h3>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    {
                        error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )
                    }
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
                            className="btn btn-dark btn-block col-12 mb-1"
                            type="submit"
                        >
                            Registrarse
                            </button>
                        <button
                            className="btn btn-info btn-sm col-12"
                            type="button"
                            onClick={() => setEsRegistro(!esRegistro)}>
                            {
                                esRegistro ? "¿Ya eres usuario?" : "¿No eres usuario?"
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
