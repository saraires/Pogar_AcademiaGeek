import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Container, Button} from './modals/modalStyles/stylesModals';
import ModalPerfil from './modals/modals/ModalPerfil';
const NavBarPerfil = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal=()=>{
        setShowModal(prev=>!prev);
    }
    return (
        <div className="navbar">
            <div className="menu">
                <Link to="/menu" style={{ textDecoration: "none", color: "white" }}><h3 className="logo">PoGar</h3></Link>
                <Container>
                    <Button className="btn-modal"onClick={openModal}>Cambiar saldo</Button>
                </Container>
                <ModalPerfil showModal={showModal} setShowModal={setShowModal}  />
            </div>
        </div>
    );
}
export default NavBarPerfil;