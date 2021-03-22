import React from 'react';
import NavBarMenu from '../components/NavBarMenu';
import HeaderMenu from '../components/HeaderMenu';
import LinksMenu from '../components/LinksMenu';
import swal from 'sweetalert2';
import {getFromLocal, saveToLocal} from '../functions/localstorage';

const Menu = () => {
    const alert=getFromLocal('alert');
    if(alert === '1'){
        swal.fire({
            title: '¡Recuerda!',
            text: 'Debes registrar tus gastos hormiga a diario. Esto complementará la gestión de tu dinero.',
            confirmButtonText: "¡Entendido!",
            confirmButtonColor: "#F8BF00"
        });
        saveToLocal('alert', '2');
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