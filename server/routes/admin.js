import express from 'express';
import Admin from '../controller/admin';
import Check from '../middlewares/check';

const router = express.Router();

router.post('/signin', Admin.signin);
router.post('/signup', Admin.signup);
router.get('/signout', Admin.signout);
router.get('/info', Admin.getInfo);
router.get('/list', Check.isRoot, Admin.getList);

export default router;