'use strict';

import chalk from 'chalk';
import express from 'express';
import config from './config';
import router from './routes';
import connectMongo from 'connect-mongo'
import cookieParser from 'cookie-parser'
import session from 'express-session'

const app = new express();

const MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(session({
  name: config.session.key,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: config.session.cookie,
  store: new MongoStore({
    url: config.mongodb
  })
}));

router(app);

app.listen(config.port, () => {
  console.log(`  ${chalk.greenBright('qz-demo service start!')}`);
});
