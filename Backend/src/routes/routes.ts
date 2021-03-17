import { Router } from 'express';
import { tokenValidation } from '../controllers/authFunction';
const router: Router = Router();

import { signIn, singUp, perfil, editarSaldo } from '../controllers/auth_controller';
import { verGastos, agregarGastos, editarGastos, pagosFijo, pagosNoFijo, noPagosFijo, noPagosNoFijo } from '../controllers/expenses_controller';
import { verDeseo, agregarDeseo, editarDeseo, eliminarDeseo  } from '../controllers/whishes_controller';
import { verAnt, agregarAnt, editarAnt, comprasAnt  } from '../controllers/ant_controllers';
// import { images } from '../controllers/images_controller';

// Rutas de Usuario
router.post('/', signIn );
router.post('/signup', singUp);
router.get('/perfil', tokenValidation, perfil); // Ruta privada
router.put('/editarsaldo', tokenValidation, editarSaldo);
// router.post('/upload', images);

// Rutas de gastos
router.get('/vergasto', tokenValidation, verGastos);
router.post('/agregargasto', tokenValidation, agregarGastos);
router.put('/editargasto', tokenValidation, editarGastos);

// ---- Pagos fijos y no fijos ---- //
router.get('/pagosfijos', tokenValidation, pagosFijo)
router.get('/pagosnofijos', tokenValidation, pagosNoFijo);
router.get('/nopagosfijos', tokenValidation, noPagosFijo);
router.get('/nopagosnofijos', tokenValidation, noPagosNoFijo);

// Rutas de deseos
router.get('/verdeseos', tokenValidation, verDeseo)
router.post('/agregardeseo', tokenValidation, agregarDeseo);
router.put('/editardeseo', tokenValidation, editarDeseo);
router.delete('/eliminardeseo', tokenValidation, eliminarDeseo);

// Rutas de gastos hormiga
router.get('/verant', tokenValidation, verAnt);
router.post('/agregarant', tokenValidation, agregarAnt);
router.put('/editarant', tokenValidation, editarAnt);
router.get('/comprasant', tokenValidation, comprasAnt);


export default router;