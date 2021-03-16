import React from 'react';
import { useForm } from "react-hook-form";
import axios from "../axios/axios";
import { saveToLocal } from "../functions/localstorage";
import swal from "sweetalert2";

const Forms=()=>{
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log(data);
    axios.post(`/`, {
        correo: data.correo,
        contraseña: data.contraseña
    }).then((res) => {
        console.log(res);
        console.log(res.data);

        const id = res.data["_id"];
        saveToLocal("id", id);
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
    });
  };
  return (
    <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="title">Iniciar sesión</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="email" required placeholder="Correo" ref={register} name="correoL"/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" required placeholder="Contraseña" ref={register} name="contrasenaL"/>
            </div>
            <input type="submit" value="iniciar sesión" className="btn solid" />
          </form>
          <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="title">Regístrate</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" required placeholder="Nombre" ref={register} name="nombre"/>
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" required placeholder="Correo" ref={register} name="correoR"/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" required placeholder="Contraseña" ref={register} name="contrasenaR"/>
            </div>
            <input type="submit" className="btn" value="Regístrate" />
          </form>
        </div>
      </div>
    );
}
export default Forms;