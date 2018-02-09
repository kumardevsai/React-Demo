import express from 'express';
import Admin from '../controller/admin';

const router = express.Router();

router.post('/signin', Admin.signin);
router.post('/signup', Admin.signup);
router.get('/signout', Admin.signout);
router.get('/info', Admin.getInfo);

export default router;