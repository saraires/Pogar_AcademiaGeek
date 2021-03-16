"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authFunction_1 = require("../controllers/authFunction");
const router = express_1.Router();
const auth_controller_1 = require("../controllers/auth_controller");
// import { images } from '../controllers/images_controller';
router.post('/', auth_controller_1.signIn);
router.post('/signup', auth_controller_1.singUp);
router.get('/perfil', authFunction_1.tokenValidation, auth_controller_1.perfil); // Ruta privada
// router.post('/upload', images);
exports.default = router;
//# sourceMappingURL=auth.js.map