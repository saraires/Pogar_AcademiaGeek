"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// export interface IAnt extends Document {
//     titulo: string,
//     descripcion: string,
//     costo: number,
//     fecha: string,
//     autor: string,
// }
const hormigaSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.model('Hormiga', hormigaSchema);
//# sourceMappingURL=hormiga.js.map