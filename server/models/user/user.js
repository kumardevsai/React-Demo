'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { unqie: true, type: Number, isRequire: true },
  phone: { unqie: true, type: Number, isRequire: true },
  password: { type: Number, isRequire: true },
  nickname: { type: String, isRequire: true },
  motto: { type: String },
  post: [Number],
  mood: [Number],
  collect: [Number],
  praise: [Number],
  dynamic: { type: Array },
  follow: [Number],
  fans: [Number]
});

UserSchema.index({ id: 1 });

const User = mongoose.model('User', UserSchema);

export default User;