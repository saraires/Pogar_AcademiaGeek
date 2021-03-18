import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="navbar">
            <div className="menu">
                <Link to="/menu" style={{textDecoration:"none", color:"white"}}><h3 className="logo">PoGar</h3></Link>
            </div>
        </div>
    );
}
export default NavBar;