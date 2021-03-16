import { Router } from 'express';
const router: Router = Router();

import { signIn, singUp, perfil } from '../controllers/auth_controller';
// import { images } from '../controllers/images_controller';

router.post('/', signIn );
router.post('/signup', singUp);
router.get('/perfil', perfil);
// router.post('/upload', images);

export default router;