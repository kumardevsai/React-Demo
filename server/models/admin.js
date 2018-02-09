import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  id: { unqie: true, type: Number, isRequire: true },
  username: { unqie: true, type: String, isRequire: true },
  password: { type: String, isRequire: true },
  mobile: { unqie: true, type: String, isRequire: true },
  roles: { type: String, isRequire: true, default: 1},
  status: { type: String, isRequire: true, default: 'info' }
});

AdminSchema.index({ id: 1 });

const Admin = mongoose.model('Admin', AdminSchema);

Admin.findOne((err, data) => {
  if (!data) {
    const rootAdmin = new Admin({
      id: 0,
      username: 'qingzhan',
      password: 'a123456',
      mobile: '18788888888',
      roles: 101,
      status: 'success'
    });
    rootAdmin.save();
  }
});

export default Admin;