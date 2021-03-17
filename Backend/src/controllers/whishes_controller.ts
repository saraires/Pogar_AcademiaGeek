import { Request, Response } from 'express';
import Deseos from '../model/deseos';

export const verDeseo = async(req: Request, res: Response) => {
    const { _id } = req.body;
    const deseos = await Deseos.find({ autor: _id }) // ¿Los organizo?
    res.send(deseos);
}

export const agregarDeseo = async(req: Request, res: Response) => {
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

export const editarDeseo = async (req: Request, res: Response) => {
    const { _id } = req.body;
    try {
        const actualizarDeseo = await Deseos.findByIdAndUpdate(_id, { $set: req.body });
        res.send(actualizarDeseo);
    } catch (err) {
        console.log(err);
    }
}

export const eliminarDeseo = async (req: Request, res: Response) => {
    const { _id } = req.body
    const deseoEliminado = await Deseos.findByIdAndDelete({ _id: _id });
    res.json({ message: 'Deseo Eliminado' })
}

export const condicionDeseo = (req: Request, res: Response) => {
    
}