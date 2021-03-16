import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    imagen: string,
    nombre: string,
    correo: string,
    contraseña: string,
    saldo: number,
}

const userSchema = new Schema({
    imagen: {
        type: String,
        required: false
    },
    nombre: {
        type: String,
        required: true,
        min: 3
    },
    correo: {
        type: String,
        unique: true,
        required: true,
        min: 10
    },
    contraseña: {
        type: String,
        required: true,
        min: 6,
        max: 300
    },
    saldo: {
        type: Number,
        required: false,
    }
});

export default model<IUser>('Usuario', userSchema);