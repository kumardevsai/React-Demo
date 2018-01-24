'use strict';

import home from './home';

export default (app) => {
  app.use('/api/home', home)
}