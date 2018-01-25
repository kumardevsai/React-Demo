'use strict';

import Ids from '../models/ids';
import chalk from 'chalk';

const BMP24 = require('gd-bmp').BMP24;

export default class BaseComponent {
  constructor () {
    this.idList = ['user_id', 'post_id', 'mood_id']
  }

  async getId (type) {
    if (!this.idList.includes(type)) {
      console.error(`${type} ${chalk.redBright('Id 类型错误!')}`);
      return false;
    }
    try {
      const idData = await Ids.findOne();
      idData[type]++;
      await idData.save();
      return idData[type];
    } catch (err) {
      console.error(`${chalk.redBright('获取id数据失败')}`);
      return false;
    }
  }

  rand (min, max) {
    return Math.random() * (max - min + 1) + min | 0;
  }

  drawCode () {
    const img = new BMP24(100, 34);
    let token = '';
    img.fillRect(0, 0, 100, 34, '0xf24148');

    for (let i = 0; i < 2000; i ++) {
      img.drawPoint(this.rand(0, 100), this.rand(0, 34), 0x9d2932);
    }
    const p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i=0; i < 5; i ++) {
      token += p.charAt(Math.random() * p.length | 0 );
    }

    let x = 10, y = 2;
    for (let i = 0; i < token.length; i ++) {
      y = 2 + this.rand(-2, 2);
      img.drawChar(token[i], x, y, BMP24.font12x24, '0xffffff');
      x += 12 + this.rand(4, 6);
    }

    const imgUrl = 'data:image/bmp;base64,' + img.getFileData().toString('base64');

    return { token, imgUrl };
  }
}