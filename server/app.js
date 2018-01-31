import express from 'express';
import config from './config';

const app = new express();

const ALLOW_ORIGIN = [
  'http://localhost:3000',
  'http://localhost:3001'
]

// 跨域
app.all('*', (req, res, next) => {
  const reqOrigin = req.headers.origin;
  if (ALLOW_ORIGIN.includes(reqOrigin)) {
    res.header("Access-Control-Allow-Origin", reqOrigin);
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", '3.2.1');
    if (req.method == 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  } else {
    res.send({
      status: 0,
      type: 'ILLEGAL DOMAIN NAME',
      message: '非法的域名'
    });
  }
});

app.get('/api/user/info', function (req, res, next) {
  const la = false;

  if (la) {
    const user = {
      id: 1,
      username: 'qingzhan',
      password: '123456'
    }

    res.send({
      status: 1,
      data: user
    });
  } else {
    res.send({
      status: 0,
      type: 'ERROR_GET_USER_INFO',
      message: '获取用户信息失败'
    });
  }
});

app.listen(config.port, () => {
  console.log(`  qz-demo service start!`);
});