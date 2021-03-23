import React from 'react';
import { useForm } from "react-hook-form";
import axios from "../axios/axios";
import { saveToLocal } from "../functions/localstorage";
import swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

const Forms = () => {
  const history = useHistory();
  let signin = false;
  let signup = false;
  const esLogin = () => signin = true; signup = false;
  const esRegister = () => signup = true; signin = false;

  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    if (signin) {
      if (data.contrasenaL.length >= 8) {
        axios.post(`/`, {
          correo: data.correoL,
          contraseña: data.contrasenaL
        }).then((res) => {
          if (res.status === 200) {
            const token = res.data['authToken'];
            const id = res.data['usuarioValido']['_id'];
            saveToLocal("id", id);
            saveToLocal('authToken', token);
            history.push("/menu");
          } else {
            swal.fire({
              title: "Error al iniciar sesión",
              text: "¡Su información es incorrecta!",
              footer: "Intente de nuevo",
              icon: "error",
              confirmButtonText: "¡Entendido!",
              confirmButtonColor: "#F8BF00",
            });
          }
        }).catch(() => {
          swal.fire({
            title: "Error al iniciar sesión",
            text: "Su información es incorrecta",
            footer: "Intente de nuevo",
            icon: "error",
            confirmButtonText: "¡Entendido!",
            confirmButtonColor: "#F8BF00",
          });
        });
      } else {
        swal.fire({
          title: "Error al iniciar sesión",
          text: "¡La contraseña debe tener más de 8 carácteres!",
          icon: "error",
          confirmButtonText: "¡Entendido!",
          confirmButtonColor: "#F8BF00",
        });
      }

    }

    if (signup) {
      if (data.contrasenaR.length >= 8) {
        axios.post('/signup', {
          nombre: data.nombre,
          correo: data.correoR,
          contraseña: data.contrasenaR,
          imagen: 'https://user-images.githubusercontent.com/66284121/111956716-145aa600-8ab9-11eb-8220-959165d782a5.jpg'
        }).then((res) => {
          if (res.status === 200) {
            swal.fire({
              title: "¡El registro se realizó con éxito!",
              text: "¡Ya puedes inciar sesión!",
              icon: "success",
              confirmButtonText: "¡Entendido!",
              confirmButtonColor: "#F8BF00",
            });
          } else {
            swal.fire({
              title: "¡Hubo un error al realizar el registro!",
              text: "Revisa de nuevo tu información",
              icon: "error",
              confirmButtonText: "¡Entendido!",
              confirmButtonColor: "#F8BF00",
            });
          }
        }).catch(() => {
          swal.fire({
            title: "Error al registrarse",
            text: "Su información es incorrecta",
            footer: "Intente de nuevo",
            icon: "error",
            confirmButtonText: "¡Entendido!",
            confirmButtonColor: "#F8BF00",
          });
        })
      } else {
        swal.fire({
          title: "Error al registrarse",
          text: "¡La contraseña debe tener más de 8 carácteres!",
          icon: "error",
          confirmButtonText: "¡Entendido!",
          confirmButtonColor: "#F8BF00",
        });
      }

    }

  };
  return (
    <div className="forms-container">
      <div className="signin-signup">
        <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="title">Iniciar sesión</h2>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input type="email" required placeholder="Correo" ref={register} name="correoL" />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input type="password" required placeholder="Contraseña" ref={register} name="contrasenaL" />
          </div>
          <input type="submit" value="Iniciar sesión" onClick={esLogin} className="btn solid" />
        </form>
        <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="title">Regístrate</h2>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input type="text" required placeholder="Nombre" ref={register} name="nombre" />
          </div>
          <div className="input-field">
            <i className="fas fa-envelope"></i>
            <input type="email" required placeholder="Correo" ref={register} name="correoR" />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input type="password" required placeholder="Contraseña" ref={register} name="contrasenaR" />
          </div>
          <input type="submit" className="btn" onClick={esRegister} value="Regístrate" />
        </form>
      </div>
    </div>
  );
}
export default Forms;