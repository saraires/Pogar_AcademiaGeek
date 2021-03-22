import React from 'react';
import { getFromLocal } from '../functions/localstorage';
import { Link } from 'react-router-dom';

const ImgPerfil = () => {

    const imagen = getFromLocal('img');

    return (
        <div className="perfil_img">
            <Link to="/elegir-imagen"><img src={imagen} alt="" /></Link>
        </div>
    );
}
export default ImgPerfil;