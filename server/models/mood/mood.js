'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MoodSchema = new Schema({
  id: { unqie: true, type: Number, isRequire: true },
  content: { type: String, isRequire: true },
  author: { type: Number, isRequire: true },
  praise_num: { type: Number, default: 0 },
  comment: [Object],
  create_at: { type: String, isRequire: true }
});

MoodSchema.index({ id: 1 });

const Mood = mongoose.model('Mood', MoodSchema);

export default Mood;