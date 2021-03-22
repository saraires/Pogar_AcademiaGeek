import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <div className="navbar">
                <div className="menu">
                    <Link to="/menu" style={{ textDecoration: "none", color: "white" }}><h3 className="logo">PoGar</h3></Link>
                </div>
                <div>
                    <Link style={{textDecoration: 'white'}} className="tittHormiga" to="/gastos"><i className="fas fa-arrow-left" style={{ color: 'rgb(255, 255, 255)', fontSize: '35px', display: "inline", paddingLeft: '100px', paddingRight: '450px'}}></i></Link>
                    <h3 className="tittleGastos" style={{display: 'inline'}}>Aportes</h3>
                </div>
            </div>
        </div>
    );
}
export default NavBar;