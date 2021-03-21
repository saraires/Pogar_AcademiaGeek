import React from 'react';
import InfoGasto from '../components/InfoGasto';
import NavBar from '../components/NavBar';

const InfoGastosPage=()=>{
    return(
        <div className="containerHome">
            <InfoGasto/>
            <NavBar/>
        </div>
    );
}


export default InfoGastosPage;