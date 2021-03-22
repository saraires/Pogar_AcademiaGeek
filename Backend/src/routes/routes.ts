import { Router } from 'express';
import { tokenValidation } from '../controllers/authFunction';
const router: Router = Router();

import { signIn, singUp, editarSaldo, perfil, editarImagen } from '../controllers/auth_controller';
import { verGastos, agregarGastos, editarGastos, gastosPagos, gastosNoPagos, pagar, infoAporte } from '../controllers/expenses_controller';
import { verDeseo, agregarDeseo, editarDeseo, eliminarDeseo } from '../controllers/whishes_controller';
import { verAnt, agregarAnt, editarAnt, comprasAnt} from '../controllers/ant_controllers';
// import { images } from '../controllers/images_controller';

// Rutas de Usuario
router.post('/', signIn);
router.post('/signup', singUp);
router.post('/perfil', tokenValidation, perfil); // Ruta privada
router.post('/editarsaldo', tokenValidation, editarSaldo);
router.post('/imagen', editarImagen);

// Rutas de gastos
router.post('/vergasto', tokenValidation, verGastos);
router.post('/agregargasto', tokenValidation, agregarGastos);
router.post('/editargasto', tokenValidation, editarGastos);
router.post('/gastospagos', tokenValidation, gastosPagos);
router.post('/gastosnopagos', tokenValidation, gastosNoPagos);
router.post('/pagar', tokenValidation, pagar);
router.post('/info', tokenValidation, infoAporte);

// ---- Pagos fijos y no fijos ---- //
// router.post('/pagosfijos', tokenValidation, pagosFijo)
// router.post('/pagosnofijos', tokenValidation, pagosNoFijo);
// router.post('/nopagosfijos', tokenValidation, noPagosFijo);
// router.post('/nopagosnofijos', tokenValidation, noPagosNoFijo);

// Rutas de deseos
router.post('/verdeseos', tokenValidation, verDeseo)
router.post('/agregardeseo', tokenValidation, agregarDeseo);
router.post('/editardeseo', tokenValidation, editarDeseo);
router.post('/eliminardeseo', tokenValidation, eliminarDeseo);
// router.post('/deseos', tokenValidation, condicionDeseo);

// Rutas de gastos hormiga
router.post('/verant', tokenValidation, verAnt);
router.post('/agregarant', tokenValidation, agregarAnt);
router.post('/editarant', tokenValidation, editarAnt);
router.post('/comprasant', tokenValidation, comprasAnt);


export default router;