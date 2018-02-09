import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Row, Col, Icon, Button } from 'antd';
import styles from './index.scss';
import { getMsgCaptchaApi } from '@/service/api';

const FormItem = Form.Item;

export default class AccMsg extends Component {
  static contextTypes = {
    form: PropTypes.object,
    updateActive: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      msg_name: '',
      pic_name: ''
    }
  }

  componentWillMount() {
    this.setState({
      msg_name: this.props.name,
      pic_name: this.props.pic
    });
  }

  componentDidMount() {
    if (this.context.updateActive) {
      this.context.updateActive(this.props.name);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetMsgCaptcha() {
    const { form } = this.context;
    const { pic_name } = this.state;
    form.validateFields(['mobile', pic_name], { force: true }, async (err, values) => {
      if (!err) {
        const res = await getMsgCaptchaApi({ mobile: values.mobile });
        console.log(res);
        if (res.status === 1) {
          let count = 59;
          this.setState({ count });
          this.interval = setInterval(() => {
            count -= 1;
            this.setState({ count });
            if (count === 0) {
              clearInterval(this.interval);
            }
          }, 1000);
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.context.form;
    const { msg_name, count } = this.state;
    return (
      <FormItem>
        <Row gutter={8}>
          <Col span={16}>
            {
              getFieldDecorator(msg_name, {
                rules: [{
                  required: true,
                  message: '短信验证码不能为空'
                }, {
                  pattern: /^\d{6}$/,
                  message: '短信验证码必须为6位数字'
                }]
              })(<Input prefix={<Icon type="clock-circle-o" className={styles.prefixIcon} />} size="large" placeholder="短信验证码" autoComplete="off" />)
            }
          </Col>
          <Col span={8}>
            <Button
              size="large"
              disabled={count}
              className={styles.getCaptcha}
              onClick={this.onGetMsgCaptcha.bind(this)}
            >
              {count ? `${count} s` : '获取验证码'}
            </Button>
          </Col>
        </Row>
      </FormItem>
    );
  }
}