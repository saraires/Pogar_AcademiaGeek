// Validaciones
import Joi from 'joi';

// Validacion de registro
export const validacionRegistro = Joi.object({
    imagen: Joi.string(),
    nombre: Joi.string().min(3).required(),
    correo: Joi.string().min(6).required().email(),
    contraseña: Joi.string().min(6).required(),
    saldo: Joi.number()
}).label('registro');


// Validacion de login
export const validacionLogin = Joi.object({
    correo: Joi.string().min(6).required().email(),
    contraseña: Joi.string().min(6).required()
}).label('inicio');
