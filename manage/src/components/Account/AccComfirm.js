import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Icon } from 'antd';
import styles from './index.scss';

const FormItem = Form.Item;

export default class AccComfirm extends Component {
  static defaultProps = {
    name: 'comfirmp',
    password: 'password'
  };
  static propTypes = {
    name: PropTypes.string,
    password: PropTypes.string
  };
  static contextTypes = {
    form: PropTypes.object,
    updateActive: PropTypes.func
  };

  componentDidMount() {
    if (this.context.updateActive) {
      this.context.updateActive(this.props.name);
    }
  }

  checkConfimp(rule, value, callback) {
    const { form } = this.context;
    const { password } = this.props;
    if (!value) {
      callback('确认密码不能为空');
    }else if (value !== form.getFieldValue(password)) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.context.form;
    const { name } = this.props;
    return(
      <FormItem>
      {
        getFieldDecorator(name, {
          rules: [{
            validator: this.checkConfimp.bind(this)
          }]
        })(<Input prefix={<Icon type="lock" className={styles.prefixIcon} />} type="password" size="large" placeholder="确认密码" />)
      }
      </FormItem>
    );
  }
}