import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  id: { unqie: true, type: Number, isRequire: true },
  username: { unqie: true, type: String, isRequire: true },
  password: { type: String, isRequire: true },
  phone: { type: String, isRequire: true }
});

AdminSchema.index({ id: 1 });

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;