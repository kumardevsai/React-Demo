import React from 'react';
import { Input, Icon } from 'antd';
import styles from './index.scss';

const map = {
  Username: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="user" className={styles.prefixIcon} />,
      placeholder: '请输入账户名！'
    },
    rules: [{
      required: true, message: '请输入账户名！'
    }]
  },
  Password: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="lock" className={styles.prefixIcon} />,
      placeholder: '请输入密码！'
    },
    rules: [{
      required: true, message: '请输入密码！'
    }]
  },
  Mobile: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="mobile" className={styles.prefixIcon} />,
      placeholder: '手机号'
    },
    rules: [{
      required: true, message: '请输入手机号！'
    }, {
      pattern: /^1[3, 5, 7, 8, 9]\d{9}$/, message: '手机号格式错误！'
    }]
  },
  Captcha: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="info-circle" className={styles.prefixIcon} />,
      placeholder: '验证码'
    },
    rules: [{
      required: true, message: '请输入验证码'
    }]
  }
}

export default map;