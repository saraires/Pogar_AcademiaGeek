import React from 'react';
import PerfilFoto from '../images/perfil.svg';

const ImgPerfil = () => {
    return (
        <div className="perfil_img">
            <img src={PerfilFoto} alt="" />{/*Aquí va la imagen del usuario*/}
        </div>
    );
}
export default ImgPerfil;