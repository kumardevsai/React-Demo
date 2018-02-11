import React, { PureComponent } from 'react';
import { Layout, Icon, Menu, Spin, Dropdown, Avatar } from 'antd';
import styles from './index.scss';

const { Header } = Layout;

export default class GlobalHeader extends PureComponent {
  toggle() {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  }

  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  render() {
    const { currentAdmin, collapsed } = this.props;
    const menu = (
      <Menu className={styles.menu}>
        <Menu.Item key="admin"><Icon type="user" />个人中心</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="signout"><Icon type="logout" />退出</Menu.Item>
      </Menu>
    );
    return (
      <Header style={{ padding: 0 }}>
        <div className={styles.header}>
          <Icon
            className={styles.trigger}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle.bind(this)}
          />
          <div className={styles.right}>
            {currentAdmin ? (
              <Dropdown overlay={menu}>
                <span className={`${styles.action} ${styles.account}`}>
                  <Avatar size="small" className={styles.avatar} src={currentAdmin.avatar} />
                  <span className={styles.name}>{currentAdmin.name}</span>
                </span>
              </Dropdown>
            ) : <Spin size="small" style={{ marginLeft: 8 }} />}
          </div>
        </div>
      </Header>
    );
  }
}