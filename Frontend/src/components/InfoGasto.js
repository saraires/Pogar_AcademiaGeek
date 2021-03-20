import React, {useEffect, useState} from 'react';
import { getFromLocal } from '../functions/localstorage';
import axios from '../axios/axios';

const InfoGasto = () => {
    const [infoGasto, setInfoGasto]=useState();
    const id = getFromLocal('id');
    const token = getFromLocal('authToken');
    const id_card = getFromLocal('id_card')

    const getGasto=()=>{
        axios.post('/info', {"id": id_card, "autor":id, "token":token})
        .then((res)=>{
            setInfoGasto(res.data.info[0])
        })
    }

    useEffect(()=>{
        getGasto();
    }, [])
    console.log(infoGasto)
    return (
        <div className="container_info_gastos">
            <div className="left_container">
                {/* <div>
                    <h2>{infoGasto.titulo?infoGasto.titulo:null}</h2>
                    <p>{infoGasto.descripcion?infoGasto.descripcion:null}</p>
                    <p>{infoGasto.precio<0?0:infoGasto.precio}$</p>
                    <p>{infoGasto.fecha_pago?infoGasto.fecha_pago:null}</p>
                    <p>{infoGasto.pagado? "Pagado": "No pagado"}</p>
                </div> */}
            </div>
            <div className="right_container">
                <div className="wrapper_info_right">
                    <div className="content-slide">
                        <div><h2 style={{ textAlign: "center" }}>Odio mi vida</h2></div>
                        <div className="child-tab">
                            <input type="checkbox" name="sub-tab" id="tab-4" />
                            <label htmlFor="tab-4">
                                <span>Fecha</span>
                                <div className="icon_info"><i className="fas fa-plus"></i></div>
                            </label>
                            <div className="sub-content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing thelit dolor. Utfacilis labore,
                                    exercitationem fuga minima a illo modi vitaerse dignissimos? Vero?</p>
                            </div>
                        </div>
                        <div className="child-tab">
                            <input type="checkbox" name="sub-tab" id="tab-5" />
                            <label htmlFor="tab-5">
                                <span>Pago</span>
                                <div className="icon_info"><i className="fas fa-plus"></i></div>
                            </label>
                            <div className="sub-content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing thelit dolor. Utfacilis labore,
                                    exercitationem fuga minima a illo modi vitaerse dignissimos? Vero?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default InfoGasto;