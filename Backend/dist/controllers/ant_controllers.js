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
exports.editarAnt = exports.agregarAnt = exports.verAnt = void 0;
const hormiga_1 = __importDefault(require("../model/hormiga"));
// Consultar gasto hormiga (Ant)
const verAnt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    const Ant = yield hormiga_1.default.find({ autor: _id });
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
        const saveAnt = yield agregarAnt.save();
        res.send(saveAnt);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.agregarAnt = agregarAnt;
// editar gasto hormiga (Ant)
const editarAnt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    try {
        const actualizarAnt = yield hormiga_1.default.findByIdAndUpdate(_id, { $set: req.body });
        res.send(actualizarAnt);
    }
    catch (err) {
        console.log(err);
    }
});
exports.editarAnt = editarAnt;
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
//# sourceMappingURL=ant_controllers.js.map