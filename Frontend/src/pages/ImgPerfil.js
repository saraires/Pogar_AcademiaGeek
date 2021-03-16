import React from 'react';

export default function ImgPerfil(){
    return(
        <div>
            <h1>Hola Esta es la pagina para agregar la imagen del usuario</h1>
            <br/>
            <br/>
            <img src="..." alt="..."/> {/* Aqui se coloca una imagen por defecto que cambie cuando suba o selecione una imagen o algo asi */}
            <br/>
            <br/>
            <input type="file" name="file"></input>
        </div>
    );
}