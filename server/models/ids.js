'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema

const IdsSchema = new Schema({
  user_id: Number,
  post_id: Number,
  mood_id: Number,
  genre_id: Number
});

const Ids = mongoose.model('Ids', IdsSchema);

Ids.findOne((err, data) => {
  if (!data) {
    const newIds = new Ids({
      user_id: 1,
      post_id: 1,
      mood_id: 1,
      genre_id: 1
    });
    newIds.save();
  }
});

export default Ids;