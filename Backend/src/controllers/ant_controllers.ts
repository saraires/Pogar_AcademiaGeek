import { Request, Response } from 'express';
import Hormiga from '../model/hormiga';

// Consultar gasto hormiga (Ant)
export const verAnt = async (req: Request, res: Response) => {
    const { id } = req.body;
    const Ant = await Hormiga.find({ autor: id })
    res.send(Ant);
}

// Agregar gasto hormiga (Ant)
export const agregarAnt = async (req: Request, res: Response) => {
    const { titulo, descripcion, precio, autor } = req.body
    const agregarAnt = new Hormiga({
        titulo,
        descripcion,
        precio,
        autor
    });
    try {
        const saveAnt = await agregarAnt.save();
        res.send(saveAnt);
    } catch (err) {
        res.status(400).send(err);
    }
}

// editar gasto hormiga (Ant)
export const editarAnt = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const editarAnt = await Hormiga.findByIdAndUpdate(id, { $set: req.body });
        console.log(editarAnt);
        res.send(editarAnt);
    } catch (err) {
        console.log(err);
    }
}

// Total de dinero empleado en gastos hormiga
export const comprasAnt = async (req: Request, res: Response) => {
    const { id } = req.body;
    const Ant = await Hormiga.aggregate([{ $group: { _id: id, "Saldo": { $sum: "$precio" } } }])
    const saldo = (Ant[0]["Saldo"]);
    res.send({saldo});
}