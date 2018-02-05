import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button } from 'antd';
import omit from 'omit.js';
import map from './map';
import styles from './index.scss';

const FormItem = Form.Item;

function generator({ defaultProps, defaultRules, type }) {
  return (WrappedComponent) => {
    return class BasicComponent extends Component {
      static contextTypes = {
        form: PropTypes.object,
        updateActive: PropTypes.func,
      };
      constructor(props) {
        super(props);
        this.state = {
          count: 0,
        };
      }
      componentDidMount() {
        if (this.context.updateActive) {
          this.context.updateActive(this.props.name);
        }
      }
      render() {
        const { getFieldDecorator } = this.context.form;
        const options = {};
        let otherProps = {};
        const { onChange, defaultValue, rules, name, ...restProps } = this.props;
        const { count } = this.state;
        options.rules = rules || defaultRules;
        if (onChange) {
          options.onChange = onChange;
        }
        if (defaultValue) {
          options.initialValue = defaultValue;
        }
        otherProps = restProps || otherProps;
        if (type === 'Captcha') {
          const inputProps = omit(otherProps, ['onGetCaptcha']);
          return (
            <FormItem>
              <Row gutter={8}>
                <Col span={16}>
                  {getFieldDecorator(name, options)(
                    <WrappedComponent {...defaultProps} {...inputProps} />
                  )}
                </Col>
                <Col span={8}>
                  <Button
                    disabled={count}
                    className={styles.getCaptcha}
                    size="large"
                    onClick={this.onGetCaptcha}
                  >
                    {count ? `${count} s` : '获取验证码'}
                  </Button>
                </Col>
              </Row>
            </FormItem>
          );
        }
        return (
          <FormItem>
            {getFieldDecorator(name, options)(
              <WrappedComponent {...defaultProps} {...otherProps} />
            )}
          </FormItem>
        );
      }
    }
  }
}

const SigninItem = {};
Object.keys(map).forEach(item => {
  SigninItem[item] = generator({
    defaultProps: map[item].props,
    defaultRules: map[item].rules,
    type: item
  })(map[item].component);
});

export default SigninItem;