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
        <div className="navbar">
            <div className="menu">
                <Link to="/menu" style={{ textDecoration: "none", color: "white" }}><h3 className="logo">PoGar</h3></Link>
                <Container>
                    <Button className="btn-modal"onClick={openModal}>Añadir gasto</Button>
                </Container>
                <ModalGastos showModal={showModal} setShowModal={setShowModal}  />
            </div>
            <h3 className="tittleGastos">Gastos</h3>
        </div>
    );
}
export default NavBarGastos;