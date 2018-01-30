import express from 'express';
import config from './config';

const app = new express();

app.listen(config.port, () => {
  console.log(`  qz-demo service start!`);
});