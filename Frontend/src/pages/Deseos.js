import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavDeseos';
import axios from '../axios/axios';
import { getFromLocal } from '../functions/localstorage';
import swal from 'sweetalert2';

const Deseos = () => {
    const [editar, setEditar] = useState(false);
    const [deseos, setDeseos] = useState([]);
    const token = getFromLocal('authToken');
    const autor = getFromLocal('id');

    const getDeseos = () => {
        axios.post('/verdeseos', { "id": autor, "token": token })
            .then((res) => {
                setDeseos(res.data);
            }).catch(() => { });
    }

    const validarEdicion = () => {
        console.log(editar);
        if (editar === false) {
            setEditar(true);
        } else {
            setEditar(false);
        }
    }

    useEffect(() => {
        getDeseos();
        // eslint-disable-next-line
    }, [])


    return (
        <div className="conta">
            <NavBar />
            <div className="containerG">
                {deseos.map((iterator) => (
                    <div key={iterator._id} className="card">
                        <div className="box">
                            <div className="contentG">
                                <h2>{iterator.comprable ? <i className="fas fa-coins"></i> : <i className="fas fa-exclamation-triangle"></i>}</h2>
                                {editar ? <input placeholder="Hola"/> : 
                                <div>
                                    <h3>{iterator.titulo}</h3>
                                    <br />
                                    <p>{iterator.descripcion}</p>
                                    <br />
                                    <p><i className="fas fa-money-bill-wave"></i> {iterator.precio}</p>
                                </div>
                                }
                                <br />
                                <span onClick={validarEdicion} className="btn-editar">Editar</span>
                                <span className="btn-editar" onClick={() => {
                                    swal.fire({
                                        title: '¿Seguro que deseas eliminar el deseo?',
                                        showCancelButton: true,
                                        cancelButtonText: 'Cancelar',
                                        confirmButtonText: 'Eliminar',
                                        confirmButtonColor: '#F8BF00',
                                    }).then(result => {
                                        if (result.isConfirmed) {
                                            axios.post('/eliminardeseo', { "id": iterator._id, "token": token }).then((res) => {
                                                if (res.data['message'] === "Deseo Eliminado") {
                                                    window.location.reload();
                                                }
                                            }).catch(() => {
                                                swal.fire({
                                                    title: "No se pudo eliminar el deseo",
                                                    footer: "Intente de nuevo",
                                                    icon: "error",
                                                    confirmButtonText: "¡Entendido!",
                                                    confirmButtonColor: "#F8BF00",
                                                });
                                            })
                                        }
                                    })
                                }}>Eliminar</span>
                                <br />
                                <br />
                                <p>{iterator.comprable ? <p>Date el gusto</p> : <p>No te des el gusto</p>}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Deseos;