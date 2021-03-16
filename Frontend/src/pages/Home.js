import React from 'react';
import Tittle from '../components/Tittle';
import OptionsHome from '../components/OptionsHome';

const Home=()=>{
    return(
        <div className="containerHome">
            <Tittle prop="Pogar"/>
            <OptionsHome/>
        </div>
    );
}


export default Home;