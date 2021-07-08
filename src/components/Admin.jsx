import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";
import Firestore from "./Firestore";

const Admin = (props) => {
    const [user, setUser] = useState(null);

    //lógica para rutas protegidas.
    /*
        Con este bloque de código indicamos a la app que si no hay algun usuario registrado, automaticamente refdirija a los usuarios al login para que puedan registrarse.

        PARA QUE ESTO SIRVA CORRECTAMENTE TENEMOS QUE CARGAR LA CONFIGURACIN DE FIREBASE DESDE EL ARCHIVO QUE CARGA TODA LA APP. [IR A App.js para ver config].
    */
    useEffect(() => {
        //auth.currentUser devuelve la información del usuario que esta almacenada en auth.firebase
        if (!auth.currentUser) {
            props.history.push("/login");
        } else {
            setUser(auth.currentUser);
            console.log(auth.currentUser);
        }
    }, [user, props.history]);

    return (
        <div>
            <h2>Ruta Protegida</h2>
            {/* Se comprueba que exista el valor de user para poder mostrarlo */}
            {user && <Firestore user={user} />}
        </div>
    );
};

export default withRouter(Admin);
