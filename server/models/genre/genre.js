'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  id: { unqie: true, type: Number, isRequire: true },
  name: { unqie: true, type: String, isRequire: true },
  description: { type: String },
  post: [Number]
});

GenreSchema.index({ id: 1 });

const Genre = mongoose.model('Genre', GenreSchema);

export default Genre;