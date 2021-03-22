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
exports.eliminarDeseo = exports.editarDeseo = exports.agregarDeseo = exports.verDeseo = void 0;
const deseos_1 = __importDefault(require("../model/deseos"));
const gastos_1 = __importDefault(require("../model/gastos"));
const usuario_1 = __importDefault(require("../model/usuario"));
// Consultar deseos
const verDeseo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const deseos = yield deseos_1.default.find({ autor: id });
    const preciodeseo = yield deseos_1.default.find({ autor: id }, { "precio": 1 });
    // Modelo de usuarios -- Sacamos el saldo
    const usuario = yield usuario_1.default.find({ _id: id }, { "saldo": 1 });
    const saldo = (usuario[usuario.length - 1]["saldo"]);
    // Modelo de gastos -- Sacamos el total de los gastos
    const hayGastos = yield gastos_1.default.find({ autor: id });
    const gastos = yield gastos_1.default.aggregate([{ $match: { autor: id } }, { $group: { _id: id, "Gastos": { $sum: "$precio" } } }]);
    const gastototal = (gastos[0]["Gastos"]);
    if (hayGastos) {
        const sobrante = (saldo - gastototal);
        preciodeseo.forEach((jacobo) => __awaiter(void 0, void 0, void 0, function* () {
            if (jacobo["precio"] < sobrante) {
                const actualizarDeseo = yield deseos_1.default.findByIdAndUpdate(jacobo["_id"], { $set: { "comprable": true } });
            }
            else {
                const deseonocomprable = yield deseos_1.default.findByIdAndUpdate(jacobo["_id"], { $set: { "comprable": false } });
            }
            ;
        }));
    }
    res.send(deseos);
});
exports.verDeseo = verDeseo;
// Agregar deseos
const agregarDeseo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, descripcion, precio, autor } = req.body;
    const agregarDeseo = new deseos_1.default({
        titulo,
        descripcion,
        precio,
        autor
    });
    try {
        const saveDeseo = yield agregarDeseo.save();
        res.send(saveDeseo);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.agregarDeseo = agregarDeseo;
// Editar deseos
const editarDeseo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const actualizarDeseo = yield deseos_1.default.findByIdAndUpdate(id, { $set: req.body });
        res.send(actualizarDeseo);
    }
    catch (err) {
        console.log(err);
    }
});
exports.editarDeseo = editarDeseo;
// Eliminar deseos
const eliminarDeseo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const deseoEliminado = yield deseos_1.default.findByIdAndDelete({ _id: id });
    res.json({ message: 'Deseo Eliminado' });
});
exports.eliminarDeseo = eliminarDeseo;
//# sourceMappingURL=whishes_controller.js.map