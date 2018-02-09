import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Checkbox, Icon } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import styles from './Signin.scss';
import Account from '@/components/Account';
import { signinFunc } from '@/store/signin.reducer';

const { Tab, Username, Password, Pic, Mobile, Msg, Submit } = Account;

@connect(
  state => state.signin,
  { signinFunc }
)
export default class SigninPage extends Component {
  state = {
    type: 'account',
    autoSignin: true,
    error: ''
  }

  handleSubmit(err, values) {
    if (!err) {
      const { type } = this.state;
      const info = { ...values, type };
      this.props.signinFunc(info);
    }
  }

  changeAutoSignin(e) {
    this.setState({
      autoSignin: e.target.checked
    });
  }

  renderMessage(content) {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );
  }

  render() {
    const { storeStatus, storeType, storeError } = this.props;
    const { type, autoSignin } = this.state; 
    return (
      <div className={styles.main}>
        { storeStatus === 'success' && <Redirect to="/" /> }
        <Account
          defaultActiveKey={type}
          onSubmit={this.handleSubmit.bind(this)}
        >
          <Tab key="account" tab="账户密码登录">
            {
              storeStatus === 'error' &&
              storeType === 'account' &&
              this.renderMessage(storeError)
            }
            <Username name="username" />
            <Password name="password" />
            <Pic name="pic_token_a" />
          </Tab>
          <Tab key="mobile" tab="手机号登录">
            {
              storeStatus === 'error' &&
              storeType === 'mobile' &&
              this.renderMessage(storeError)
            }
            <Mobile name="mobile" />
            <Pic name="pic_token_b" />
            <Msg name="msg_captch" pic="pic_captcha" />
          </Tab>
          <div>
            <Checkbox checked={autoSignin} onChange={this.changeAutoSignin.bind(this)}>自动登录</Checkbox>
            <Link style={{ float: 'right' }} to="/admin/forget">忘记密码</Link>
          </div>
          <Submit>登录</Submit>
          <div className={styles.other}>
            其他登录方式
            <Icon className={styles.icon} type="wechat" />
            <Link className={styles.signup} to="/admin/signup">申请管理员</Link>
          </div>
        </Account>
      </div>
    );
  }
}