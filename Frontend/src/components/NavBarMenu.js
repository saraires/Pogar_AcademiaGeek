import React from 'react';

const NavBarMenu = () => {
    const transition = () => {
        const container = document.querySelector(".containerMenu");
        container.classList.toggle("active");
    }
    return (
        <div className="navbar">
            <div className="menu">
                <h3 className="logo">PoGar</h3>
                <div className="hamburger-menu" onClick={transition}>
                    <div className="bar"></div>
                </div>
            </div>
        </div>
    );
}
export default NavBarMenu;