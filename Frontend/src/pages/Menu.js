import React from 'react';
import NavBarMenu from '../components/NavBarMenu';
import HeaderMenu from '../components/HeaderMenu';
import LinksMenu from '../components/LinksMenu';

const Menu = () => {
    return (
        <div className="containerMenu">
            <NavBarMenu />
            <HeaderMenu />
            <LinksMenu />
        </div>
    );
}
export default Menu;