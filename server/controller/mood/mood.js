'use strict';

import BaseComponent from '../../prototype/BaseComponent';

class Mood extends BaseComponent {
  constructor () {
    super ();
  }

  getMoodInfo (req, res) {
    const id = req.params.id;
    res.send(`mood's id ${id}`);
  }
}

export default new Mood();