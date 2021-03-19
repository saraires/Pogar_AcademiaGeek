import React from 'react';
import NavBar from '../components/NavDeseos';
const Deseos = () => {
    return (
        <div className="conta">  
            <NavBar/> 
            <div className="containerG">
                <div className="card">
                    <div className="box">
                        <div className="contentG">
                            <h2>01</h2>
                            <h3>Card One</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae hic fugiat ipsa aut! Aliquid odit exercitationem, doloremque possimus dicta consequatur.</p>
                            <a href="/" className="btn-editar">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Deseos;