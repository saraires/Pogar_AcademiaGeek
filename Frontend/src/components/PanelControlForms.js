import React from 'react';

const PanelControlForms=()=>{
  return(
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>¿Nuevo aquí?</h3>
            <p>
              ¡Regístrate para que tengas un mejor manejo de tus ingresos y egresos!
            </p>
            <button className="btn transparent" id="sign-up-btn">
              Regístrate
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>¿Ya estás registrado?</h3>
            <p>
              ¡Genial, ingresa de inmediato para que puedas gestionar tus gastos hormiga del día!
            </p>
            <button className="btn transparent" id="sign-in-btn">
              Iniciar sesión
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    );
}


export default PanelControlForms;