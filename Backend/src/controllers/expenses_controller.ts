import { Request, Response } from 'express';
import Gastos from '../model/gastos';

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
    const { id } = req.body;
    try {
        const card = await Gastos.findById(id);
        if (!card) { return ("Fallo"); }
        const aporte = (card.contribucion[card.contribucion.length - 1]["pago"]);
        res.send(aporte)
    } catch (err) {
        console.log(err);
    }
};