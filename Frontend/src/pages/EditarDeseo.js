import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavIndividual';
import axios from '../axios/axios';
import { getFromLocal } from '../functions/localstorage';
import { useForm } from "react-hook-form";
import swal from 'sweetalert2';

const Deseos = () => {
    const [deseo, setDeseo] = useState({});
    const { register, handleSubmit } = useForm();
    const token = getFromLocal('authToken');
    const id_deseo = getFromLocal('id_deseo');
    const onSubmit = data => {
        if (deseo.titulo !== data.titulo || deseo.descripcion !== data.descripcion || deseo.precio !== parseInt(data.precio)) {
            axios.post('/editardeseo', {
                "titulo": data.titulo,
                "descripcion": data.descripcion,
                "precio": data.precio,
                "id": id_deseo,
                "token": token
            }).then(res => {
                swal.fire({
                    title: "¡Deseo editado con exito!",
                    confirmButtonText: '¡Entendido!',
                    confirmButtonColor: '#F8BF00',
                }).then(result => {
                    if (result.isConfirmed) {
                        window.location.href = "/deseos"
                    }
                });
            })
        } else {
            swal.fire({
                title: "Error al editar el deseo",
                text: "Para poder editar debes cambiar minimo un campo",
                icon: "error",
                onfirmButtonText: '¡Entendido!',
                confirmButtonColor: '#F8BF00',
            })
        }
    }

    const getDeseo = () => {
        axios.post('/verundeseo', { "id": id_deseo, "token": token })
            .then(res => {
                console.log(res.data);
                setDeseo(res.data[0])
            })
    }
    useEffect(() => {
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
                        <input type="text" defaultValue={deseo.titulo} required ref={register} name="titulo" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-envelope-open-text"></i>
                        <input type="text" defaultValue={deseo.descripcion} required ref={register} name="descripcion" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-money-bill-wave"></i>
                        <input type="number" defaultValue={deseo.precio} required ref={register} name="precio" />
                    </div>
                    <input type="submit" value="Editar" className="btn solid" />
                </form>
            </div>
        </div>
    );
}
export default Deseos;