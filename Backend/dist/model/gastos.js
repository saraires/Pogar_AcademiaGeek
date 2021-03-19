"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const gastoSchema = new mongoose_1.Schema({
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
        required: false
    },
    pagado: {
        type: Boolean,
        default: false,
    },
    fijo: {
        type: Boolean,
        default: false,
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
exports.default = mongoose_1.model('Gastos', gastoSchema);
//# sourceMappingURL=gastos.js.map