import React from 'react';
import { useForm } from "react-hook-form";
import axios from "../axios/axios";
import { saveToLocal } from "../functions/localstorage";
import swal from "sweetalert2";

export default function SignUp() {
    const { register, handleSubmit, errors } = useForm(); //Validacion React hook form

    const onSubmit = data => {

        axios.post(`/`, {
            correo: data.correo,
            contraseña: data.contraseña
        }).then((res) => {
            console.log(res);
            console.log(res.data);

            // const token = res.headers;
            // saveToLocal("token", token);

            const id = res.data["_id"];
            saveToLocal("id", id);

            // window.location.href = `/inicio/${id}`;

            swal.fire({
                title: "Bienvenido!",
                text: "Se pudo iniciar sesión correctamente",
                icon: "success",
                confirmButtonText: "Ok",
            });


        }).catch((err) => {
            console.log(err);
            swal.fire({
                title: "Error!",
                text: "Correo y/o contraseña incorrectos",
                icon: "error",
                confirmButtonText: "Ok",
            });
        });;
        console.log(data);
    };

    return (
        <div>
            <form className="container" onSubmit={handleSubmit(onSubmit)}>
                <div className="card-body">
                    <h1>Inicio de sesión</h1>
                    <div>
                        <input type="email" id="correo" name="correo" ref={register({ required: true })} />
                        {errors.correo && errors.correo.type === "required" && <p>Correo invalido</p>}
                        <input type="password" id="contraseña" name="contraseña" ref={register({ required: true, minLength: 6 })} />
                        {errors.contraseña && errors.contraseña.type === "required" && <p>Ingrese una contraseña</p>}
                        {errors.contraseña && errors.contraseña.type === "minLength" && <p>La contraseña debe tener min 6 carácteres</p>}
                    </div>
                    <input type="submit" className="btn btn-primary" value="Ingresar" />
                </div>
            </form>
        </div>
    );
}