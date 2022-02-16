import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { auth } from "./firebase"; //Importado desde el archivo de configuración de firebase.
import { useEffect, useState } from "react";

//Components
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Resetpassword from "./components/resetpassword";

function App() {
	const [firebaseUser, setFirebaseUser] = useState(false);

	useEffect(() => {
		//Método de auth para verificar que el usuario se encuentre logeado
		auth.onAuthStateChanged((user) => {
			//El callback devuelve el usuario logeado o null cual sea el caso
			if (user) {
				setFirebaseUser(user);
			} else {
				setFirebaseUser(null);
			}
		});
	}, []);

	return firebaseUser ? (
		<Router>
			<div className="container-fluid p-0">
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
