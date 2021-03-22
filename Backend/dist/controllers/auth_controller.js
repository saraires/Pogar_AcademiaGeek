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
exports.editarImagen = exports.editarSaldo = exports.perfil = exports.singUp = exports.signIn = void 0;
const usuario_1 = __importDefault(require("../model/usuario"));
const validationJoi_1 = require("./validationJoi");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const claveToken = 'itsSomeRandomToTheSecretKey';
// Login
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validacion con Joi
    const { error } = validationJoi_1.validacionLogin.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    // Traemos las variables del body
    const { correo, contraseña } = req.body;
    // El correo existe?
    const usuarioValido = yield usuario_1.default.findOne({ correo: correo });
    if (!usuarioValido)
        return res.status(400).send('El correo o la contraseña son incorrectos');
    // La contraseña si es la correcta?
    const contraseñaValida = yield bcrypt_1.default.compare(contraseña, usuarioValido.contraseña);
    if (!contraseñaValida)
        return res.status(400).send('El correo o la contraseña son incorrectos');
    // JWT
    const token = jsonwebtoken_1.default.sign({ _id: usuarioValido._id }, claveToken);
    res.send({ "usuarioValido": usuarioValido, "authToken": token });
});
exports.signIn = signIn;
// Sing Up
const singUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validacion con Joi
    const { error } = validationJoi_1.validacionRegistro.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    // Validar si el correo ya existe
    const emailExistente = yield usuario_1.default.findOne({ correo: req.body.correo });
    if (emailExistente)
        return res.status(400).send('El correo ya existe');
    // Encriptar contraseña
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashContraseña = yield bcrypt_1.default.hash(req.body.contraseña, salt);
    // Creacion de usuarios
    const { nombre, correo, imagen } = req.body;
    const usuario = new usuario_1.default({
        nombre,
        correo,
        contraseña: hashContraseña,
        imagen
    });
    try {
        const savedUser = yield usuario.save();
        // JWT
        const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, claveToken);
        res.send({ "usuarioValido": savedUser, "authToken": token });
    }
    catch (err) {
        res.status(400).send(err);
    }
    ;
});
exports.singUp = singUp;
// Consultar perfil
const perfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const perfil = yield usuario_1.default.find({ _id: id });
        res.send(perfil);
    }
    catch (err) {
        console.log(err);
    }
});
exports.perfil = perfil;
// Editar o agregar saldo
const editarSaldo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, saldo } = req.body;
    try {
        const actualizarSaldo = yield usuario_1.default.findByIdAndUpdate(id, { $inc: { 'saldo': saldo } });
        res.send(actualizarSaldo);
    }
    catch (err) {
        console.log(err);
    }
});
exports.editarSaldo = editarSaldo;
// Agregar una imagen al usuario
const editarImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, imagen } = req.body;
    try {
        const actualizarImagen = yield usuario_1.default.findByIdAndUpdate(id, { $set: { 'imagen': imagen } });
        console.log(actualizarImagen);
        res.send(actualizarImagen);
    }
    catch (err) {
        console.log(err);
    }
});
exports.editarImagen = editarImagen;
//# sourceMappingURL=auth_controller.js.map