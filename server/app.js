'use strict';

import express from 'express';
import config from './config';
import router from './routes';

const app = new express();

router(app);

app.listen(config.port, () => {
  console.log(`qz-demo service start!`);
});
