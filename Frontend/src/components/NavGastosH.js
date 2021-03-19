import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from './modals/modalStyles/stylesModals';
import ModalHGastos from './modals/modals/ModalGHormiga';
import axios from '../axios/axios';
import { getFromLocal } from '../functions/localstorage';

const NavGastosH = () => {
    const [compras, setCompras] = useState();
    const [showModal, setShowModal] = useState(false);
    const token = getFromLocal('authToken');
    const id = getFromLocal('id');

    const getComprasHormiga = () => {
        axios.post('/comprasant', { "id": id, "token": token })
            .then((res) => {
                setCompras(res.data['saldo'])
            })
    }

    const openModal = () => {
        setShowModal(prev => !prev);
    }

    useEffect(() => {
        getComprasHormiga();
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <div className="navbar">
                <div className="menu">
                    <Link to="/menu" style={{ textDecoration: "none", color: "white" }}><h3 className="logo">PoGar</h3></Link>
                    <Container>
                        <Button className="btn-modal" onClick={openModal}>Añadir gasto</Button>
                    </Container>
                    <ModalHGastos showModal={showModal} setShowModal={setShowModal} />
                </div>
            </div>
            <h3 className="tittleGastos">Gastos hormiga</h3>
            <h3 className="tittHormiga">Total consumido en gastos hormiga: {compras!==0? <strong className="compraH">{compras}$</strong>:null}</h3>
        </div>
    );
}
export default NavGastosH;