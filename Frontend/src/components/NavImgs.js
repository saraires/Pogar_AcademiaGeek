import React from 'react';
import { Link } from 'react-router-dom';

const NavImgs = () => {
    return (
       <div>
            <div className="navbar">
            <div className="menu">
                <Link to="/menu" style={{ textDecoration: "none", color: "white" }}><h3 className="logo">PoGar</h3></Link>
            </div>
            <h3 className="tittleGastos">Imagenes</h3>
        </div>
       </div>
    );
}
export default NavImgs;