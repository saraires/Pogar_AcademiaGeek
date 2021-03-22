import React from 'react';
import Tittle from '../components/Tittle';
import OptionsHome from '../components/OptionsHome';
import {saveToLocal} from '../functions/localstorage';

const Home=()=>{
    saveToLocal('alert', true);
    return(
        <div className="containerHome">
            <Tittle prop="Pogar"/>
            <OptionsHome/>
        </div>
    );
}


export default Home;