import { Request, Response } from 'express';
import Hormiga from '../model/hormiga';
import Usuario from '../model/usuario';

// Consultar gasto hormiga (Ant)
export const verAnt = async (req: Request, res: Response) => {
    const { id } = req.body;
    const Ant = await Hormiga.find({ autor: id });
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
        const saveAnt = await agregarAnt.save(); // Guardar el gasto

        if (!saveAnt) {
            return res.status(404).send("Revisa de nuevo si los datos son correctos");
        } else {

            const id = (saveAnt._id); // id de la card
            const autor = (saveAnt.autor); // id del autor

            console.log(id);
            console.log(autor);

            // Modelo de Gastos -- Sacamos el gasto del usuario
            const card = await Hormiga.find({ _id: id }, { "precio": 1 });
            const precio = (card[card.length - 1]["precio"]);

            // Modelo de Usuario -- Sacamos el saldo total del usuario
            const usuario = await Usuario.find({ _id: autor }, { "saldo": 1 });
            const saldo = (usuario[usuario.length - 1]["saldo"]);

            // Restar... Esto me da el saldo final de la operacion
            const saldoFinal = saldo - precio;

            // Actualizamos el saldo del usuario
            const actualizarSaldo = await Usuario.findByIdAndUpdate(autor, { $set: { saldo: saldoFinal } });
            console.log(actualizarSaldo);

            res.status(200).send(saveAnt);
        }
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
    const comprobacion = await Hormiga.find({ autor: id });
    console.log(comprobacion);
    if (comprobacion[0] != undefined) {
        const Ant = await Hormiga.aggregate([{ $match: { autor: id } }, { $group: { _id: id, "Saldo": { $sum: "$precio" } } }])
        const saldo = (Ant[0]["Saldo"]);
        res.send({ saldo });
    }

    res.send({"saldo": 0});
    
}