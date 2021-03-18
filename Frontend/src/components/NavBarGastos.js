import React from 'react';
import {Link} from 'react-router-dom';
import ModalGastos from './Modal';

const NavBarGastos = () => {
    return (
        <div className="navbar">
            <div className="menu">
                <Link to="/menu" style={{textDecoration:"none", color:"white"}}><h3 className="logo">PoGar</h3></Link>
                <ModalGastos/>
            </div>
                <h3 className="tittleGastos">Gastos</h3>
        </div>
    );
}
export default NavBarGastos;