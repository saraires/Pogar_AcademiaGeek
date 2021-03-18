import React from 'react';
import {Link} from 'react-router-dom';

const NavBarGastos = prop => {
    return (
        <div className="navbar">
            <div className="menu">
                <Link to="/menu" style={{textDecoration:"none", color:"white"}}><h3 className="logo">PoGar</h3></Link>
            </div>
                <h3 className="tittleGastos">{prop.prop}</h3>
        </div>
    );
}
export default NavBarGastos;