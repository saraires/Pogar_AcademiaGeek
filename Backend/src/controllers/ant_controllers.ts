import { Request, Response } from 'express';
import Hormiga from '../model/hormiga';

// Consultar gasto hormiga (Ant)
export const verAnt = async(req: Request, res: Response) => {
    const { _id } = req.body;
    const Ant = await Hormiga.find({ autor: _id })
    res.send(Ant);
}

// Agregar gasto hormiga (Ant)
export const agregarAnt = async(req: Request, res: Response) => {
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
    const { _id } = req.body;
    try {
        const actualizarAnt = await Hormiga.findByIdAndUpdate(_id, { $set: req.body });
        res.send(actualizarAnt);
    } catch (err) {
        console.log(err);
    }
}

// Total de dinero empleado en gastos hormiga
// export const comprasAnt = async(req: Request, res: Response) => {
//     const { _id } = req.body;
//     const Ant = await Hormiga.find(
//         { $and: [{ autor: _id }, ] }
        
        
        
//         // {$and{
//         //     { $match: { autor : _id } },
//         //     { $group: { 
//         //         compras-ant: { $sum: "$votes" } 
//         //     }}}};

//     res.send(Ant);
// }