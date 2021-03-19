import { Request, Response } from 'express';
import Deseos from '../model/deseos';

// Consultar deseos
export const verDeseo = async(req: Request, res: Response) => {
    const { id } = req.body;
    const deseos = await Deseos.find({ autor: id }) // ¿Los organizo?
    res.send(deseos);
}

// Agregar deseos
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

// Editar deseos
export const editarDeseo = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const actualizarDeseo = await Deseos.findByIdAndUpdate(id, { $set: req.body });
        res.send(actualizarDeseo);
    } catch (err) {
        console.log(err);
    }
}

// Eliminar deseos
export const eliminarDeseo = async (req: Request, res: Response) => {
    const { id } = req.body
    const deseoEliminado = await Deseos.findByIdAndDelete({ _id: id });
    res.json({ message: 'Deseo Eliminado' })
}

// Deseos comprables
export const condicionDeseo = (req: Request, res: Response) => {
    

    
}