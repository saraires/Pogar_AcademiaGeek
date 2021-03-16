import React from 'react';
import {Link} from 'react-router-dom';

const OptionsHome=()=>{
    return(
        <div className="containerOptionsHome">
            <div className="containerButtons">
                <Link to="/access" className="buttonHome"><span>Comenzar</span></Link>
            </div>
        </div>
    );
}


export default OptionsHome;