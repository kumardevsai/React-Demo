'use strict';

import BaseComponent from '../../prototype/BaseComponent';

class User extends BaseComponent {
  constructor () {
    super();
  }

  getUserInfo (req, res) {
    const id = req.params.id;
    res.send('user\'id ' + id);
  }
}

export default new User();