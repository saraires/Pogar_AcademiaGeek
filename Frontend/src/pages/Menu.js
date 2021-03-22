import React from 'react';
import NavBarMenu from '../components/NavBarMenu';
import HeaderMenu from '../components/HeaderMenu';
import LinksMenu from '../components/LinksMenu';
import swal from 'sweetalert2';
import {getFromLocal, saveToLocal} from '../functions/localstorage';

const Menu = () => {
    const alert=getFromLocal('alert');
    if(alert){
        swal.fire({
            title: '¡Recuerda!',
            text: 'Debes registrar tus gastos hormiga a diario. Esto complementará la gestión de tu dinero.',
            confirmButtonText: "¡Entendido!",
            confirmButtonColor: "#f4f800"
        });
        saveToLocal('alert', false);
    }

    return (
        <div className="containerMenu">
            <NavBarMenu />
            <HeaderMenu />
            <LinksMenu />
        </div>
    );
}
export default Menu;