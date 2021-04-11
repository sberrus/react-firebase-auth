/*
  Para configurar firebase primero debemos ir a la consola y buscar en "Compilacion > authentication" y activar la autentificacion con el medio que deseemos utilizar para hacer el Login.

  También hay que acordarse de crear el script para la configuración de Firebase. Este script lo encontramos en "Configuracion del proyecto > General" Este script lo tenemos que incorporar en firebase.js.
 */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Login from './components/Login'
function App() {
  return (
    //Usando router para configurar las rutas protegidas
    <Router>
      <div className="container p-0">
        <Navbar />
        <div className="container">
          <Switch>
            <Route path="/" exact>
              Inicio...
          </Route>
            <Route path="/admin">
              admin...
          </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
