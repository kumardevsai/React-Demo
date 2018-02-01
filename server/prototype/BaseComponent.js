import chalk from 'chalk';
import Ids from '../models/ids';

export default class BaseComponent {
  constructor() {
    this.idList = ['admin_id'];
  }

  async getId(type) {
    if (!this.idList.includes(type)) {
      console.error(`${type} ${chalk.redBright('Id 类型错误!')}`);
      return false
    }
    try {
      const idData = await Ids.findOne();
      idData[type]++;
      await idData.save();
      return idData[type];
    } catch(err) {
      console.error(`${chalk.redBright('获取id数据失败')}`);
      return false;
    }
  }
}