'use strict';

import Ids from '../models/ids';
import chalk from 'chalk';

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

  drawCode () {}
}