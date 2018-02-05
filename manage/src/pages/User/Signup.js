import React, { Component } from 'react';
import { Form, Input, Select, Row, Col, Button, Popover, Progress } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Signup.scss';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

const passwordStatusMap = {
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.warning}>强度：中</div>,
  poor: <div className={styles.error}>强度：太短</div>,
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

@Form.create()
export default class SignupPage extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    prefix: '86'
  }

  onGetCaptcha() {
    console.log(1);
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
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  }

  checkPassword(rule, value, callback) {
    if (!value) {
      this.setState({
        help: '密码不能为空',
        visible: !!value
      });
      callback('error');
    } else if (!/^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])).*$/.test(value)) {
      this.setState({
        help: '密码必须为大写字母、小写字母、数字和特殊字符组成',
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
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
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

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix } = this.state;
    return (
      <div className={styles.main}>
        <h3>申请管理员</h3>
        <Form onSubmit={this.handleSub}>
          <FormItem>
            {
              getFieldDecorator('usernmae', {
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
                    请至少输入 6 个字符。请不要使用容易被猜到的密码。
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
                  getFieldDecorator('captcha', {
                    rules: [{
                      required: true,
                      message: '验证码不能为空'
                    },{
                      pattern: /^\d{6}$/,
                      message: '验证码必须位6位数字'
                    }]
                  })(<Input size="large" placeholder="验证码" />)
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
              注册
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
