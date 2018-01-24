'use strict';

import BaseComponent from '../../prototype/BaseComponent';

class Genre extends BaseComponent {
  constructor () {
    super ();
  }

  getGenreInfo (req, res) {
    const id = req.params.id;
    res.send(`genre'id ${id}`);
  }
}

export default new Genre();