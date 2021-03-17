"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validacionLogin = exports.validacionRegistro = void 0;
// Validaciones
const joi_1 = __importDefault(require("joi"));
// Validacion de registro
exports.validacionRegistro = joi_1.default.object({
    imagen: joi_1.default.string(),
    nombre: joi_1.default.string().min(3).required(),
    correo: joi_1.default.string().min(6).required().email(),
    contraseña: joi_1.default.string().min(6).required(),
    saldo: joi_1.default.number()
}).label('registro');
// Validacion de login
exports.validacionLogin = joi_1.default.object({
    correo: joi_1.default.string().min(6).required().email(),
    contraseña: joi_1.default.string().min(6).required()
}).label('inicio');
//# sourceMappingURL=validationJoi.js.map