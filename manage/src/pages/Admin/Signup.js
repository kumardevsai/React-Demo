import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Alert } from 'antd';
import Account from '@/components/Account';
import styles from './Signup.scss';
import { signupFunc } from '@/store/admin.reducer';

const { Username, Password, Comfirmp, Mobile, Pic, Msg, Submit } = Account;

@connect(
  ({ admin }) => ({
    account: admin
  }),
  { signupFunc }
)
export default class Signup extends Component {
  state = {
    error: ''
  };

  getError(msg) {
    this.setState({ error: msg });
  }

  handleSubmit(err, value) {
    if (!err) {
      this.props.signupFunc(value);
    }
  }

  renderMessage(content) {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );
  }

  render() {
    const { account } = this.props;
    const { error } = this.state;
    return (
      <div className={styles.main}>
        {
          account.status === 'audit' &&
          <Redirect to="/admin/acc-result" />
        }
        <h3>申请管理员</h3>
        <Account
          onSubmit={this.handleSubmit.bind(this)}
        >
          {
            error && this.renderMessage(error)
          }
          {
            account.error &&
            account.status === 'error' &&
            this.renderMessage(account.error)
          }
          <Username
            name="username"
            rules={
              [{
                required: true,
                message: '用户名不能为空'
              }, {
                pattern: /^[a-z]\w{5,11}$/,
                message: '用户名必须在6-12位之间并且以字母开头'
              }]
            }
          />
          <Password
            name="password"
            rules={
              [{
                required: true,
                message: '密码不能为空'
              }, {
                pattern: /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?].{9,17}/,
                message: '密码必须在10-18位之间并且为数字、字母和特殊字符其中两种组成'
              }]
            }
          />
          <Comfirmp />
          <Mobile name="mobile" />
          <Pic name="pic_captcha" />
          <Msg name="msg_captcha" pic="pic_captcha" type="signup" getError={this.getError.bind(this)} />
          <Submit className={styles.submit} text="申请"><Link className={styles.signin} to="/admin/signin">使用已有账户登录</Link></Submit>
        </Account>
      </div>
    );
  }
}