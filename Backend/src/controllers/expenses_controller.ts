import { Request, Response } from 'express';
import Gastos from '../model/gastos';

// Consultar gastos
export const verGastos = async (req: Request, res: Response) => {
    const { _id } = req.body;
    const gastos = await Gastos.find({ autor: _id }) // ¿Los organizo?
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
    const { _id } = req.body;
    try {
        const actualizarGasto = await Gastos.findByIdAndUpdate(_id, { $set: req.body });
        res.send(actualizarGasto);
    } catch (err) {
        console.log(err);
    }
    
}

// -----------------------  GASTOS PAGOS  ----------------------- //

// Fijos
export const pagosFijo = async (req: Request, res: Response) => {
    const { _id } = req.body;
    const pagosfijo = await Gastos.find({ $and: [{ pagado: true }, { fijo: true}, { autor: _id }] }) // ¿Los organizo?
    res.send(pagosfijo);
}

// No Fijos
export const pagosNoFijo = async (req: Request, res: Response) => {
    const { _id } = req.body;
    const pagosnofijo = await Gastos.find({ $and: [{ pagado: true }, { fijo: false}, { autor: _id }] }) // ¿Los organizo?
    res.send(pagosnofijo);
}


// ---------------------  GASTOS NO PAGOS  --------------------- //

// Fijos
export const noPagosFijo = async (req: Request, res: Response) => {
    const { _id } = req.body;
    const pagosfijo = await Gastos.find({ $and: [{ pagado: false }, { fijo: true}, { autor: _id }] }) // ¿Los organizo?
    res.send(pagosfijo);
}

// No Fijos
export const noPagosNoFijo = async (req: Request, res: Response) => {
    const { _id } = req.body;
    const pagosnofijo = await Gastos.find({ $and: [{ pagado: false }, { fijo: false}, { autor: _id }] }) // ¿Los organizo?
    res.send(pagosnofijo);
}