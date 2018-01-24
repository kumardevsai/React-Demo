'use strict';

import router from 'koa-route';

var db = {
  tobi: { name: 'tobi', species: 'ferret' },
  loki: { name: 'loki', species: 'ferret' },
  jane: { name: 'jane', species: 'ferret' }
};

router.get('/', () => {
  var names = Object.keys(db);
  this.body = 'pets: ' + names.join(', ');
});