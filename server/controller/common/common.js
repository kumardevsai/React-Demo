import BaseComponent from '../../prototype/BaseComponent';
import AdminModel from '../../models/admin/admin';

class Common extends BaseComponent {
  constructor() {
    super();
    this.getPicCaptcha = this.getPicCaptcha.bind(this);
    this.getMsgCaptcha = this.getMsgCaptcha.bind(this);
  }

  getPicCaptcha(req, res) {
    try {
      const picCaptcha = this.drawCode();
      res.send({
        status: 1,
        data: picCaptcha
      })
    } catch (err) {
      res.send({
        status: 0,
        type: 'ERROR_GET_PIC_CAPTCHA',
        message: '获取图形验证码失败'
      });
    }
  }

  async getMsgCaptcha(req, res) {
    const { mobile } = req.query;
    if (!mobile || !/^1[3,5,7,8,9]\d{9}$/.test(mobile)) {
      return res.send({
        status: 0,
        type: 'ERROR_MOBILE_FORMAT',
        message: '手机号格式不正确'
      });
    }

    const admin = await AdminModel.findOne({ mobile });
    if (admin) {
      return res.send({
        status: 0,
        type: 'ERROR_MOBILE_EXIST',
        message: '该手机号已经注册过了'
      });
    }

    try {
      // 阿里云短信接口的方式，开发环境我模拟一个
      // const res = await this.sendMessage(mobile);
      // ------ 分割线 --------
      // 模拟的方式，验证码在数据端控制台查看
      let code = '';
      for (let i = 0;i < 6; i++) {
        code += Math.floor(Math.random() * 10);
      };

      console.log(code);

      req.session.msg_code = {
        mobile,
        code,
        time: Date.now()
      }

      res.send({ status: 1 });
    } catch (err) {
      res.send({
        status: 0,
        type: 'ERROR_GET_MSG_CAPTCHA',
        message: '获取短信验证码失败'
      });
    }
  }
}

export default new Common();