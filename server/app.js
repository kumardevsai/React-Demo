'use strict';

import Koa from 'Koa';
// import db from './mongodb/db';
import config from './config';
import router from './routes';

const app = new Koa();

router(app);

app.listen(config.port, () => {
  console.log(`qz-demo service start!`);
});
