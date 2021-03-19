import React from 'react';
import {Link} from 'react-router-dom';

const LinksMenu = () => {
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
            <Link to="/" >Cerrar sesión</Link>
          </li>
        </ul>
      </div>
    );
}
export default LinksMenu;