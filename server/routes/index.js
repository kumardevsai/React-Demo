'use strict';

import common from './common';
import user from './user';
import genre from './genre';
import post from './post';
import mood from './mood';

export default (app) => {
  app.get('/api', (req, res) => {
    res.send('Welcome to use qz-demo servcie!');
  });

  app.use('/api', common);

  app.use('/api/user', user);

  app.use('/api/genre', genre);

  app.use('/api/post', post);

  app.use('/api/mood', mood);

  // 404
  app.use((req, res) => {
    res.status(404).send('Sorry can\'t find that!');
  });
  // 500
  app.use(function(err, req, res) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
}