import { NextFunction, Request, Response } from 'express';
import Deseos from '../model/deseos';
import Gastos from '../model/gastos';
import Usuario from '../model/usuario';

// Consultar deseos
export const verDeseo = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    try {
        const deseos = await Deseos.find({ autor: id });
        const preciodeseo = await Deseos.find({ autor: id }, { "precio": 1 });

        // Modelo de usuarios -- Sacamos el saldo
        const usuario = await Usuario.find({ _id: id }, { "saldo": 1 });
        const saldo = (usuario[usuario.length - 1]["saldo"]);

        // Modelo de gastos -- Sacamos el total de los gastos
        const hayGastos = await Gastos.find({ autor: id });

        if (hayGastos.length === 0) {
            res.send(deseos);
        } else {
            const gastos = await Gastos.aggregate([{ $match: { autor: id } }, { $group: { _id: id, "Gastos": { $sum: "$precio" } } }]);
            const gastototal = (gastos[0]["Gastos"]);

            const sobrante = (saldo - gastototal);

            preciodeseo.forEach(async (jacobo) => {
                if (jacobo["precio"] <= sobrante) {
                    const actualizarDeseo = await Deseos.findByIdAndUpdate(jacobo["_id"], { $set: { "comprable": true } });
                } else {
                    const deseonocomprable = await Deseos.findByIdAndUpdate(jacobo["_id"], { $set: { "comprable": false } });
                };
            });

            res.send(deseos);
        }

    } catch (err) {
        res.status(400).send(err);
    }

}

// Ver solo un deseo
export const verSolounDeseo = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const deseo = await Deseos.find({ _id: id });
        res.send(deseo);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Agregar deseos
export const agregarDeseo = async (req: Request, res: Response) => {
    const { titulo, descripcion, precio, autor } = req.body
    const agregarDeseo = new Deseos({
        titulo,
        descripcion,
        precio,
        autor
    });
    try {
        const saveDeseo = await agregarDeseo.save();
        res.send(saveDeseo);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Editar deseos
export const editarDeseo = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const actualizarDeseo = await Deseos.findByIdAndUpdate(id, { $set: req.body });
        res.send(actualizarDeseo);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Eliminar deseos
export const eliminarDeseo = async (req: Request, res: Response) => {
    const { id } = req.body
    try {
        const deseoEliminado = await Deseos.findByIdAndDelete({ _id: id });
        res.json({ message: 'Deseo Eliminado' });
    } catch (err) {
        res.status(400).send(err);
    }
}