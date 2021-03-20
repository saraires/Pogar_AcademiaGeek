import React, { useEffect, useState } from 'react';
import { getFromLocal } from '../functions/localstorage';
import axios from '../axios/axios';

const InfoGasto = () => {
    const [infoGasto, setInfoGasto] = useState({});
    const [aportes, setAportes] = useState([]);
    let aumentador=0;
    const id = getFromLocal('id');
    const token = getFromLocal('authToken');
    const id_card = getFromLocal('id_card')

    const getGasto = () => {
        axios.post('/info', { "id": id_card, "autor": id, "token": token })
            .then((res) => {
                setAportes(res.data.aporte[0]['contribucion'])
                setInfoGasto(res.data.info[0])
            })
    }

    const contador=()=>{
        return aumentador+=1;
    }

    const transformer = (data) => {
        const fecha = data.split("T");
        return fecha[0];
    }

    useEffect(() => {
        getGasto();
        // eslint-disable-next-line
    }, []);
    console.log(aportes)
    return (
        <div className="container_info_gastos">
            <div className="left_container">
                <div className="container_info_card">
                    <h2>{infoGasto.titulo ? infoGasto.titulo : null}</h2>
                    <p>{infoGasto.descripcion ? infoGasto.descripcion : null}</p>
                    <p>{infoGasto.precio < 0 ? 0 : infoGasto.precio}$</p>
                    <p>{infoGasto.fecha_pago ? infoGasto.fecha_pago : null}</p>
                    <p>{infoGasto.pagado ? "Pagado" : "No pagado"}</p>
                </div>
            </div>
            <div className="right_container">
                <div className="wrapper_info_right">
                    {aportes.map((item)=>(
                        <div key={item._id} className="content-slide">
                            <br/>
                        <div><h2 style={{ textAlign: "center" }}>Aporte {contador()}</h2></div>
                        <br/>
                        <div className="child-tab">
                            <input type="checkbox" name="sub-tab" id={item._id} />
                            <label htmlFor={item._id}>
                                <span>Fecha del aporte</span>
                                <div className="icon_info"><i className="fas fa-plus"></i></div>
                            </label>
                            <div className="sub-content">
                                <p>{transformer(item.fecha)}</p>
                            </div>
                        </div>
                        <div className="child-tab">
                            <input type="checkbox" name="sub-tab" id={item._id+"1"} />
                            <label htmlFor={item._id+"1"}>
                                <span>Valor del aporte</span>
                                <div className="icon_info"><i className="fas fa-plus"></i></div>
                            </label>
                            <div className="sub-content">
                                <p>{item.pago}</p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>

    );
}
export default InfoGasto;