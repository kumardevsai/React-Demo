'use strict';

import express from 'express';
import Genre from '../controller/genre/genre';

const router = express.Router();

router.get('/:id', Genre.getGenreInfo);

export default router;