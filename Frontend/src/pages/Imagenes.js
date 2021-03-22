import React from 'react';
import NavBar from '../components/NavImgs';
import Galeria from '../components/Galeria';

const GastosH = () => {
    return (
        <div className="conta imagenes">
            <NavBar />
            <div className="containerG">
                <Galeria />
            </div>
        </div>
    );
}
export default GastosH;