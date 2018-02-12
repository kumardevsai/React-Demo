import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import moment from 'moment';

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  id: {
    unqie: true,
    type: Number,
    isRequire: true
  },
  nickname: {
    unqie: true,
    type: String,
    isRequire: true
  },
  username: {
    unqie: true,
    type: String,
    isRequire: true
  },
  password: {
    type: String,
    isRequire: true
  },
  mobile: {
    unqie: true,
    type: String,
    isRequire: true
  },
  avatar: {
    type: String,
    isRequire: true,
    default: 'http://image.yujunren.com/react-demo/avatar.jpg'
  },
  role: {
    type: String,
    isRequire: true,
    default: 1
  },
  status: {
    type: String,
    isRequire: true,
    default: 'audit'
  },
  reasion: {
    type: String
  },
  create_at: {
    type: String,
    default: moment(Date.now()).format('YYYY-MM-DD HH:mm')
  }
});

AdminSchema.index({ id: 1 });

const Admin = mongoose.model('Admin', AdminSchema);

Admin.findOne((err, data) => {
  if (!data) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync('123456', salt);
    const rootAdmin = new Admin({
      id: 0,
      nickname: '青湛',
      username: 'qingzhan',
      password: hash,
      mobile: '18788888888',
      role: 101,
      status: 'success'
    });
    rootAdmin.save();
  }
});

export default Admin;