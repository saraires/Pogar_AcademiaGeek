import React from 'react';
import { useForm } from "react-hook-form";

const ModalGastos = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {

  }
  return (
    <>
      <main className="conatinerModal">
        <input id="mostrar-modal" type="radio" name="modal" />
        <label htmlFor="mostrar-modal">Añadir gasto</label>
        <input id="cerrar-modal" type="radio" name="modal" />
        <label htmlFor="cerrar-modal">&times;</label>
        <div id="modal">
          <div className="modal_Interno">
            <div className="intro_modal">
              <h2>Añadir gasto</h2>
              <br/>
              <p>
                Desde este apartado puedes ingresar una inversión que hayas pagado por completo.
            </p>
            </div>
            <div>
              <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="input-field">
                  <i className="fas fa-text-width"></i>
                  <input type="email" required placeholder="Título" ref={register} name="titulo" />
                </div>
                <div className="input-field">
                  <i className="fas fa-money-bill-wave"></i>
                  <input type="text" required placeholder="Valor" ref={register} name="valor" />
                </div>
                <div className="input-field">
                  <i className="fas fa-calendar-alt"></i>
                  <input type="text" required placeholder="Fecha de pago" ref={register} name="fecha" />
                </div>
                <input type="submit" value="Guardar gasto" className="btn solid" />
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  )
};

export default ModalGastos;