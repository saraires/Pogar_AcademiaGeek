import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavIndividual';
import axios from '../axios/axios';
import { getFromLocal } from '../functions/localstorage';
import { useForm } from "react-hook-form";
import swal from 'sweetalert2';

const EditarGastoHormiga = () => {
    const [gastoHormiga, setGastoHormig] = useState({});
    const [fecha, setFecha] = useState();
    const { register, handleSubmit } = useForm();
    const token = getFromLocal('authToken');
    const id_gasto = getFromLocal('id_gasto_hormiga');
    const onSubmit = data => {
        if (gastoHormiga.titulo !== data.titulo || gastoHormiga.descripcion !== data.descripcion || gastoHormiga.precio !== parseInt(data.precio) || transformer(gastoHormiga.fecha) !== transformer(data.fecha) ) {
            axios.post('/editarant', {
                "titulo": data.titulo,
                "descripcion": data.descripcion,
                "precio": data.precio,
                "id": id_gasto,
                "token": token
            }).then(res => {
                swal.fire({
                    title: "¡Gasto hormiga editado con exito!",
                    confirmButtonText: '¡Entendido!',
                    confirmButtonColor: '#F8BF00',
                }).then(result => {
                    if (result.isConfirmed) {
                        window.location.href = "/gastos-hormiga"
                    }
                });
            })
        } else {
            swal.fire({
                title: "Error al editar el gasto hormiga",
                text: "Para poder editar debes cambiar minimo un campo",
                icon: "error",
                onfirmButtonText: '¡Entendido!',
                confirmButtonColor: '#F8BF00',
            })
        }
    }

    const transformer = (data) => {
        const fecha = data.split("T");
        return fecha[0];
    }

    const getGastoHormig = () => {
        axios.post('/verunhormiga', { "id": id_gasto, "token": token })
            .then(res => {
                setGastoHormig(res.data[0]);
                setFecha(transformer(res.data[0]["fecha"]));
                console.log(gastoHormiga);
            })
    }
    useEffect(() => {
        getGastoHormig();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="conta">
            <NavBar route="/gastos-hormiga"/>
            <div className="containerG">
                <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="title">Editar gasto</h2>
                    <br />
                    <div className="input-field">
                        <i className="fas fa-file-alt"></i>
                        <input type="text" defaultValue={gastoHormiga.titulo} required ref={register} name="titulo" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-envelope-open-text"></i>
                        <input type="text" defaultValue={gastoHormiga.descripcion} required ref={register} name="descripcion" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-money-bill-wave"></i>
                        <input type="number" defaultValue={gastoHormiga.precio} required ref={register} name="precio" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-calendar-alt"></i>
                        <input type="date" defaultValue={fecha} required ref={register} name="fecha" />
                    </div>
                    <input type="submit" value="Editar" className="btn solid" />
                </form>
            </div>
        </div>
    );
}
export default EditarGastoHormiga;