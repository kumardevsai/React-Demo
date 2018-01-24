'use strict';

import BaseComponent from '../../prototype/BaseComponent';

class Post extends BaseComponent {
  constructor () {
    super ();
  }

  getPostInfo (req, res) {
    const id = req.params.id;
    res.send(`post's id ${id}`);
  }
}

export default new Post();