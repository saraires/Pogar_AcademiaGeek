import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavIndividual';
import axios from '../axios/axios';
import { getFromLocal } from '../functions/localstorage';
import swal from 'sweetalert2';
import { useForm } from "react-hook-form";

const Deseos = () => {
    const [deseo, setDeseo]=useState({});
    const { register, handleSubmit } = useForm();
    const token = getFromLocal('authToken');
    const id_deseo = getFromLocal('id_deseo');
    const onSubmit = data => {
        axios.post('/editardeseo', {
            "titulo": data.titulo,
            "descripcion": data.descripcion,
            "precio": data.precio,
            "id": id_deseo,
            "token": token
        }).then(res=>{
            console.log(res);
        })
    }

    const getDeseo=()=>{
        axios.post('/verundeseo', {"id":id_deseo})
        .then(res=>{
            console.log(res.data);
            setDeseo(res.data)
        })
    }
    useEffect(()=>{
        getDeseo();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="conta">
            <NavBar />
            <div className="containerG">
                <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
                    <br />
                    <br />
                    <h2 className="title">Editar deseo</h2>
                    <br />
                    <div className="input-field">
                        <i className="fas fa-file-alt"></i>
                        <input type="text" required ref={register} name="titulo" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-envelope-open-text"></i>
                        <input type="text" required ref={register} name="descripcion" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-money-bill-wave"></i>
                        <input type="number" required ref={register} name="precio" />
                    </div>
                    <input type="submit" value="Editar" className="btn solid" />
                </form>
            </div>
        </div>
    );
}
export default Deseos;