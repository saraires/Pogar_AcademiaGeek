import { Request, Response } from 'express';
import Gastos from '../model/gastos';
import Usuario from '../model/usuario';

// Consultar gastos
export const verGastos = async (req: Request, res: Response) => {
    const { id } = req.body;
    const gastos = await Gastos.find({ autor: id })
    res.send(gastos);
}

// Agregar gastos
export const agregarGastos = async (req: Request, res: Response) => {
    const { titulo, descripcion, precio, fecha_pago, pagado, fijo, contribucion, autor } = req.body
    const gasto = new Gastos({
        titulo,
        descripcion,
        precio,
        fecha_pago,
        pagado,
        fijo,
        contribucion,
        autor
    });
    try {
        const saveGasto = await gasto.save();
        res.send(saveGasto);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Editar gastos
export const editarGastos = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const actualizarGasto = await Gastos.findByIdAndUpdate(id, { $set: req.body });
        res.send(actualizarGasto);
    } catch (err) {
        console.log(err);
    }

}

// -----------------------  GASTOS PAGOS  ----------------------- //

export const gastosPagos = async (req: Request, res: Response) => {
    const { id } = req.body;
    const pagos = await Gastos.find({ $and: [{ pagado: true }, { autor: id }] })
    res.send(pagos);
}

/*//Fijos
export const pagosFijo = async (req: Request, res: Response) => {
    const { _id } = req.body;
    const pagosfijo = await Gastos.find({ $and: [{ pagado: true }, { fijo: true}, { autor: _id }] })
    res.send(pagosfijo);
}

// No Fijos
export const pagosNoFijo = async (req: Request, res: Response) => {
    const { _id } = req.body;
    const pagosnofijo = await Gastos.find({ $and: [{ pagado: true }, { fijo: false}, { autor: _id }] })
    res.send(pagosnofijo); 
}*/


// ---------------------  GASTOS NO PAGOS  --------------------- //

export const gastosNoPagos = async (req: Request, res: Response) => {
    const { id } = req.body;
    const nopagos = await Gastos.find({ $and: [{ pagado: false }, { autor: id }] })
    res.send(nopagos);
}

/*// Fijos

export const noPagosFijo = async (req: Request, res: Response) => {
    const { _id } = req.body;
    const pagosfijo = await Gastos.find({ $and: [{ pagado: false }, { fijo: true}, { autor: _id }] })
    res.send(pagosfijo);
}

// No Fijos
export const noPagosNoFijo = async (req: Request, res: Response) => {
    const { _id } = req.body;
    const pagosnofijo = await Gastos.find({ $and: [{ pagado: false }, { fijo: false}, { autor: _id }] })
    res.send(pagosnofijo);
}*/

// Pagar gastos
export const pagar = async (req: Request, res: Response) => {
    const { id, autor } = req.body; // id es de la tarjeta y autor es el id del usuario
    try {

        // Modelo de Gastos
        const card = await Gastos.findById(id);
        if (!card) { return ("Fallo"); } // Control de error
        const aporte = (card.contribucion[card.contribucion.length - 1]["pago"]); // Lo que el usuario esta pagando
        const cuesta = (card.precio) // Cuanto es lo que debe al gasto, precio total del gasto, deuda en si.

        // Modelo de Usuario
        const usuario = await Usuario.find({ _id: autor }, { "saldo": 1 }); // se trae el saldo del usuario con un id
        const saldo = (usuario[usuario.length - 1]["saldo"]); // Del array devuelve solo el saldo

        const saldoFinal = saldo - aporte; // Restar... Esto me da el saldo
        const cuestaFinal = cuesta - aporte; // Restar... Esto me da en cuanto queda la deuda

        // Actualizar Saldo del usuario
        const actualizarSaldo = await Usuario.findByIdAndUpdate(autor, { $set: {saldo : saldoFinal} });
        console.log(actualizarSaldo);
        
        // Actualizar cantidad de la deuda
        const actualizarGasto = await Gastos.findByIdAndUpdate(id, { $set: {precio : cuestaFinal} });
        console.log(actualizarGasto);

        res.status(200).send("Ok");
    } catch (err) {
    console.log(err);
}
};

// Informacion de gastos y contribucion

// export const infoAporte = async (req: Request, res: Response) => {
//     const { id } = req.body;
//     const gastos = await Gastos.find({ autor: id })
//     res.send(gastos);
// }