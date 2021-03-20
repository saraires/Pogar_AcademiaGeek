import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavGastosH';
import axios from '../axios/axios';
import { getFromLocal } from '../functions/localstorage';

const GastosH = () => {
    const [gastos, setGastos] = useState([]);
    const token = getFromLocal('authToken');
    const autor = getFromLocal('id');

    const getGastos = () => {
        axios.post('/verant', { "id": autor, "token": token })
            .then((res) => {
                setGastos(res.data)
            });
    }

    const transformer = (data) => {
        const fecha = data.split("T");
        return fecha[0];
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
                                <h2><i className="fas fa-bug"></i></h2>
                                <h3>{iterator.titulo}</h3>
                                <p>{iterator.descripcion}</p>
                                <p><i className="fas fa-money-bill-wave"></i> {iterator.precio}</p>
                                <p>{transformer(iterator.fecha)}</p>
                                <a href="/" className="btn-editar">Read More</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default GastosH;