import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  id: { unqie: true, type: Number, isRequire: true },
  genre: { type: String, isRequire: true },
  title: { unqie: true, type: String, isRequire: true },
  content: { type: String, isRequire: true },
  praise_num: { type: Number, default: 0 },
  comment: [Object],
  author: { type: Number, isRequire: true },
  create_at: { type: String, isRequire: true },
  update_at: { type: String }
});

PostSchema.index({ id: 1 });

const Post = mongoose.model('Post', PostSchema);

export default Post;