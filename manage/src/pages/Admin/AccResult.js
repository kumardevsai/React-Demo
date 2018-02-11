import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Result from '@/components/Result';
import styles from './AccResult.scss';

const actionsSuccess = (
  <div className={styles.actions}>
    <Link to=""><Button size="large" type="primary">查看结果</Button></Link>
    <Link to="/"><Button size="large">返回首页</Button></Link>
  </div>
);

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
  reject: '很抱歉，鉴于你申请成为管理员被超管退回了，可通过下方查看退回原因，亦可重新申请。',
  success: '恭喜你成为我们社区的一名管理员，希望你能够为社区带来更好的未来。'
};

const mapAction = {
  normal: actionsNormal,
  audit: actionAudit,
  reject: actionReject,
  success: actionsSuccess
};

@connect(
  ({ account }) => ({
    account: account
  }),
)
export default class AccResult extends Component {
  renderTitle(status, account) {
    const mapTitle = {
      normal: `你尚未申请成为管理员`,
      audit: `你的账户：${account} 正在申请成为管理员`,
      reject: `你的账户：${account} 申请管理员被退回`,
      success: `你的账户：${account} 已经成功成为管理员`
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
      case 'success':
        return 'success';
      default:
        return 'error';
    }
  }

  render() {
    const { account } = this.props;
    return(
      <Result
        className={styles.AccResult}
        type={this.getStatus(account.status)}
        title={this.renderTitle(account.status, account.account)}
        description={mapDesc[account.status]}
        actions={mapAction[account.status]}
        style={{ marginTop: 56 }}
      />
    );
  }
}
