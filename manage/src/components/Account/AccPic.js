import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Row, Col, Icon } from 'antd';
import styles from './index.scss';
import { getPicCaptchaApi } from '@/service/api';

const FormItem = Form.Item;

export default class AccPic extends Component {
  static defaultProps = {
    name: 'pic_captcha'
  };
  static propTypes = {
    name: PropTypes.string
  };
  static contextTypes = {
    form: PropTypes.object,
    updateActive: PropTypes.func
  };
  
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      token: '',
      time: null
    }
  }

  componentWillMount() {
    this.onGetPicCaptcha();
  }

  componentWillUnmount() {
    this.setState = () => {};
  }

  componentDidMount() {
    if (this.context.updateActive) {
      this.context.updateActive(this.props.name);
    }
  }

  async onGetPicCaptcha() {
    const res = await getPicCaptchaApi();
    if (res.status === 1) {
      this.setState({
        url: res.data.url,
        token: res.data.token,
        time: Date.now()
      });
    } else {
      this.setState({
        url: '',
        token: '',
        time: null
      });
    }
  }

  async changeGetCaptcha() {
    await this.onGetPicCaptcha();
    const { form } = this.context;
    form.validateFields([this.props.name], { force: true });
  }


  checkPicCode(rule, value, callback) {
    if (!value) {
      callback('图形验证码不能为空');
    } else if (value.length !== 5) {
      callback('图形验证码必须是5位');
    } else {
      const { time, token } = this.state;
      if (value.toLowerCase() !== token.toLowerCase()) {
        callback('图形验证码错误，请重新输入');
      }
      if ((Date.now() - time) / (1000 * 60) > 5) {
        callback('图形验证码已经失效，请重新获取');
      }
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.context.form;
    const { url } = this.state;
    const { name, ...restProps } = this.props;
    return (
      <FormItem>
        <Row gutter={8}>
          <Col span={16}>
            {
              getFieldDecorator(name, {
                rules: [{
                  validator: this.checkPicCode.bind(this)
                }]
              })(<Input prefix={<Icon type="info-circle-o" className={styles.prefixIcon} />} size="large" placeholder="图形验证码" autoComplete="off" {...restProps} />)
            }
          </Col>
          <Col span={8}>
            <img
              className={styles.picCaptcha}
              src={url}
              onClick={this.changeGetCaptcha.bind(this)}
              alt="图形验证码"
            />
          </Col>
        </Row>
      </FormItem>
    );
  }
}