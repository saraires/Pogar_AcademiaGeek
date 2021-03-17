import { Schema, model, Document } from 'mongoose';

export interface IExpenses extends Document {
    titulo: string,
    descripcion: string,
    precio: number,
    fecha_pago: string,
    pagado: boolean,
    fijo: boolean,
    contribucion: number,
    autor: string,
}

const gastoSchema = new Schema({
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
    fecha_pago: {
        type: String,
        required: false,
        min: 8,
    },
    pagado: {
        type: Boolean,
        required: false,
    },
    fijo: {
        type: Boolean,
        required: true,
    },
    contribucion: [
        {
            pago: {
                type: Number,
                required: false,
                default: 0
            },
            fecha: {
                type: Date,
                required: false,
                default: Date.now
            }
        }
    ],
    autor: {
        type: String,
        required: true
    }
});

export default model<IExpenses>('Gastos', gastoSchema);