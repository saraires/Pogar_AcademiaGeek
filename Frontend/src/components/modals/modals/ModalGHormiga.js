import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import Img from '../../../images/modal.jpg';
import { Background, ModalContent, ModalImg, ModalWrapper, CloseModalButton } from '../modalStyles/stylesModals';
import { useForm } from "react-hook-form";
import axios from '../../../axios/axios';
import {getFromLocal} from '../../../functions/localstorage';
import swal from 'sweetalert2';

const ModalHGastos = ({ showModal, setShowModal }) => {
  const { register, handleSubmit } = useForm();
  const id=getFromLocal('id');
  const token=getFromLocal('authToken')
  const onSubmit=data=>{
    console.log(data)
    if(parseInt(data.precio)>100000){
      swal.fire({
        title: "Error al ingresar el gasto hormiga",
        text: "Si el gasto que desea ingresar sobrepasa los 100.000$, este debe ser registrado en la sección de gastos",
        footer: "Intente de nuevo",
        icon: "error",
        confirmButtonText: "¡Entendido!",
        confirmButtonColor: "#f4f800",
      });
    }else{
      axios.post('/agregarant', {
        "titulo":data.titulo,
        "descripcion":data.descripcion,
        "precio": data.precio,
        "fecha":data.fecha,
        "autor":id,
        "token":token
      }).then((res)=>{
        if(res.status===200) window.location.reload();
        else swal.fire({
          title: "Error al ingresar el gasto hormiga",
          footer: "Intente de nuevo",
          icon: "error",
          confirmButtonText: "¡Entendido!",
          confirmButtonColor: "#f4f800",
        });
      }).catch(()=>{
        swal.fire({
          title: "Error al ingresar el gasto hormiga",
          footer: "Intente de nuevo",
          icon: "error",
          confirmButtonText: "¡Entendido!",
          confirmButtonColor: "#f4f800",
        });
      }); 
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
                  <h2 className="title">Añadir nuevo gasto</h2>
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
                    <input type="date" required placeholder="Fecha" ref={register} name="fecha" />
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

export default ModalHGastos;