/*
  Para configurar firebase primero debemos ir a la consola y buscar en "Compilacion > authentication" y activar la autentificacion con el medio que deseemos utilizar para hacer el Login.

  También hay que acordarse de crear el script para la configuración de Firebase. Este script lo encontramos en "Configuracion del proyecto > General" Este script lo tenemos que incorporar en firebase.js.
 */

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Resetpassword from "./components/resetpassword";
import { auth } from "./firebase";
import { useEffect, useState } from "react";

function App() {
    const [firebaseUser, setFirebaseUser] = useState(false);

    useEffect(() => {
        //onAuthStateChanged(function(callback)) es una función de firebase para comprobar el estado de login de los usuarios. Este nos permite comprobar que el usuario este o no logeado en la app.
        //esta función recibe como callback el usuario que este logeado o no tomando en cuenta el caso.

        auth.onAuthStateChanged((user) => {
            if (user) {
                setFirebaseUser(user);
            } else {
                setFirebaseUser(null);
            }
        });
    }, []);

    //creamos el operador ternario en este caso para indicar a la app que cargue antes de mostrar el contenido a mostrar.

    return firebaseUser !== false ? (
        //Usando router para configurar las rutas protegidas
        <Router>
            <div className="container p-0">
                <Navbar firebaseUser={firebaseUser} />
                <div className="container">
                    <Switch>
                        <Route path="/" exact>
                            Inicio...
                        </Route>
                        <Route path="/admin">
                            <Admin />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/reset-password">
                            <Resetpassword />
                        </Route>
                        <Redirect to="/" />
                    </Switch>
                </div>
            </div>
        </Router>
    ) : (
        <h2 className="display-6">Cargando...</h2>
    );
}

export default App;
