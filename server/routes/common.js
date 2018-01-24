'use strict';

import express from 'express';
import Common from '../controller/common/common';

const router = express.Router();

router.get('/signup', Common.signup);

export default router;