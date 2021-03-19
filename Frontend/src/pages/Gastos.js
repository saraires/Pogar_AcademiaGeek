import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavGastos';
import axios from '../axios/axios';
import { getFromLocal } from '../functions/localstorage';

const Gastos = () => {
    const [gastos, setGastos] = useState([]);
    const token = getFromLocal('authToken');
    const autor = getFromLocal('id');
    const aportes = (array) => {
        console.log(array)
        return null
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
                                <h2>{iterator.pagado ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}</h2>
                                <h3>{iterator.titulo}</h3>
                                <br />
                                <p>{iterator.descripcion}</p>
                                <br />
                                <p>{aportes(iterator.contribucion)}</p>
                                <br />
                                <p>{iterator.precio}</p>
                                <br />
                                <p>{iterator.fecha_pago}</p>
                                <a href="/" className="btn-editar">Editar</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Gastos;