"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const auth_controller_1 = require("../controllers/auth_controller");
router.post('/', auth_controller_1.signIn);
router.post('/signup', auth_controller_1.singUp);
router.get('/perfil', auth_controller_1.perfil);
exports.default = router;
//# sourceMappingURL=auth.js.map