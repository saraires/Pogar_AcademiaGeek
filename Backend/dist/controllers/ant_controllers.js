"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comprasAnt = exports.editarAnt = exports.agregarAnt = exports.verAnt = void 0;
const hormiga_1 = __importDefault(require("../model/hormiga"));
const usuario_1 = __importDefault(require("../model/usuario"));
// Consultar gasto hormiga (Ant)
const verAnt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const Ant = yield hormiga_1.default.find({ autor: id });
    res.send(Ant);
});
exports.verAnt = verAnt;
// Agregar gasto hormiga (Ant)
const agregarAnt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, descripcion, precio, autor } = req.body;
    const agregarAnt = new hormiga_1.default({
        titulo,
        descripcion,
        precio,
        autor
    });
    try {
        const saveAnt = yield agregarAnt.save(); // Guardar el gasto
        if (!saveAnt) {
            return res.status(404).send("Revisa de nuevo si los datos son correctos");
        }
        else {
            const id = (saveAnt._id); // id de la card
            const autor = (saveAnt.autor); // id del autor
            console.log(id);
            console.log(autor);
            // Modelo de Gastos -- Sacamos el gasto del usuario
            const card = yield hormiga_1.default.find({ _id: id }, { "precio": 1 });
            const precio = (card[card.length - 1]["precio"]);
            // Modelo de Usuario -- Sacamos el saldo total del usuario
            const usuario = yield usuario_1.default.find({ _id: autor }, { "saldo": 1 });
            const saldo = (usuario[usuario.length - 1]["saldo"]);
            // Restar... Esto me da el saldo final de la operacion
            const saldoFinal = saldo - precio;
            // Actualizamos el saldo del usuario
            const actualizarSaldo = yield usuario_1.default.findByIdAndUpdate(autor, { $set: { saldo: saldoFinal } });
            console.log(actualizarSaldo);
            res.status(200).send(saveAnt);
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.agregarAnt = agregarAnt;
// editar gasto hormiga (Ant)
const editarAnt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const editarAnt = yield hormiga_1.default.findByIdAndUpdate(id, { $set: req.body });
        console.log(editarAnt);
        res.send(editarAnt);
    }
    catch (err) {
        console.log(err);
    }
});
exports.editarAnt = editarAnt;
// Total de dinero empleado en gastos hormiga
const comprasAnt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const comprobacion = yield hormiga_1.default.find({ autor: id });
    console.log(comprobacion);
    if (comprobacion[0] != undefined) {
        const Ant = yield hormiga_1.default.aggregate([{ $match: { autor: id } }, { $group: { _id: id, "Saldo": { $sum: "$precio" } } }]);
        const saldo = (Ant[0]["Saldo"]);
        res.send({ saldo });
    }
    res.send({ "saldo": 0 });
});
exports.comprasAnt = comprasAnt;
//# sourceMappingURL=ant_controllers.js.map