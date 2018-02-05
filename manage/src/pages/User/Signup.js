import React, { Component } from 'react';
import { Form, Input, Select, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Signup.scss';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

@Form.create()
export default class SignupPage extends Component {
  state = {
    count: 0,
    prefix: '86'
  }

  onGetCaptcha() {
    console.log(1);
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
              getFieldDecorator('mail', {

              })(<Input size="large" placeholder="邮箱" />)
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('password', {

              })(<Input size="large" placeholder="密码" />)
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('confimp', {

              })(<Input size="large" placeholder="确认密码" />)
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

                })(<Input size="large" style={{ width: '80%' }} placeholder="手机号" />)
              }
            </InputGroup>
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {
                  getFieldDecorator('captcha', {

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
