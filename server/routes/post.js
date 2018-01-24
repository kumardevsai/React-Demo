'use strict';

import express from 'express';
import Post from '../controller/post/post';

const router = express.Router();

router.get('/:id', Post.getPostInfo);

export default router;