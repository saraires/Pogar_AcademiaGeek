import { Schema, model, Document } from 'mongoose';

export interface IWhishes extends Document {
    titulo: string,
    descripcion: string,
    precio: number,
    autor: string,
    comprable: boolean
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
    },
    comprable: {
        type: Boolean,
        default: false
    }
});

export default model<IWhishes>('Deseos', deseoSchema);