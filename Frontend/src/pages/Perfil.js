import React, { useEffect, useState } from 'react';
import ImgPerfil from '../components/ImgPerfil';
import SocialPerfil from '../components/SocialPerfil';
import NavBar from '../components/NavPerfil';
import { Link } from 'react-router-dom';
import { getFromLocal } from '../functions/localstorage';
import axios from '../axios/axios';

const Perfil = () => {
    const [perfil, setPerfil] = useState({});
    const token = getFromLocal('authToken');
    const id = getFromLocal('id');
    const getPerfil = () => {
        axios
            .post(`/perfil`, { "id": id, "token": token })
            .then((res) => {
                setPerfil(res.data[0]);
            })
    }
    useEffect(() => {
        getPerfil()
        // eslint-disable-next-line
    }, [])
    return (
        <div className="wrapper">
            <NavBar />
            <div className="contenedor">
                <ImgPerfil />
                <div className="perfil">
                    <div className="nombre">{perfil['nombre'] ? perfil['nombre'] : null}</div>
                    <div className="txt">
                        Apasionad@ por la buena gestión de su dinero y excelente usuario de <strong>Pogar</strong>
                    </div>
                    <div className="lacation">
                        <span className="lacation_icon">
                            <div className="icon"><i className="fas fa-money-check-alt"></i> </div>
                        </span>
                        <span>{perfil['saldo']? perfil['saldo']: "0000"}</span>
                    </div>
                    <SocialPerfil />
                    <div className="txt">{perfil['correo'] ? perfil['correo'] : null}</div>
                    <div className="botones">
                        <Link to="/menu"><button className="button button--orange">Menú</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil;