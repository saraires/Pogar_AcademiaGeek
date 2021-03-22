import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import Img from '../../../images/modal.jpg';
import { Background, ModalContent, ModalImg, ModalWrapper, CloseModalButton } from '../modalStyles/stylesModals';
import { useForm } from "react-hook-form";
import { getFromLocal } from '../../../functions/localstorage';
import swal from 'sweetalert2';
import axios from '../../../axios/axios';

const ModalPerfil = ({ showModal, setShowModal }) => {
  const { register, handleSubmit } = useForm();
  const id = getFromLocal('id');
  const token = getFromLocal('authToken');
  const onSubmit = data => {
    if (data.saldo.length < 5) {
      swal.fire({
        title: "Error al actualizar el saldo",
        text: "¡Si quiere cambiar el saldo, el valor a ingresar debe ser mínimo de 10.000$!",
        footer: "Intente de nuevo",
        icon: "error",
        confirmButtonText: "¡Entendido!",
        confirmButtonColor: "#F8BF00",
      });
    } else {
      axios.post('/editarsaldo', {"id":id, saldo:data.saldo, "token":token}).then((res)=>{
        if(res.status===200){
          window.location.reload();
        }
      }).catch(()=>{
        swal.fire({
          title: "Error al actualizar el saldo",
          footer: "Intente de nuevo",
          icon: "error",
          confirmButtonText: "¡Entendido!",
          confirmButtonColor: "#F8BF00",
        });
      })
    }

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
                  <h2 className="title">Actualizar saldo</h2>
                  <div className="input-field">
                    <i className="fas fa-money-bill-wave"></i>
                    <input type="number" required placeholder="Saldo" ref={register} name="saldo" />
                  </div>
                  <input type="submit" className="btn" value="Guardar" />
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

export default ModalPerfil;