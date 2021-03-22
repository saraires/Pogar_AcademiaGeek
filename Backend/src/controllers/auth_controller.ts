import { Request, Response } from 'express';
import Usuario from '../model/usuario';
import { validacionRegistro, validacionLogin } from './validationJoi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const claveToken = 'itsSomeRandomToTheSecretKey';

// Login
export const signIn = async (req: Request, res: Response) => {

    // Validacion con Joi
    const { error } = validacionLogin.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Traemos las variables del body
    const { correo, contraseña } = req.body;

    // El correo existe?
    const usuarioValido = await Usuario.findOne({ correo: correo });
    if (!usuarioValido) return res.status(400).send('El correo o la contraseña son incorrectos');

    // La contraseña si es la correcta?
    const contraseñaValida = await bcrypt.compare(contraseña, usuarioValido.contraseña);
    if (!contraseñaValida) return res.status(400).send('El correo o la contraseña son incorrectos');

    // JWT
    const token: string = jwt.sign({ _id: usuarioValido._id }, claveToken);
    res.send({ "usuarioValido": usuarioValido, "authToken": token });
};

// Sing Up
export const singUp = async (req: Request, res: Response) => {

    // Validacion con Joi
    const { error } = validacionRegistro.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Validar si el correo ya existe
    const emailExistente = await Usuario.findOne({ correo: req.body.correo });
    if (emailExistente) return res.status(400).send('El correo ya existe');

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashContraseña = await bcrypt.hash(req.body.contraseña, salt);

    // Creacion de usuarios
    const { nombre, correo, imagen } = req.body
    const usuario = new Usuario({
        nombre,
        correo,
        contraseña: hashContraseña,
        imagen
    });
    try {
        const savedUser = await usuario.save();
        // JWT
        const token: string = jwt.sign({ _id: savedUser._id }, claveToken);
        res.send({ "usuarioValido": savedUser, "authToken": token });
    } catch (err) {
        res.status(400).send(err);
    };
};

// Consultar perfil
export const perfil = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const perfil = await Usuario.find({ _id: id });
        res.send(perfil);
    } catch (err) {
        console.log(err);
    }
};

// Editar o agregar saldo
export const editarSaldo = async (req: Request, res: Response) => {
    const { id, saldo } = req.body;
    try {
        const actualizarSaldo = await Usuario.findByIdAndUpdate(id, { $inc: { 'saldo': saldo } });
        res.send(actualizarSaldo);
    } catch (err) {
        console.log(err);
    }
};

// Agregar una imagen al usuario
export const editarImagen = async (req: Request, res: Response) => {
    const { id, imagen } = req.body;
    try {
        const actualizarImagen = await Usuario.findByIdAndUpdate(id, { $set: { 'imagen': imagen } });
        console.log(actualizarImagen);
        res.send(actualizarImagen);
    } catch (err) {
        console.log(err);
    }
}