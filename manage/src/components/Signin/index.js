import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import styles from './index.scss';

const FormItem = Form.Item;

@Form.create()
class Signin extends Component {
  render() {
    const { getFieldDecorator } = this.props.form; 
    return (
      <div className={styles.main}>
        <Form>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
           <Button className={styles.submit} size="large" type="primary" htmlType="submit">登录</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Signin;