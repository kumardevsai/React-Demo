'use strict';

import express from 'express';
import Mood from '../controller/mood/mood';

const router = express.Router();

router.get('/:id', Mood.getMoodInfo);

export default router;