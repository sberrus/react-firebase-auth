import React, { useState } from "react";
import { db, auth } from "../firebase";
//importamos withRouter para controlar las redirecciones.
import { withRouter } from "react-router-dom";

//para trabajar con las redirecciones tenemos que hacer uso de la prop history por lo tanto es necesario llamar a las props en el componente.
const Login = (props) => {
    const [email, setEmail] = useState("prueba@samdev.es");
    const [pass, setPass] = useState("123456");
    const [error, setError] = useState(null);
    const [esRegistro, setEsRegistro] = useState(false);

    const procesarDatos = (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setError("Ingrese email");
            return;
        }
        if (!pass.trim()) {
            setError("Ingrese password");
            return;
        }
        if (pass.length < 6) {
            setError("La contraseña debe tener más de 6 caractéres");
            return;
        }

        if (esRegistro) {
            registrar();
        } else {
            login();
        }
        setEmail("");
        setPass("");
        setError(null);
    };

    const login = React.useCallback(async () => {
        try {
            await auth.signInWithEmailAndPassword(email, pass);
            //accedemos a la prop history y a su función [push("/ruta")], para redirigir
            //a los usuarios a la ruta determinada.
            props.history.push("/admin");
        } catch (error) {
            console.log(error);
            if (error.code === "auth/user-not-found") {
                setError("Usuario no registrado");
                return;
            }
            if (error.code === "auth/wrong-password") {
                setError("Contraseña Incorrecta");
                return;
            }
            setError("Error al acceder a la cuenta");
        }
    }, [email, pass, props.history]);

    const registrar = React.useCallback(async () => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass);
            await db.collection("usuarios").doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid,
            });
            await db.collection(res.user.uid).add({
                name: "Tarea de Ejemplo",
                fecha: Date.now(),
            });
            props.history.push("/admin");
        } catch (error) {
            console.log(error);
            if (error.code === "auth/email-already-in-use") {
                setError("Usuario ya registrado");
            }
            if (error.code === "auth/invalid-email") {
                setError("Formato de email no válido");
            }
        }
    }, [email, pass, props.history]);

    return (
        <div className="mt-5">
            <h3 className="display-5">{esRegistro ? "Registro" : "Acceder a su cuenta"}</h3>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <form onSubmit={procesarDatos}>
                        <input type="email" className="form-control mb-2" placeholder="Ingrese un email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        <input type="password" className="form-control mb-2" placeholder="Ingresar contraseña" onChange={(e) => setPass(e.target.value)} value={pass} />
                        <button className="btn btn-dark btn-block col-12 mb-1" type="submit">
                            {esRegistro ? "Registrarse" : "Acceder"}
                        </button>
                        <button className="btn btn-info btn-sm col-12" type="button" onClick={() => setEsRegistro(!esRegistro)}>
                            {esRegistro ? "¿Ya eres usuario?" : "¿No eres usuario?"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Login);
