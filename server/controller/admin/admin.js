import BaseComponent from '../../prototype/BaseComponent';
import AdminModel from '../../models/admin/admin';
import formidable from 'formidable';
import bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;

class Admin extends BaseComponent {
  constructor() {
    super();
    this.signup = this.signup.bind(this);
  }

  getInfo(req, res) {
    // const { admin } = req.session;
    // if (admin) {
    //   return res.send({
    //     status: 1,
    //     data: admin
    //   });
    // } else {
    //   return res.send({
    //     status: 0,
    //     type: 'ERROR_GET_ADMIN_INFO',
    //     message: '尚未登录'
    //   });
    // }
    res.send({ status: 1, data: {} });
  }

  signin(req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.send({
          status: 0,
          type: 'ERROR_PARMAS',
          message: '参数解析失败'
        });
      }

      const { username, password, pic_token_a, type, mobile, pic_token_b, msg_captch } = fields;

      if (type === 'account') {
        try {
          if (!username) {
            throw new Error('用户名不能为空');
          } else if (!password) {
            throw new Error('密码不能为空');
          }
        } catch(err) {
          return res.send({
            status: 0,
            type: 'ERROR_SIGNIN_PARMAS',
            message: err.message
          });
        }

        const admin = await AdminModel.findOne({ username });

        if (!admin) {
          return res.send({
            status: 0,
            type: 'ERROR_ADMIN_IS_NOT_EXITS',
            message: '管理员账户不存在'
          });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
          return res.send({
            status: 0,
            type: 'ERROR_PASS_IS_NOT_MATCH',
            message: '管理员密码错误'
          });
        } else {
          return res.send({
            status: 1
          });
        }
      } else if (type === 'mobile') {
        try {
          if (!mobile) {
            throw new Error('手机号不能为空');
          }
        } catch(err) {
          return res.send({
            status: 0,
            type: 'ERROR_SIGNIN_PARMAS',
            message: err.message
          });
        }

        const admin = await AdminModel.findOne({ mobile });

        if (!admin) {
          return res.send({
            status: 0,
            type: 'ERROR_ADMIN_IS_NOT_EXITS',
            message: '管理员账户不存在'
          });
        } else {
          return res.send({
            status: 1
          });
        }
      }
    });
  }

  signup(req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.send({
          status: 0,
          type: 'ERROR_PARMAS',
          message: '参数解析失败'
        });
      }

      const { msg_code } = req.session;
      const { username, password, mobile, mob_captcha } = fields;

      try {
        if (!mobile || !/^1[3,5,7,8,9]\d{9}$/.test(mobile)) {
          throw new Error('请输入正确的手机号');
        } else if (mobile !== msg_code.mobile) {
          throw new Error('接收验证码的手机号与提交的手机号不对应');
        } else if (!mob_captcha || mob_captcha !== msg_code.code) {
          throw new Error('短信验证码错误，请重新输入');
        } else if ((Date.now() - msg_code.time) / (1000 * 60) > 5) {
          throw new Error('短信验证码已失效，请重新获取');
        } else if (!username || !/^[a-z]\w{5,11}$/.test(username)) {
          throw new Error('用户名必须在6-12位之间并且以字母开头');
        } else if (!password || !/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]./.test(password) || password < 10) {
          throw new Error('密码必须为数字、字母和特殊字符其中两种组成并且大于10位');
        }
      } catch(err) {
        return res.send({
          status: 0,
          type: 'ERROR_SIGNUP_PARMAS',
          message: err.message
        });
      }

      const user_name = await AdminModel.findOne({ username });
      if (user_name) {
        return res.send({
          status: 0,
          type: 'ADMIN_HASN_EXIST',
          message: '用户名已经存在了'
        });
      }

      const user_mobile = await AdminModel.findOne({ mobile });
      if (user_mobile) {
        return res.send({
          status: 0,
          type: 'ADMIN_HASN_EXIST',
          message: '手机号已经存在了'
        });
      }

      const bcryptPassword = await this.encryption(password);
      const admin_id = await this.getId('admin_id');
      const admin_model = {
        id: admin_id,
        username,
        password: bcryptPassword,
        mobile
      };

      try {
        await AdminModel.create(admin_model);
        const adminInfo = await AdminModel.findOne({ id: admin_id }, '-__v -_id -password -create_at');
        req.session.admin = adminInfo;
        return res.send({
          status: 1,
          data: adminInfo
        });
      } catch(err) {
        return res.send({
          status: 0,
          type: 'ERROR_SERVICE_FAILED',
          message: '服务器无响应，请稍后重试'
        });
      }
    });
  }

  async encryption(password) {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  signout(req, res) {
    delete req.session.admin;
    return res.send({
      status: 1,
    });
  }

}

export default new Admin();