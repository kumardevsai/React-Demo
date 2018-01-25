'use strict';

import express from 'express';
import Common from '../controller/common/common';

const router = express.Router();

router.get('/changecode', Common.changeCode);
router.get('/signup', Common.signup);

export default router;