import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Signin.css';
import { Form, Icon, Input, Checkbox, Button } from 'antd';

const FormItem = Form.Item;

class Signin extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="container">
        <div className="content">
          <div className="top">
            <div className="header">
              <Link to="/">
                <span className="title">技术社区-管理端</span>
              </Link>
            </div>
            <div className="desc">哈哈哈哈</div>
          </div>
          <div className="main">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>Remember me</Checkbox>
                )}
                <a className="login-form-forgot" href="">Forgot password</a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                Or <a href="">register now!</a>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

Signin = Form.create()(Signin);

export default Signin;