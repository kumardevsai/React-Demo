'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  id: { unqie: true, type: Number, isRequire: true },
  title: { type: String, isRequire: true },
  categroy: { type: String },
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