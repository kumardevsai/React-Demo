import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { unqie: true, type: Number, isRequire: true },
  mobile: { unqie: true, type: Number, isRequire: true },
  password: { type: String, isRequire: true },
  nickname: { unqie: true, type: String, isRequire: true },
  motto: { type: String },
  post: [Number],
  mood: [Number],
  collect: [Number],
  praise: [Number],
  dynamic: [String],
  follow: [Number],
  fans: [Number]
});

UserSchema.index({ id: 1 });

const User = mongoose.model('User', UserSchema);

export default User;