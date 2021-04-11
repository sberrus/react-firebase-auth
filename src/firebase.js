//Archivo de configuracion de Firebase
import app from "firebase/app";
//Manejo de la BBDD
import "firebase/firestore"
//Auth
import "firebase/auth";

// Configuración de firebase
const firebaseConfig = {
    apiKey: "AIzaSyBV9SCTShO4a1PjUTfjdT-YleDEdBR3nps",
    authDomain: "crud-react-8029e.firebaseapp.com",
    projectId: "crud-react-8029e",
    storageBucket: "crud-react-8029e.appspot.com",
    messagingSenderId: "1024830323619",
    appId: "1:1024830323619:web:bb990e06810f3147997816"
};
// Inicializador Firebase
app.initializeApp(firebaseConfig);

//Inicializador Firestore
const db = app.firestore();

//Inicializador de Auth
const auth = app.auth();

//Exportamos la db y el auth para usarlo en la app.
export {db, auth}