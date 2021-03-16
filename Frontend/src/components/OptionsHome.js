import React from 'react';
import {Link} from 'react-router-dom';

const OptionsHome=()=>{
    return(
        <div className="containerOptionsHome">
            <div className="containerButtons">
                <Link to="/singin" className="buttonHome"><span>Iniciar sesión</span></Link>
                <Link to="/singup" className="buttonHome"><span>Crear cuenta</span></Link>
                <Link className="buttonHome"><span>Salir</span></Link>
            </div>
        </div>
    );
}


export default OptionsHome;