import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Checkbox, Icon } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import styles from './Signin.scss';
import Account from '@/components/Account';
import { signinFunc } from '@/store/account.reducer';

const { Tab, Username, Password, Pic, Mobile, Msg, Submit } = Account;

@connect(
  ({ account }) => ({
    account: account
  }),
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
      const { type, autoSignin } = this.state;
      const info = { ...values, type, autoSignin };
      this.props.signinFunc(info);
    }
  }

  getError(msg) {
    if (msg) {
      this.setState({ error: msg });
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

  renderRedirect(status) {
    if (status === 'success') {
      return <Redirect to="/" />
    } else if (status === 'audit' || status === 'reject') {
      return <Redirect to="/admin/acc-result" />
    } else {
      return null;
    }
  }

  render() {
    const { account } = this.props;
    const { type, autoSignin, error } = this.state; 
    return (
      <div className={styles.main}>
        <Account
          defaultActiveKey={type}
          onSubmit={this.handleSubmit.bind(this)}
        >
          {
            this.renderRedirect(account.status)
          }
          <Tab key="account" tab="账户密码登录">
            {
              account.status === 'error' &&
              account.type === 'account' &&
              this.renderMessage(account.error)
            }
            <Username name="username" />
            <Password name="password" />
            <Pic name="acc_pic" />
          </Tab>
          <Tab key="mobile" tab="手机号登录">
            {
              error && this.renderMessage(error)
            }
            {
              account.status === 'error' &&
              account.type === 'mobile' &&
              this.renderMessage(account.error)
            }
            <Mobile name="mobile" />
            <Pic name="mobile_pic" />
            <Msg type="signin" pic="mobile_pic" getError={this.getError.bind(this)} />
          </Tab>
          <div className={styles.operating}>
            <Checkbox checked={autoSignin} onChange={this.changeAutoSignin.bind(this)}>自动登录</Checkbox>
            <Link style={{ float: 'right' }} to="/admin/forget">忘记密码</Link>
          </div>
          <Submit text="登录" />
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