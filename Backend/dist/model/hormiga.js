"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hormigaSchema = new mongoose_1.Schema({
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
    fecha: {
        type: Date,
        default: Date.now
    },
    autor: {
        type: String,
        required: true
    },
    compras: {
        type: Number,
        required: false
    }
});
exports.default = mongoose_1.model('Hormiga', hormigaSchema);
//# sourceMappingURL=hormiga.js.map