"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authFunction_1 = require("../controllers/authFunction");
const router = express_1.Router();
const auth_controller_1 = require("../controllers/auth_controller");
const expenses_controller_1 = require("../controllers/expenses_controller");
const whishes_controller_1 = require("../controllers/whishes_controller");
const ant_controllers_1 = require("../controllers/ant_controllers");
// import { images } from '../controllers/images_controller';
// Rutas de Usuario
router.post('/', auth_controller_1.signIn);
router.post('/signup', auth_controller_1.singUp);
router.get('/perfil', authFunction_1.tokenValidation, auth_controller_1.perfil); // Ruta privada
router.put('/editarsaldo', authFunction_1.tokenValidation, auth_controller_1.editarSaldo);
// router.post('/upload', images);
// Rutas de gastos
router.get('/vergasto', authFunction_1.tokenValidation, expenses_controller_1.verGastos);
router.post('/agregargasto', authFunction_1.tokenValidation, expenses_controller_1.agregarGastos);
router.put('/editargasto', authFunction_1.tokenValidation, expenses_controller_1.editarGastos);
// ---- Pagos fijos y no fijos ---- //
// router.get('/pagosfijos', tokenValidation, pagosFijo)
// router.get('/pagosnofijos', tokenValidation, pagosNoFijo);
// router.get('/nopagosfijos', tokenValidation, noPagosFijo);
// router.get('/nopagosnofijos', tokenValidation, noPagosNoFijo);
// Rutas de deseos
router.get('/verdeseos', authFunction_1.tokenValidation, whishes_controller_1.verDeseo);
router.post('/agregardeseo', authFunction_1.tokenValidation, whishes_controller_1.agregarDeseo);
router.put('/editardeseo', authFunction_1.tokenValidation, whishes_controller_1.editarDeseo);
router.delete('/eliminardeseo', authFunction_1.tokenValidation, whishes_controller_1.eliminarDeseo);
// Rutas de gastos hormiga
router.get('/verant', authFunction_1.tokenValidation, ant_controllers_1.verAnt);
router.post('/agregarant', authFunction_1.tokenValidation, ant_controllers_1.agregarAnt);
router.put('/editarant', authFunction_1.tokenValidation, ant_controllers_1.editarAnt);
router.get('/comprasant', authFunction_1.tokenValidation, ant_controllers_1.comprasAnt);
exports.default = router;
//# sourceMappingURL=routes.js.map