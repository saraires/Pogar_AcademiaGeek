import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (ruta) => {
    return (
        <div>
            <div className="navbar">
                <div className="menu">
                    <Link to="/menu" style={{ textDecoration: "none", color: "white" }}><h3 className="logo">PoGar</h3></Link>
                </div>
                <div>
                    <Link style={{textDecoration: 'none'}} className="tittHormiga" to={ruta.route}><i className="fas fa-arrow-left" style={{ color: 'rgb(255, 255, 255)', fontSize: '35px', display: "inline", paddingLeft: '100px', paddingRight: '450px'}}></i></Link>
                </div>
            </div>
        </div>
    );
}
export default NavBar;