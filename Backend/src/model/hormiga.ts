import { Schema, model, Document } from 'mongoose';

// export interface IAnt extends Document {
//     titulo: string,
//     descripcion: string,
//     costo: number,
//     fecha: string,
//     autor: string,
// }

const hormigaSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true,
    },
    costo: {
        type: Number,
        required: true,
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    autor: {
        type: String,
        required: true
    }
});

export default model('Hormiga', hormigaSchema);