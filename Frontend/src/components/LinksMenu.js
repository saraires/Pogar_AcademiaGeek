import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import swal from 'sweetalert2';
import {removeFromLocal, saveToLocal} from '../functions/localstorage';

const LinksMenu = () => {
  const history= useHistory();

  const alertPro=()=>{
    swal.fire({
      title: '¿Segur@ que deseas salir?',
      text: "¡No tardes mucho, desde Pogar te apreciamos!",
      width: 600,
      padding: '3em',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F8BF00',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Salir',
      backdrop: `
        rgba(0,0,123,0.4)
        left top
        no-repeat
      `
    }).then((result) => {
      if (result.isConfirmed) {
        history.push('/');
        removeFromLocal('id');
        removeFromLocal('authToken');
        removeFromLocal('id_card');
        removeFromLocal('id_deseo');
        removeFromLocal('id_gasto');
        removeFromLocal('id_gasto_hormiga');
        saveToLocal('alert', '1');
      }
    })
  }
  
  return (
        <div className="links">
        <ul>
          <li>
            <Link to="/perfil" >Perfil</Link>
          </li>
          <li>
            <Link to="/gastos" >Gastos</Link>
          </li>
          <li>
            <Link to="/gastos-hormiga" >Gastos hormiga</Link>
          </li>
          <li>
            <Link to="/deseos" >Deseos</Link>
          </li>
          <li>
            <Link onClick={alertPro}>Cerrar sesión</Link>
          </li>
        </ul>
      </div>
    );
}
export default LinksMenu;