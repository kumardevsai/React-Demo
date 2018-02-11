import React from 'react';
import classNames from 'classnames';
import { Button, Form } from 'antd';
import styles from './index.scss';

const FormItem = Form.Item;

export default ({ className, text, children, ...rest }) => {
  const clsString = classNames(styles.submit, className);
  return (
    <FormItem>
      <Button size="large" className={clsString} type="primary" htmlType="submit" {...rest} >{text}</Button>
      {children}
    </FormItem>
  );
}