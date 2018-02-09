import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import map from './map';

const FormItem = Form.Item;

function generator({ defaultProps, defaultRules, type}) {
  return (WrappedComponent) => {
    return class BasicComponent extends Component {
      static contextTypes = {
        form: PropTypes.object,
        updateActive: PropTypes.func
      }

      componentDidMount() {
        if (this.context.updateActive) {
          this.context.updateActive(this.props.name);
        }
      }

      render() {
        const { getFieldDecorator } = this.context.form;
        const options = {};
        const { onChange, defaultValue, rules, name, src, ...restProps } = this.props;
        options.rules = rules || defaultRules;
        if (onChange) {
          options.onChange = onChange;
        }
        if (defaultValue) {
          options.initialValue = defaultValue;
        }
        return(
          <FormItem>
            {getFieldDecorator(name, options)(
              <WrappedComponent {...defaultProps} {...restProps} />
            )}
          </FormItem>
        );
      }
    }
  }
}

const AccItem = {};
Object.keys(map).forEach(item => {
  AccItem[item] = generator({
    defaultProps: map[item].props,
    defaultRules: map[item].rules,
    type: item
  })(map[item].component);
});

export default AccItem;