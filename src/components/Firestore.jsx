import React from "react";
import { db } from "../firebase";

const Firestore = (props) => {
    const [tareas, setTareas] = React.useState([]);
    const [tarea, setTarea] = React.useState("");
    const [modoEdicion, setModoEdicion] = React.useState(false);
    const [id, setId] = React.useState("");

    React.useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const data = await db.collection(props.user.uid).get();
                const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                console.log(arrayData);
                setTareas(arrayData);
            } catch (error) {
                console.log(error);
            }
        };

        obtenerDatos();
    }, []);

    const agregar = async (e) => {
        e.preventDefault();

        if (!tarea.trim()) {
            console.log("está vacio");
            return;
        }

        try {
            const nuevaTarea = {
                name: tarea,
                fecha: Date.now(),
            };
            const data = await db.collection(props.user.uid).add(nuevaTarea);

            setTareas([...tareas, { ...nuevaTarea, id: data.id }]);

            setTarea("");
        } catch (error) {
            console.log(error);
        }

        console.log(tarea);
    };

    const eliminar = async (id) => {
        try {
            await db.collection(props.user.uid).doc(id).delete();

            const arrayFiltrado = tareas.filter((item) => item.id !== id);
            setTareas(arrayFiltrado);
        } catch (error) {
            console.log(error);
        }
    };

    const activarEdicion = (item) => {
        setModoEdicion(true);
        setTarea(item.name);
        setId(item.id);
    };

    const editar = async (e) => {
        e.preventDefault();
        if (!tarea.trim()) {
            console.log("vacio");
            return;
        }
        try {
            await db.collection(props.user.uid).doc(id).update({
                name: tarea,
            });
            const arrayEditado = tareas.map((item) => (item.id === id ? { id: item.id, fecha: item.fecha, name: tarea } : item));
            setTareas(arrayEditado);
            setModoEdicion(false);
            setTarea("");
            setId("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="row">
                <div className="col-lg-8">
                    <h3>{modoEdicion ? "Editar Tarea" : "Agregar Tarea"}</h3>
                    <form onSubmit={modoEdicion ? editar : agregar}>
                        <input type="text" placeholder="Ingrese tarea" className="form-control mb-2" onChange={(e) => setTarea(e.target.value)} value={tarea} />
                        <button className={modoEdicion ? "btn btn-warning btn-block" : "btn btn-dark btn-block"} type="submit">
                            {modoEdicion ? "Editar" : "Agregar"}
                        </button>
                    </form>
                </div>
                <div className="col-lg-4">
                    <h3>Lista de tareas</h3>
                    <ul className="list-group">
                        {tareas.map((item) => (
                            <li className="list-group-item" key={item.id}>
                                {item.name}
                                <div className="float-end">
                                    <button className="btn btn-danger btn-sm float-right me-2" onClick={() => eliminar(item.id)}>
                                        Eliminar
                                    </button>
                                    <button className="btn btn-warning btn-sm float-right mr-2" onClick={() => activarEdicion(item)}>
                                        Editar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Firestore;
