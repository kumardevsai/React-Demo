'use strict';

import BaseComponent from '../../prototype/BaseComponent';

class Common extends BaseComponent {
  constructor () {
    super ();
  }

  signup (req, res) {
    res.send('I\'m signup');
  }
}

export default new Common();