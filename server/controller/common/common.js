'use strict';

import BaseComponent from '../../prototype/BaseComponent';

class Common extends BaseComponent {
  constructor () {
    super ();
    this.changeCode = this.changeCode.bind(this);
  }

  async changeCode (req, res) {
    try {
      const imgBase = await this.drawCode();
      const imgUrl = imgBase.imgUrl;
      return res.send({
        status: 1,
        imgUrl
      });
    } catch (e) {
      return res.send({
        status: 0,
        type: 'ERROR_CHANGE_CODE',
        message: e.message
      });
    }
  }

  signup (req, res) {
    res.send('I\'m signup');
  }
}

export default new Common();