import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavGastos';
import axios from '../axios/axios';
import { getFromLocal, saveToLocal } from '../functions/localstorage';
import { Link } from 'react-router-dom';

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
                                <a href="/" className="btn-editar">Editar</a>
                                <a href="/" className="btn-editar">Pagar</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Gastos;