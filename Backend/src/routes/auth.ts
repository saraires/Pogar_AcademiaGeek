import { Router } from 'express';
import { verify } from 'jsonwebtoken';
const router: Router = Router();

import { signIn, singUp, perfil } from '../controllers/auth_controller';

router.post('/', signIn );
router.post('/signup', singUp);
router.get('/perfil', perfil);

export default router;