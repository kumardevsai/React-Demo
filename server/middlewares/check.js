import AdminModel from '../models/admin';

class Check {
  async isRoot(req, res, next) {
    const admin = req.session.admin;
    if (!admin) {
      return res.send({
        status: 0,
        type: 'ERROR_NOT_SIGNIN',
        message: '尚未登录'
      });
    } else if (admin.role < 100) {
      return res.send({
        status: 0,
        type: 'ERROR_NOT_PERMISSIONS'
      });
    } else {
      next();
    }
  }
}

export default new Check();
