import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavGastos';
import axios from '../axios/axios';
import { getFromLocal, saveToLocal } from '../functions/localstorage';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';

const Gastos = () => {
    const [gastos, setGastos] = useState([]);
    const token = getFromLocal('authToken');
    const autor = getFromLocal('id');

    const saveIdCard = id => {
        saveToLocal('id_card', id);
    }

    const getGastos = () => {
        axios.post('/vergasto', { "id": autor, "token": token })
            .then((res) => {
                setGastos(res.data)
            });
    }

    useEffect(() => {
        getGastos();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="conta">
            <NavBar />
            <div className="containerG">
                {gastos.map((iterator) => (
                    <div key={iterator._id} className="card">
                        <div className="box">
                            <div className="contentG">
                                <Link to="/info-gasto" onClick={saveIdCard(iterator._id)} style={{ textDecoration: "none" }}>
                                    <h2>{iterator.pagado ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}</h2>
                                    <h3>{iterator.titulo}</h3>
                                    <br />
                                    <p>{iterator.descripcion}</p>
                                    <br />
                                    <p><i className="fas fa-money-bill-wave"></i> {iterator.precio < 0 ? 0 : iterator.precio}</p>
                                    <br />
                                    <p>{iterator.fecha_pago}</p>
                                </Link>
                                <a className="btn-editar">Editar</a>
                                <a onClick={() => {
                                    swal.fire({
                                        title: 'Ingrese la cantidad dispuesta para aportar al gasto',
                                        input: 'number',
                                        inputPlaceholder: 'Pago',
                                        inputAttributes: {
                                            autocapitalize: 'off'
                                        },
                                        showCancelButton: true,
                                        cancelButtonText: 'Cancelar',
                                        confirmButtonText: 'Aportar',
                                        showLoaderOnConfirm: true,
                                        confirmButtonColor: '#f4f800',
                                        preConfirm: pago => {
                                            if (pago === "" || pago === "0") {
                                                swal.fire({
                                                    title: 'Su pago no puede ir vacío'
                                                })
                                            } else {
                                                console.log({ id: iterator.id, token: token, autor: autor, pago: pago })
                                                return axios.post('/pagar', { id: iterator._id, token: token, autor: autor, pago: pago })
                                                    .then(res => {
                                                        if (res.status === 200) {
                                                            swal.fire({
                                                                title: '¡Aporte realizado!',
                                                                confirmButtonText: '¡Entendido!',
                                                                confirmButtonColor: '#f4f800'
                                                            }).then(sarai => {
                                                                if (sarai.isConfirmed) {
                                                                    window.location.reload();
                                                                }
                                                            });
                                                        }
                                                    }).catch(err => {
                                                        swal.showValidationMessage(
                                                            'Request filed' + err
                                                        );
                                                    });
                                            }
                                        },
                                        allowOutsideClick: () => !swal.isLoading()
                                    });
                                }} className="btn-editar">Pagar</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Gastos;