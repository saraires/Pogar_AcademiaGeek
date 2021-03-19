import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import Img from '../../../images/modal.jpg';
import { Background, ModalContent, ModalImg, ModalWrapper, CloseModalButton } from '../modalStyles/stylesModals';
import { useForm } from "react-hook-form";
import axios from '../../../axios/axios';
import {getFromLocal} from '../../../functions/localstorage';
import swal from 'sweetalert2';

const ModalGastos = ({ showModal, setShowModal }) => {
  const autor = getFromLocal('id');
  const token = getFromLocal('authToken');
  const { register, handleSubmit } = useForm();
  const onSubmit=data=>{
    axios.post('/agregargasto', {
      "titulo": data.titulo,
      "descripcion": data.descripcion,
      "precio": data.precio, 
      "fecha_pago": data.fecha, 
      "autor":autor,
      "contribucion":[{"pago": 0}],
      "token":token
    }).then((res)=>{
      if(res.status===200){
        window.location.reload();
      }else{
        swal.fire({
          title: "Error al ingresar el gasto",
          footer: "Intente de nuevo",
          icon: "error",
          confirmButtonText: "¡Entendido!",
          confirmButtonColor: "#f4f800",
        });
      }
    }).catch(()=>{
      swal.fire({
        title: "Error al ingresar el gasto",
        footer: "Intente de nuevo",
        icon: "error",
        confirmButtonText: "¡Entendido!",
        confirmButtonColor: "#f4f800",
      });
    })
  }
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 300
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  }

  return (
    <>
      {showModal ? (
        <Background ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalImg src={Img} alt="img" />
              <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h2 className="title">Añadir nuevo gasto</h2>
                  <h5>
                    Falto de pago: <i class="fas fa-times"></i> <br/> Pagado: <i class="fas fa-check"></i> 
                  </h5>
                  <div className="input-field">
                    <i className="fas fa-file-alt"></i>
                    <input type="text" required placeholder="Título" ref={register} name="titulo" />
                  </div>
                  <div className="input-field">
                    <i className="fas fa-envelope-open-text"></i>
                    <input type="text" required placeholder="Descripción" ref={register} name="descripcion" />
                  </div>
                  <div className="input-field">
                    <i className="fas fa-money-bill-wave"></i>
                    <input type="number" required placeholder="Valor" ref={register} name="precio" />
                  </div>
                  <div className="input-field">
                    <i className="fas fa-calendar-alt"></i>
                    <input type="text" required placeholder="Fecha de referencia" ref={register} name="fecha" />
                  </div>
                  <input type="submit" className="btn" value="Añadir" />
                </form>
              </ModalContent>
              <CloseModalButton aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)} />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
}

export default ModalGastos;