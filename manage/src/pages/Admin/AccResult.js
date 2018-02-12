import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Result from '@/components/Result';
import styles from './AccResult.scss';

const actionAudit = (
  <div className={styles.actions}>
    <Link to="/"><Button size="large">返回首页</Button></Link>
  </div>
);

const actionReject = (
  <div className={styles.actions}>
    <Button type="primary">重新申请</Button>
  </div>
);

const actionsNormal = (
  <div className={styles.actions}>
    <Link to="/admin/signup"><Button size="large" type="primary">申请成为管理员</Button></Link>
  </div>
);

const mapDesc = {
  normal: '请通过下面的按钮申请成为管理员，或者你想先看看我们的社区再决定是否成为一名管理员。',
  audit: '你的账户正在申请成为管理员，请耐心等待超管的审核，大概需要花费1-2个工作日。',
  reject: '很抱歉，鉴于你申请成为管理员被超管退回了，可通过下方查看退回原因，亦可重新申请。'
};

const mapAction = {
  normal: actionsNormal,
  audit: actionAudit,
  reject: actionReject
};

@connect(
  ({ admin }) => ({
    currentStatus: admin.status,
    currentAccount: admin.account
  }),
)
export default class AccResult extends Component {
  renderTitle(status, account) {
    const mapTitle = {
      normal: `你尚未申请成为管理员`,
      audit: `你的账户：${account} 正在申请成为管理员`,
      reject: `你的账户：${account} 申请管理员被退回`
    };
    return (
      <div className={styles.title}>{mapTitle[status]}</div>
    );
  }

  getStatus(status) {
    switch(status) {
      case 'normal':
        return 'error';
      case 'audit':
        return 'normal';
      case 'reject':
        return 'waring';
      default:
        return 'error';
    }
  }

  render() {
    const { currentStatus, currentAccount } = this.props;
    return(
      <Result
        className={styles.AccResult}
        type={this.getStatus(currentStatus)}
        title={this.renderTitle(currentStatus, currentAccount)}
        description={mapDesc[currentStatus]}
        actions={mapAction[currentStatus]}
        style={{ marginTop: 56 }}
      />
    );
  }
}
