import { Request, Response } from 'express';
import Usuario from '../model/usuario';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config as dotenv } from 'dotenv';
import { validacionRegistro, validacionLogin } from './validacionJoi';

dotenv();

const claveToken = 'itsSomeRandomToTheSecretKey';

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
    if (!contraseñaValida) return res.status(400).send('El correo o la contraseña ');

    // JWT
    const token: string = jwt.sign({ _id: usuarioValido._id }, claveToken);
    res.header('authToken', token).send(usuarioValido);
};

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
    const { nombre, correo } = req.body
    const usuario = new Usuario({
        nombre,
        correo,
        contraseña: hashContraseña
    });
    try {
        const savedUser = await usuario.save();
        // JWT
        const token: string = jwt.sign({ _id: savedUser._id }, claveToken);
        res.header('authToken', token).send(savedUser).status(200);
    } catch (err) {
        res.status(400).send(err);
    };

};

export const perfil = (req: Request, res: Response) => {
    console.log(req.header('auth-token'));
    res.send('perfil');
};