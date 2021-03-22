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
exports.infoAporte = exports.pagar = exports.gastosNoPagos = exports.gastosPagos = exports.editarGastos = exports.agregarGastos = exports.verGastos = void 0;
const gastos_1 = __importDefault(require("../model/gastos"));
const usuario_1 = __importDefault(require("../model/usuario"));
// Consultar gastos
const verGastos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const gastos = yield gastos_1.default.find({ autor: id });
    res.send(gastos);
});
exports.verGastos = verGastos;
// Agregar gastos
const agregarGastos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, descripcion, precio, fecha_pago, pagado, fijo, contribucion, autor } = req.body;
    const gasto = new gastos_1.default({
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
        const saveGasto = yield gasto.save();
        res.send(saveGasto);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.agregarGastos = agregarGastos;
// Editar gastos
const editarGastos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const actualizarGasto = yield gastos_1.default.findByIdAndUpdate(id, { $set: req.body });
        res.send(actualizarGasto);
    }
    catch (err) {
        console.log(err);
    }
});
exports.editarGastos = editarGastos;
// -----------------------  GASTOS PAGOS  ----------------------- //
const gastosPagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const pagos = yield gastos_1.default.find({ $and: [{ pagado: true }, { autor: id }] });
    res.send(pagos);
});
exports.gastosPagos = gastosPagos;
/*//Fijos
export const pagosFijo = async (req: Request, res: Response) => {
    const { _id } = req.body;
    const pagosfijo = await Gastos.find({ $and: [{ pagado: true }, { fijo: true}, { autor: _id }] })
    res.send(pagosfijo);
}

// No Fijos
export const pagosNoFijo = async (req: Request, res: Response) => {
    const { _id } = req.body;
    const pagosnofijo = await Gastos.find({ $and: [{ pagado: true }, { fijo: false}, { autor: _id }] })
    res.send(pagosnofijo);
}*/
// ---------------------  GASTOS NO PAGOS  --------------------- //
const gastosNoPagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const nopagos = yield gastos_1.default.find({ $and: [{ pagado: false }, { autor: id }] });
    res.send(nopagos);
});
exports.gastosNoPagos = gastosNoPagos;
/*// Fijos

export const noPagosFijo = async (req: Request, res: Response) => {
    const { _id } = req.body;
    const pagosfijo = await Gastos.find({ $and: [{ pagado: false }, { fijo: true}, { autor: _id }] })
    res.send(pagosfijo);
}

// No Fijos
export const noPagosNoFijo = async (req: Request, res: Response) => {
    const { _id } = req.body;
    const pagosnofijo = await Gastos.find({ $and: [{ pagado: false }, { fijo: false}, { autor: _id }] })
    res.send(pagosnofijo);
}*/
// Pagar gastos
const pagar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, autor, pago } = req.body; // id es de la tarjeta y autor es el id del usuario
    try {
        // Modelo de Gastos
        const card = yield gastos_1.default.findById(id);
        if (!card) {
            return ("Fallo");
        } // Control de error
        const cuesta = (card.precio); // Cuanto es lo que debe al gasto, precio total del gasto, deuda en si.
        const aporte = pago; // Lo que el usuario esta pagando
        let contribucion = card.contribucion;
        // Modelo de Usuario
        const usuario = yield usuario_1.default.find({ _id: autor }, { "saldo": 1 }); // se trae el saldo del usuario con un id
        const saldo = (usuario[usuario.length - 1]["saldo"]); // Del array devuelve solo el saldo
        if (saldo >= aporte) { // verificamos que si haya dinero sificiente para realizar la transacción
            const saldoFinal = saldo - aporte; // Restar... Esto me da el saldo
            const cuestaFinal = cuesta - aporte; // Restar... Esto me da en cuanto queda la deuda
            // Actualizar Saldo del usuario
            const actualizarSaldo = yield usuario_1.default.findByIdAndUpdate(autor, { $set: { saldo: saldoFinal } });
            // Actualizar cantidad de la deuda
            const actualizarGasto = yield gastos_1.default.findByIdAndUpdate(id, { $set: { precio: cuestaFinal } });
            // Agregar contribucion al historial
            const agregarContribucion = { "pago": aporte };
            contribucion.push(agregarContribucion);
            const saveContribucion = yield gastos_1.default.findByIdAndUpdate(id, { $set: { contribucion: contribucion } });
            console.log(saveContribucion);
            if (cuesta <= 0) {
                const pagado = yield gastos_1.default.findByIdAndUpdate(id, { $set: { pagado: true } });
            }
            res.status(200).send("Ok");
        }
        else {
            return ("No se puede hacer la transacción");
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.pagar = pagar;
// Informacion de gastos y contribucion
const infoAporte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, autor } = req.body;
    try {
        // Traer solo los datos de info 
        const info = yield gastos_1.default.find({ $and: [{ _id: id }, { autor: autor }] }, { "titulo": 1, "descripcion": 1, "precio": 1, "fecha_pago": 1, "pagado": 1, "fijo": 1, "autor": 1 });
        // Traer solo la contribucion 
        const aporte = yield gastos_1.default.find({ $and: [{ _id: id }, { autor: autor }] }, { "contribucion": 1 });
        // Envio en un Json por separado ambas constantes
        res.send({ "info": info, "aporte": aporte });
    }
    catch (err) {
        console.log(err);
    }
});
exports.infoAporte = infoAporte;
//# sourceMappingURL=expenses_controller.js.map