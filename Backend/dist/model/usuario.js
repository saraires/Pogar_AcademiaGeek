"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.model('Usuario', userSchema);
//# sourceMappingURL=usuario.js.map