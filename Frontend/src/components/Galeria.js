import React from 'react';
import axios from '../axios/axios';
import swal from 'sweetalert2';
import { getFromLocal } from '../functions/localstorage';

function Galeria() {

    const id = getFromLocal('id');
    const token = getFromLocal('authToken');

    const img1 = "https://user-images.githubusercontent.com/66284121/111932163-e3fc1300-8a8a-11eb-990d-7b3cc05ad1c0.png";
    const img2 = "https://user-images.githubusercontent.com/66284121/111932161-e3637c80-8a8a-11eb-86a1-934834462b13.png";
    const img3 = "https://user-images.githubusercontent.com/66284121/111932160-e3637c80-8a8a-11eb-9f22-35414047a4a4.png";
    const img4 = "https://user-images.githubusercontent.com/66284121/111932168-e494a980-8a8a-11eb-8905-da3b38382eed.png";
    const img5 = "https://user-images.githubusercontent.com/66284121/111932166-e3fc1300-8a8a-11eb-8122-daedc3892209.png";
    const img6 = "https://user-images.githubusercontent.com/66284121/111932165-e3fc1300-8a8a-11eb-8362-474674ec9ac1.png";

    return (
        <div className="container-profiles">
            <div className="img-profile" onClick={() => {
                swal.fire({
                    title: "¿Seguro que quieres elegir esta imagen?",
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Elegir',
                    confirmButtonColor: '#F8BF00',
                }).then(sarai => {
                    if (sarai.isConfirmed) {
                        axios.post("/imagen", { id: id, token: token, imagen: img1 })
                            .then(res => {
                                if (res.status === 200) {
                                    swal.fire({
                                        title: "Actualizado con exito",
                                        confirmButtonText: 'Elegir',
                                        confirmButtonColor: '#F8BF00',
                                    }).then(sarai => {
                                        if (sarai.isConfirmed) {
                                            window.location.href = "/perfil";
                                        }
                                    });
                                }
                            });
                    }
                });
            }}>
                <div className="containerHoverImg">
                    <div className="hoverImg">
                        <i className="fas fa-images"></i>
                        <p>Elegir esta imagen</p>
                    </div>
                </div>
                <img src={img1} />
            </div>
            <div className="img-profile" onClick={() => {
                swal.fire({
                    title: "¿Seguro que quieres elegir esta imagen?",
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Elegir',
                    confirmButtonColor: '#F8BF00',
                }).then(sarai => {
                    if (sarai.isConfirmed) {
                        axios.post("/imagen", { id: id, token: token, imagen: img2 })
                            .then(res => {
                                if (res.status === 200) {
                                    swal.fire({
                                        title: "Actualizado con exito",
                                        confirmButtonText: 'Elegir',
                                        confirmButtonColor: '#F8BF00',
                                    }).then(sarai => {
                                        if (sarai.isConfirmed) {
                                            window.location.href = "/perfil";
                                        }
                                    });
                                }
                            });
                    }
                });
            }}>
                <div className="containerHoverImg">
                    <div className="hoverImg">
                        <i className="fas fa-images"></i>
                        <p>Elegir esta imagen</p>
                    </div>
                </div>
                <img src={img2} />
            </div>
            <div className="img-profile" onClick={() => {
                swal.fire({
                    title: "¿Seguro que quieres elegir esta imagen?",
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Elegir',
                    confirmButtonColor: '#F8BF00',
                }).then(sarai => {
                    if (sarai.isConfirmed) {
                        axios.post("/imagen", { id: id, token: token, imagen: img3 })
                            .then(res => {
                                if (res.status === 200) {
                                    swal.fire({
                                        title: "Actualizado con exito",
                                        confirmButtonText: 'Elegir',
                                        confirmButtonColor: '#F8BF00',
                                    }).then(sarai => {
                                        if (sarai.isConfirmed) {
                                            window.location.href = "/perfil";
                                        }
                                    });
                                }
                            });
                    }
                });
            }}>
                <div className="containerHoverImg">
                    <div className="hoverImg">
                        <i className="fas fa-images"></i>
                        <p>Elegir esta imagen</p>
                    </div>
                </div>
                <img src={img3} />
            </div>
            <div className="img-profile" onClick={() => {
                swal.fire({
                    title: "¿Seguro que quieres elegir esta imagen?",
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Elegir',
                    confirmButtonColor: '#F8BF00',
                }).then(sarai => {
                    if (sarai.isConfirmed) {
                        axios.post("/imagen", { id: id, token: token, imagen: img4 })
                            .then(res => {
                                if (res.status === 200) {
                                    swal.fire({
                                        title: "Actualizado con exito",
                                        confirmButtonText: 'Elegir',
                                        confirmButtonColor: '#F8BF00',
                                    }).then(sarai => {
                                        if (sarai.isConfirmed) {
                                            window.location.href = "/perfil";
                                        }
                                    });
                                }
                            });
                    }
                });
            }}>
                <div className="containerHoverImg">
                    <div className="hoverImg">
                        <i className="fas fa-images"></i>
                        <p>Elegir esta imagen</p>
                    </div>
                </div>
                <img src={img4} />
            </div>
            <div className="img-profile" onClick={() => {
                swal.fire({
                    title: "¿Seguro que quieres elegir esta imagen?",
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Elegir',
                    confirmButtonColor: '#F8BF00',
                }).then(sarai => {
                    if (sarai.isConfirmed) {
                        axios.post("/imagen", { id: id, token: token, imagen: img5 })
                            .then(res => {
                                if (res.status === 200) {
                                    swal.fire({
                                        title: "Actualizado con exito",
                                        confirmButtonText: 'Elegir',
                                        confirmButtonColor: '#F8BF00',
                                    }).then(sarai => {
                                        if (sarai.isConfirmed) {
                                            window.location.href = "/perfil";
                                        }
                                    });
                                }
                            });
                    }
                });
            }}>
                <div className="containerHoverImg">
                    <div className="hoverImg">
                        <i className="fas fa-images"></i>
                        <p>Elegir esta imagen</p>
                    </div>
                </div>
                <img src={img5} />
            </div>
            <div className="img-profile" onClick={() => {
                swal.fire({
                    title: "¿Seguro que quieres elegir esta imagen?",
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Elegir',
                    confirmButtonColor: '#F8BF00',
                }).then(sarai => {
                    if (sarai.isConfirmed) {
                        axios.post("/imagen", { id: id, token: token, imagen: img6 })
                            .then(res => {
                                if (res.status === 200) {
                                    swal.fire({
                                        title: "Actualizado con exito",
                                        confirmButtonText: 'Elegir',
                                        confirmButtonColor: '#F8BF00',
                                    }).then(sarai => {
                                        if (sarai.isConfirmed) {
                                            window.location.href = "/perfil";
                                        }
                                    });
                                }
                            });
                    }
                });
            }}>
                <div className="containerHoverImg">
                    <div className="hoverImg">
                        <i className="fas fa-images"></i>
                        <p>Elegir esta imagen</p>
                    </div>
                </div>
                <img src={img6} />
            </div>
        </div>
    );
}

export default Galeria;