"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authFunction_1 = require("../controllers/authFunction");
const router = express_1.Router();
const auth_controller_1 = require("../controllers/auth_controller");
const expenses_controller_1 = require("../controllers/expenses_controller");
const whishes_controller_1 = require("../controllers/whishes_controller");
const ant_controllers_1 = require("../controllers/ant_controllers");
// Rutas de Usuario
router.post('/', auth_controller_1.signIn);
router.post('/signup', auth_controller_1.singUp);
router.post('/perfil', authFunction_1.tokenValidation, auth_controller_1.perfil);
router.post('/editarsaldo', authFunction_1.tokenValidation, auth_controller_1.editarSaldo);
router.post('/imagen', auth_controller_1.editarImagen);
// Rutas de gastos
router.post('/vergasto', authFunction_1.tokenValidation, expenses_controller_1.verGastos);
router.post('/agregargasto', authFunction_1.tokenValidation, expenses_controller_1.agregarGastos);
router.post('/editargasto', authFunction_1.tokenValidation, expenses_controller_1.editarGastos);
router.post('/gastospagos', authFunction_1.tokenValidation, expenses_controller_1.gastosPagos);
router.post('/gastosnopagos', authFunction_1.tokenValidation, expenses_controller_1.gastosNoPagos);
router.post('/pagar', authFunction_1.tokenValidation, expenses_controller_1.pagar);
router.post('/info', authFunction_1.tokenValidation, expenses_controller_1.infoAporte);
router.post('/verungasto', authFunction_1.tokenValidation, expenses_controller_1.verSolounGasto);
// Rutas de deseos
router.post('/verdeseos', authFunction_1.tokenValidation, whishes_controller_1.verDeseo);
router.post('/agregardeseo', authFunction_1.tokenValidation, whishes_controller_1.agregarDeseo);
router.post('/editardeseo', authFunction_1.tokenValidation, whishes_controller_1.editarDeseo);
router.post('/eliminardeseo', authFunction_1.tokenValidation, whishes_controller_1.eliminarDeseo);
router.post('/verundeseo', authFunction_1.tokenValidation, whishes_controller_1.verSolounDeseo);
// Rutas de gastos hormiga
router.post('/verant', authFunction_1.tokenValidation, ant_controllers_1.verAnt);
router.post('/agregarant', authFunction_1.tokenValidation, ant_controllers_1.agregarAnt);
router.post('/editarant', authFunction_1.tokenValidation, ant_controllers_1.editarAnt);
router.post('/comprasant', authFunction_1.tokenValidation, ant_controllers_1.comprasAnt);
router.post('/verunhormiga', authFunction_1.tokenValidation, ant_controllers_1.verSolounHormiga);
exports.default = router;
//# sourceMappingURL=routes.js.map