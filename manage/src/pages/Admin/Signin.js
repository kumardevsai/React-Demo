import React, { Component } from 'react';
import { Alert, Checkbox, Icon } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import styles from './Signin.scss';
import Signin from '@/components/Signin';
import { connect } from 'react-redux';

const { Tab, Username, Password, Mobile, Captcha, Submit } = Signin;

@connect(
  state => state.admin
)
export default class SigninPage extends Component {
  state = {
    type: 'accout',
    autoSignin: true
  }

  onTabChange(type) {
    this.setState({ type });
  }

  handleSubmit () {
    console.log(1);
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
    const { admin_r } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        { admin_r && <Redirect to='/' /> }
        <Signin
          defaultActiveKey={type}
          onTabChange={this.onTabChange.bind(this)}
          onSubmit={this.handleSubmit.bind(this)}
        >
          <Tab key="accout" tab="账户密码登录">
            <Username name="usernmae" placeholder="请输入管理员账号" />
            <Password name="password" placeholder="请输入管理员密码" />
          </Tab>
          <Tab key="mobile" tab="手机号登录">
            <Mobile name="mobile" />
            <Captcha name="captcha" />
          </Tab>
          <div>
            <Checkbox checked={this.state.autoSignin} onChange={this.changeAutoSignin.bind(this)}>自动登录</Checkbox>
            <Link style={{ float: 'right' }} to="/admin/forget">忘记密码</Link>
          </div>
          <Submit>登录</Submit>
          <div className={styles.other}>
            其他登录方式
            <Icon className={styles.icon} type="alipay-circle" />
            <Icon className={styles.icon} type="wechat" />
            <Link className={styles.signup} to="/admin/signup">申请管理员</Link>
          </div>
        </Signin>
      </div>
    );
  }
}