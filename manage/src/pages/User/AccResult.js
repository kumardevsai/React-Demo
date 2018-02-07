import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Result from '@/components/Result';
import styles from './AccResult.scss';

console.log(styles)

const actionsSuccess = (
  <div className={styles.actions}>
    <Link to=""><Button size="large" type="primary">查看结果</Button></Link>
    <Link to="/"><Button size="large">返回首页</Button></Link>
  </div>
);

const actionInfo = (
  <div className={styles.actions}>
    hhh
  </div>
);

const actionWarn = (
  <div className={styles.actions}>
    hhh
  </div>
);

const actionsError = (
  <div className={styles.actions}>
    <Link to="/admin/signup"><Button size="large" type="primary">申请成为管理员</Button></Link>
  </div>
);

const mapDesc = {
  error: '请通过下面的按钮申请成功管理员',
  warn: '点击下方按钮查看退回原因，可以重新申请',
  info: '',
  success: '你已经成功申请成为管理员'
};

const mapAction = {
  error: actionsError,
  warn: actionWarn,
  info: actionInfo,
  success: actionsSuccess
};

@connect(
  state => state.admin
)
export default class AccResult extends Component {
  renderTitle(status, account) {
    const mapTitle = {
      error: `你尚未申请成为管理员`,
      warn: `你的账户：${account}申请管理员被退回`,
      info: `你的账户：${account}正在申请成为管理员`,
      success: `你的账户：${account}已经成功成为管理员`
    };

    return (
      <div className={styles.title}>{mapTitle[status]}</div>
    );
  }

  render() {
    const { status_r, admin_r } = this.props;
    const account = admin_r ? admin_r.username : null;
    return(
      <Result
        className={styles.AccResult}
        type={status_r}
        title={this.renderTitle(status_r, account)}
        description={mapDesc[status_r]}
        actions={mapAction[status_r]}
        style={{ marginTop: 56 }}
      />
    );
  }
}
