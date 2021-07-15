import React, { useState, useEffect } from "react";
import { db } from "../firebase";

import moment from "moment"; //importamos moment.js
import "moment/locale/es"; //Configuramos moment.js en español

const Firestore = (props) => {
    const [tareas, setTareas] = useState([]);
    const [tarea, setTarea] = useState("");
    const [modoEdicion, setModoEdicion] = useState(false);
    const [id, setId] = useState("");

    const [ultimo, setUltimo] = useState(null);
    const [desactivar, setDesactivar] = useState(false);

    useEffect(() => {
        setDesactivar(true);
        const obtenerDatos = async () => {
            try {
                //FILTRANDO DATA PARA LAS CONSULTAS:
                const data = await db
                    .collection(props.user.uid)
                    .limit(3) //Este método sirve para limitar la cantidad de elementos que devolverá la consulta.
                    .orderBy("fecha", "desc") //Este método sirve para ordenar los elementos tanto de manera ascendente como descendente, tomando en cuenta la llave que utilizará como filtro.
                    /*
                    -   Se envia como argumento la "llave" que se desea ordenar.
                    -   En este ejemplo estamos pidiendo que ordene los elementos que reciba de la "llave" fecha.
                    -   Este ordena de manera predeterminada de menor a mayor poniendo de primeros los simbolos, luego los números, luego las mayúsculas y de último las minúsuclas. Siempre obedeciendo el orden de la primera letra del primer elemento.
                    -   ESTE MÉTODO RECIBE OTRO ARGUMENTO INDICANDO SI SE DESEA ORDENAR DE MAYOR A MENOR ("desc"); O DE MENOR A MAYOR (DEFAULT) COMO SE LE INDIQUE.
                    */
                    .get();
                const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setUltimo(data.docs[data.docs.length - 1]);
                setTareas(arrayData);

                const query = await db
                    .collection(props.user.uid)
                    .limit(3)
                    .orderBy("fecha", "desc")
                    .startAfter(data.docs[data.docs.length - 1])
                    .get();
                if (query.empty) {
                    console.log("no hay mas documentos");
                    setDesactivar(true);
                } else {
                    setDesactivar(false);
                }
            } catch (error) {
                console.log(error);
            }
        };

        obtenerDatos();
    }, [props.user.uid]);

    const siguiente = async () => {
        try {
            const data = await db.collection(props.user.uid).limit(3).orderBy("fecha", "desc").startAfter(ultimo).get();
            const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setUltimo(data.docs[data.docs.length - 1]);
            setTareas([...tareas, ...arrayData]);

            const query = await db
                .collection(props.user.uid)
                .limit(3)
                .orderBy("fecha", "desc")
                .startAfter(data.docs[data.docs.length - 1])
                .get();
            if (query.empty) {
                console.log("no hay mas documentos");
                setDesactivar(true);
            } else {
                setDesactivar(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

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
            const arrayEditado = tareas.map((item) =>
                item.id === id ? { id: item.id, fecha: item.fecha, name: tarea } : item
            );
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
                        <input
                            type="text"
                            placeholder="Ingrese tarea"
                            className="form-control mb-2"
                            onChange={(e) => setTarea(e.target.value)}
                            value={tarea}
                        />
                        <button
                            className={modoEdicion ? "btn btn-warning btn-block" : "btn btn-dark btn-block"}
                            type="submit"
                        >
                            {modoEdicion ? "Editar" : "Agregar"}
                        </button>
                    </form>
                </div>
                <div className="col-lg-4">
                    <h3>Lista de tareas</h3>
                    <ul className="list-group">
                        {tareas.map((item) => (
                            <li className="list-group-item" key={item.fecha}>
                                {/*
                                    USANDO MOMENT JS PARA LAS FECHAS
                                */}
                                {item.name} -{" "}
                                {
                                    moment(item.fecha).format(
                                        "LLL"
                                    ) /*enviamos el valor UNIX como argumento al método moment(UNIX) y le damos un formato con el método format() ESTOS FORMATOS SE ENCUENTRAN EN LA DOCUMENTACIÓN DE LA LIBRERIA.*/
                                }
                                {/*********************************************/}
                                <div className="float-end">
                                    <button
                                        className="btn btn-danger btn-sm float-right me-2"
                                        onClick={() => eliminar(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        className="btn btn-warning btn-sm float-right mr-2"
                                        onClick={() => activarEdicion(item)}
                                    >
                                        Editar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {!desactivar && (
                        <button
                            className="btn btn-info btn-block mt-2 col-12 btn-sm"
                            onClick={() => {
                                siguiente();
                            }}
                            disabled={desactivar}
                        >
                            Ver más
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Firestore;
