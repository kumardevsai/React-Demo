import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Select, Row, Col, Button, Popover, Progress, Alert } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import styles from './Signup.scss';
import { signup } from '@/store/admin.reducer';
import { getPicCaptchaApi, getMsgCaptchaApi } from '@/service/api';

const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.warning}>强度：中</div>,
  poor: <div className={styles.error}>强度：太短</div>
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'active',
  poor: 'exception'
};

@connect(
  state => state.admin,
  { signup }
)
@Form.create()
export default class SignupPage extends Component {
  state = {
    count: 0,
    visible: false,
    help: '',
    prefix: '86',
    pic_captcha: '',
    pic_token: '',
    pic_time: null,
    error: ''
  }

  componentWillMount() {
    this.ongetPicCaptchaApi();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async ongetPicCaptchaApi() {
    const res = await getPicCaptchaApi();
    if (res.status === 1) {
      this.setState({
        pic_captcha: res.data.url,
        pic_token: res.data.token,
        pic_time: Date.now()
      });
    } else {
      this.setState({
        pic_captcha: '',
        pic_token: '',
        pic_time: null
      });
    }
  }

  getPasswordStatus() {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 15) {
      return 'ok';
    }
    if (value && value.length > 9) {
      return 'pass';
    }
    return 'poor';
  }

  renderPasswordProgress() {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={7}
          percent={value.length * 6.25 > 100 ? 100 : value.length * 6.25}
          showInfo={false}
        />
      </div>
    ) : null;
  }

  renderMessage(content) {
    return (
      <Alert style={{ marginBottom: 10 }} message={content} type="error" showIcon />
    );
  }

  checkPassword(rule, value, callback) {
    if (!value) {
      this.setState({
        help: '密码不能为空',
        visible: !!value
      });
      callback('error');
    } else if (!/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]./.test(value)) {
      this.setState({
        help: '密码必须为数字、字母和特殊字符其中两种组成',
        visible: false
      });
      callback('error');
    } else {
      this.setState({
        help: ''
      });
      if (!this.state.visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 10) {
        callback('error');
      } else {
        callback();
      }
    }
  }

  checkConfimp(rule, value, callback) {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  }

  async checkPicCode(rule, value, callback) {
    if (!value) {
      callback('图形验证码不能为空');
    } else {
      if (value.length !== 5) {
        callback('图形验证码必须是5位');
      } else {
        const { pic_time, pic_token } = this.state;
        if ((pic_time - Date.now()) / (1000 * 60) > 1) {
          callback('图形验证码已经失效，请刷新');
        }
        if (value.toLowerCase() !== pic_token.toLowerCase()) {
          callback('图形验证码错误，请重新输入');
        }
        callback();
      }
    }
  }

  async changeGetCaptcha() {
    await this.ongetPicCaptchaApi();
    const { form } = this.props;
    form.validateFields(['pic_captcha'], { force: true });
  }

  async onGetCaptcha() {
    const { form } = this.props;
    const { pic_token } = this.state;
    const token = form.getFieldValue('pic_captcha');
    const mobile = form.getFieldValue('mobile');

    if (!mobile || !/^1[3,5,7,8,9]\d{9}$/.test(mobile)) {
      this.setState({ error: '请输入正确的手机号' });
      return false;
    }

    if (!token || token.toLowerCase() !== pic_token.toLowerCase()) {
      this.setState({ error: '图形验证码错误' });
      return false;
    }

    console.log(1);

    const res = await getMsgCaptchaApi({ mobile: mobile });
      
    if (res.status === 1) {
      let count = 59;
      this.setState({ count, error: '' });
      this.interval = setInterval(() => {
        count -= 1;
        this.setState({ count });
        if ( count === 0) {
          clearInterval(this.interval);
        }
      }, 1000);
    } else {
      this.setState({ error: res.message });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        this.props.signup(values);
      }
    });
  }

  render() {
    const { form, error_r, admin_r } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix, pic_captcha, error } = this.state;
    return (
      <div className={styles.main}>
        { admin_r && <Redirect to='/admin/acc-result' /> }
        <h3>申请管理员</h3>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          { error && this.renderMessage(error) }
          { error_r && this.renderMessage(error_r) }
          <FormItem>
            {
              getFieldDecorator('username', {
                rules: [{
                  required: true,
                  message: '用户名不能为空'
                }, {
                  pattern: /^[a-z]\w{5,11}$/,
                  message: '用户名必须在6-12位之间并且以字母开头'
                }]
              })(<Input size="large" placeholder="用户名" />)
            }
          </FormItem>
          <FormItem help={this.state.help}>
            <Popover
              content={
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    请至少输入 10 个字符。请不要使用容易被猜到的密码。
                  </div>
                </div>
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={this.state.visible}
            >
            {
              getFieldDecorator('password', {
                rules: [{
                  validator: this.checkPassword.bind(this)
                }]
              })(<Input type="password" size="large" placeholder="密码" />)
            }
            </Popover>
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('confimp', {
                rules: [{
                  validator: this.checkConfimp.bind(this)
                }]
              })(<Input type="password" size="large" placeholder="确认密码" />)
            }
          </FormItem>
          <FormItem>
            <InputGroup compact>
              <Select
                size="large"
                value={prefix}
                style={{ width: '20%' }}
              >
                <Option value="86">+86</Option>
              </Select>
              {
                getFieldDecorator('mobile', {
                  rules: [{
                    required: true,
                    message: '手机号不能为空'
                  }, {
                    pattern: /^1[3,5,7,8,9]\d{9}$/,
                    message: '请输入正确的手机号'
                  }]
                })(<Input size="large" style={{ width: '80%' }} placeholder="手机号" />)
              }
            </InputGroup>
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {
                  getFieldDecorator('pic_captcha', {
                    rules: [{
                      validator: this.checkPicCode.bind(this)
                    }]
                  })(<Input size="large" placeholder="图形验证码" />)
                }
              </Col>
              <Col span={8}>
                <img className={styles.picCaptcha} src={pic_captcha} onClick={this.changeGetCaptcha.bind(this)} alt="图形验证码" />
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {
                  getFieldDecorator('mob_captcha', {
                    rules: [{
                      required: true,
                      message: '验证码不能为空'
                    },{
                      pattern: /^\d{6}$/,
                      message: '验证码必须位6位数字'
                    }]
                  })(<Input size="large" placeholder="手机验证码" />)
                }
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={count}
                  className={styles.getCaptcha}
                  onClick={this.onGetCaptcha.bind(this)}
                >
                  {count ? `${count} s` : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button
              size="large"
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              申请
            </Button>
            <Link className={styles.signin} to="/admin/signin">
              使用已有账户登录
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}
