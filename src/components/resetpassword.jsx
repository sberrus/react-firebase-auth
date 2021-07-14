import React, { useCallback, useState } from "react";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";

const Resetpassword = (props) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    const procesarDatos = (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setError("Ingrese email");
            return;
        }
        setEmail("");
        setError(null);

        recuperar();
    };

    const recuperar = useCallback(async () => {
        try {
            await auth.sendPasswordResetEmail(email);
            console.log("correo enviado");
            props.history.push("/login");
        } catch (error) {
            setError(error.message);
        }
    }, [email, props.history]);

    return (
        <div className="mt-5">
            <h3 className="display-5 text-center">Recuperar Contraseña</h3>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <form onSubmit={procesarDatos}>
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Ingrese un email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <button className="btn btn-dark btn-block col-12 mb-1" type="submit">
                            Reiniciar Contraseña
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Resetpassword);
/*
    NOTA PARA LA CLASE DE RECUPERACION DE CONTRASEÑA:
        -   FIREBASE NOS OFRECE EL CLIENTE PARA PODER ENVIAR LOS CORREOS A LOS USUARIOS DESDE EL SERVIDOR DE CORREOS DE GOOGLE.
        -   EN EL PANEL DE ADMINISTRACIÓN DE FIREBASE PODEMOS CONFIGURAR LOS PARAMETROS PARA CAMBIAR DE CORREO O PARA CAMBIAR LOS USUARIOS Y CONTRASEÑAS DE LOS MISMOS. 
        -   EN FIREBASE TAMBIÉN PODEMOS CAMBIAR LA PLANTILLA QUE SE ENVIARÁ A LOS USUARIOS EN HTML SI DESEAMOS PERSONALIZARLA.
*/
