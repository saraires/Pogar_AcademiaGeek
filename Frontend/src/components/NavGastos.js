import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Container, Button} from './modals/modalStyles/stylesModals';
import ModalGastos from './modals/modals/ModalGastos';
const NavBarGastos = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal=()=>{
        setShowModal(prev=>!prev);
    }
    return (
        <div>
            <div className="navbar">
            <div className="menu">
                <Link to="/menu" style={{ textDecoration: "none", color: "white" }}><h3 className="logo">PoGar</h3></Link>
                <Container>
                    <Button className="btn-modal"onClick={openModal}>Añadir gasto</Button>
                </Container>
                <ModalGastos showModal={showModal} setShowModal={setShowModal}  />
            </div>
        </div>
            <h3 className="tittleGastos">Gastos</h3>
            <p>En esta pantalla estan todas las acciones que puedes realizar con tus gastos</p>
            <p>Recuerda que tus gastos deben ser mayores a 100.000$</p>
        </div>
    );
}
export default NavBarGastos;