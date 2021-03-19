import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Container, Button} from './modals/modalStyles/stylesModals';
import ModalDeseo from './modals/modals/ModalDeseo';
const NavDeseos = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal=()=>{
        setShowModal(prev=>!prev);
    }
    return (
        <div className="navbar">
            <div className="menu">
                <Link to="/menu" style={{ textDecoration: "none", color: "white" }}><h3 className="logo">PoGar</h3></Link>
                <Container>
                    <Button className="btn-modal"onClick={openModal}>Añadir deseo</Button>
                </Container>
                <ModalDeseo showModal={showModal} setShowModal={setShowModal}  />
            </div>
            <h3 className="tittleGastos">Deseos</h3>
        </div>
    );
}
export default NavDeseos;