'use strict';

import chalk from 'chalk';
import mongoose from 'mongoose';
import config from '../config';

mongoose.connect(config.mongodb);

const db = mongoose.connection;

db.on('connected', () => {
  console.log(`  ${chalk.greenBright('MongoDB Connection Success!')}`);
});

db.on('error', (err) => {
  console.error(`  ${chalk.greenBright('MongoDB Connection Error:')} ${chalk.redBright(err)}`);
});

db.on('disconnected', () => {
  console.error(`  ${chalk.redBright('MongoDB Connection Failed!')}`);
});

export default db;