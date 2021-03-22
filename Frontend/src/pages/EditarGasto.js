import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavIndividual';
import axios from '../axios/axios';
import { getFromLocal } from '../functions/localstorage';
import { useForm } from "react-hook-form";
import swal from 'sweetalert2';

const EditarGasto = () => {
    const [gasto, setGasto] = useState({});
    const { register, handleSubmit } = useForm();
    const token = getFromLocal('authToken');
    const id_gasto = getFromLocal('id_gasto');
    const onSubmit = data => {
        if (gasto.titulo !== data.titulo || gasto.descripcion !== data.descripcion || gasto.precio !== parseInt(data.precio)) {
            axios.post('/editargasto', {
                "titulo": data.titulo,
                "descripcion": data.descripcion,
                "precio": data.precio,
                "id": id_gasto,
                "token": token
            }).then(res => {
                swal.fire({
                    title: "¡Deseo editado con exito!",
                    confirmButtonText: '¡Entendido!',
                    confirmButtonColor: '#F8BF00',
                }).then(result => {
                    if (result.isConfirmed) {
                        window.location.href = "/gastos"
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

    const getGasto = () => {
        axios.post('/vergasto', { "id": id_gasto, "token": token })
            .then(res => {
                setGasto(res.data[0])
            })
    }
    useEffect(() => {
        getGasto();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="conta">
            <NavBar />
            <div className="containerG">
                <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="title">Editar gasto</h2>
                    <br />
                    <div className="input-field">
                        <i className="fas fa-file-alt"></i>
                        <input type="text" defaultValue={gasto.titulo} required ref={register} name="titulo" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-envelope-open-text"></i>
                        <input type="text" defaultValue={gasto.descripcion} required ref={register} name="descripcion" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-money-bill-wave"></i>
                        <input type="number" defaultValue={gasto.precio} required ref={register} name="precio" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-calendar-alt"></i>
                        <input type="text" defaultValue={gasto.fecha_pago} required ref={register} name="fecha_pago" />
                    </div>
                    <input type="submit" value="Editar" className="btn solid" />
                </form>
            </div>
        </div>
    );
}
export default EditarGasto;