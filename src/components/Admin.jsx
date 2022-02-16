import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";
import Firestore from "./Firestore";

const Admin = (props) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		//auth.currentUser devuelve el usuario logeado o null cual sea el caso.
		if (!auth.currentUser) {
			props.history.push("/login");
		} else {
			setUser(auth.currentUser);
		}
	}, [user, props.history]);

	return (
		<div>
			<h2>Ruta Protegida</h2>
			{user && <Firestore user={user} />}
		</div>
	);
};

export default withRouter(Admin);
