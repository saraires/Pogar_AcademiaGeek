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
exports.perfil = exports.singUp = exports.signIn = void 0;
const usuario_1 = __importDefault(require("../model/usuario"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const validacionJoi_1 = require("./validacionJoi");
dotenv_1.config();
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validacion con Joi
    const { error } = validacionJoi_1.validacionLogin.validate(req.body);
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
        return res.status(400).send('El correo o la contraseña ');
    // JWT
    const token = jsonwebtoken_1.default.sign({ _id: usuarioValido._id }, 'itsSomeRandomToTheSecretKey');
    res.header('authToken', token).send(usuarioValido);
});
exports.signIn = signIn;
const singUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validacion con Joi
    const { error } = validacionJoi_1.validacionRegistro.validate(req.body);
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
    const { nombre, correo, contraseña } = req.body;
    const usuario = new usuario_1.default({
        nombre,
        correo,
        contraseña: hashContraseña
    });
    try {
        const savedUser = yield usuario.save();
        // JWT
        const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, 'itsSomeRandomToTheSecretKey');
        res.header('authToken', token).send(savedUser).status(200);
    }
    catch (err) {
        res.status(400).send(err);
    }
    ;
});
exports.singUp = singUp;
const perfil = (req, res) => {
    console.log(req.header('auth-token'));
    res.send('perfil');
};
exports.perfil = perfil;
//# sourceMappingURL=auth_controller.js.map