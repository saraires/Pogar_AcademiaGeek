import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavDeseos';
import axios from '../axios/axios';
import { getFromLocal } from '../functions/localstorage';

const Deseos = () => {
    const [deseos, setDeseos] = useState([]);
    const token = getFromLocal('authToken');
    const autor = getFromLocal('id');

    const getDeseos = () => {
        axios.post('/verdeseos', { "id": autor, "token": token })
            .then((res) => {
                setDeseos(res.data);
            }).catch(() => { });
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
                                <h2>{iterator.comprable? <i className="fas fa-coins"></i>: <i className="fas fa-exclamation-triangle"></i>}</h2>
                                <h3>{iterator.titulo}</h3>
                                <br/>
                                <p>{iterator.descripcion}</p>
                                <br/>
                                <p><i className="fas fa-money-bill-wave"></i> {iterator.precio}</p>
                                <br/>
                                <a href="/" className="btn-editar">Read More</a>
                                <br/>
                                <br/>
                                <p>{iterator.comprable? <span>Date el gusto</span>: <span>No te des el gusto</span>}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Deseos;