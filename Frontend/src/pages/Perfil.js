import React from 'react';
import ImgPerfil from '../components/ImgPerfil';
import SocialPerfil from '../components/SocialPerfil';
import SaldoPerfil from '../components/SaldoPerfil';
import NavBar from '../components/NavPerfil';
import {Link} from 'react-router-dom';

const Perfil = () => {
    return (
        <div className="wrapper">
            <NavBar/>
            <div className="contenedor">
                <ImgPerfil />
                <div className="perfil">
                    <div className="nombre">Brayan Gomez Manco</div>
                    <div className="txt">
                        Registrado desde la hermosa <strong>Colombia</strong>
                    </div>
                    <SaldoPerfil />
                    <SocialPerfil />
                    <div className="txt">saraires@gmail.com</div>
                    <div className="botones">
                        <Link to="/menu"><button className="button button--orange">Menú</button></Link>  
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil;