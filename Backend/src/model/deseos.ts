import { Schema, model, Document } from 'mongoose';

export interface IWhishes extends Document {
    titulo: string,
    descripcion: string,
    precio: number,
    autor: string,
}

const deseoSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    autor: {
        type: String,
        required: true
    }
});

export default model<IWhishes>('Deseos', deseoSchema);