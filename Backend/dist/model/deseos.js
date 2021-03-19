"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const deseoSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.model('Deseos', deseoSchema);
//# sourceMappingURL=deseos.js.map