import React from 'react';
import Tittle from '../components/Tittle';
import OptionsHome from '../components/OptionsHome';
import {saveToLocal} from '../functions/localstorage';

const Home=()=>{
    saveToLocal('alert', '1');
    return(
        <div className="containerHome">
            <Tittle prop="Pogar"/>
            <OptionsHome/>
        </div>
    );
}


export default Home;