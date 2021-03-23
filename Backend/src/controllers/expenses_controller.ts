import { Request, Response } from 'express';
import Gastos from '../model/gastos';
import Usuario from '../model/usuario';

// Consultar gastos
export const verGastos = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const gastos = await Gastos.find({ autor: id })
        res.send(gastos);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Ver solo un gasto
export const verSolounGasto = async (req: Request, res: Response) => {
    const { id } = req.body;
    console.log(id);
    try {
        const gasto = await Gastos.findById(id);
        res.send(gasto);
    } catch (err) {
        res.status(400).send(err);
    }
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
        res.status(400).send(err);
    }

}

// Consultar gastos pagos
export const gastosPagos = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const pagos = await Gastos.find({ $and: [{ pagado: true }, { autor: id }] })
        res.send(pagos);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Consultar gastos no pagos
export const gastosNoPagos = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const nopagos = await Gastos.find({ $and: [{ pagado: false }, { autor: id }] })
        res.send(nopagos);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Pagar gastos
export const pagar = async (req: Request, res: Response) => {
    const { id, autor, pago } = req.body; // id es de la tarjeta y autor es el id del usuario
    try {
        // Modelo de Gastos
        const card = await Gastos.findById(id);
        if (!card) { return ("Fallo"); } // Control de error
        const cuesta = (card.precio) // Cuanto es lo que debe al gasto, precio total del gasto, deuda en si.
        const aporte = pago // Lo que el usuario esta pagando
        let contribucion = card.contribucion

        // Modelo de Usuario
        const usuario = await Usuario.find({ _id: autor }, { "saldo": 1 }); // se trae el saldo del usuario con un id
        const saldo = (usuario[usuario.length - 1]["saldo"]); // Del array devuelve solo el saldo

        if (saldo >= aporte) { // verificamos que si haya dinero sificiente para realizar la transacción

            const saldoFinal = saldo - aporte; // Restar... Esto me da el saldo
            const cuestaFinal = cuesta - aporte; // Restar... Esto me da en cuanto queda la deuda

            // Actualizar Saldo del usuario
            const actualizarSaldo = await Usuario.findByIdAndUpdate(autor, { $set: { saldo: saldoFinal } });

            // Actualizar cantidad de la deuda
            const actualizarGasto = await Gastos.findByIdAndUpdate(id, { $set: { precio: cuestaFinal } });

            // Agregar contribucion al historial
            const agregarContribucion = { "pago": aporte }
            contribucion.push(agregarContribucion);

            const saveContribucion = await Gastos.findByIdAndUpdate(id, { $set: { contribucion: contribucion } });
            console.log(saveContribucion);

            if (cuestaFinal <= 0) {
                const pagado = await Gastos.findByIdAndUpdate(id, { $set: { pagado: true } });
            }

            res.status(200).send("Ok");

        } else {
            res.send("sin saldo");
        }
    } catch (err) {
        res.status(400).send(err);
    }
};

// Informacion de gastos y contribucion
export const infoAporte = async (req: Request, res: Response) => {
    const { id, autor } = req.body;
    try {
        // Traer solo los datos de info 
        const info = await Gastos.find({ $and: [{ _id: id }, { autor: autor }] }, { "titulo": 1, "descripcion": 1, "precio": 1, "fecha_pago": 1, "pagado": 1, "fijo": 1, "autor": 1 });

        // Traer solo la contribucion 
        const aporte = await Gastos.find({ $and: [{ _id: id }, { autor: autor }] }, { "contribucion": 1 });

        // Envio en un Json por separado ambas constantes
        res.send({ "info": info, "aporte": aporte });
    }
    catch (err) {
        res.status(400).send(err);
    }
}