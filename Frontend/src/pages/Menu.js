import React from 'react';
import NavBar from '../components/NavBar';
import HeaderMenu from '../components/HeaderMenu';
import LinksMenu from '../components/LinksMenu';

const Menu = () => {
    return (
        <div className="containerMenu">
            <NavBar />
            <HeaderMenu />
            <LinksMenu />
        </div>
    );
}
export default Menu;