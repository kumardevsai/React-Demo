import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Spin, Dropdown, Avatar, Divider } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import styles from './index.scss';

const { Header } = Layout;

export default class GlobalHeader extends PureComponent {
  toggle() {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  }
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  render() {
    const { currentAdmin, collapsed, isMobile, logo, onMenuClick } = this.props;
    const menu = (
      <Menu className={styles.menu} onClick={onMenuClick}>
        <Menu.Item disabled><Icon type="user" />个人中心</Menu.Item>
        <Menu.Item disabled><Icon type="setting" />设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="signout"><Icon type="logout" />退出</Menu.Item>
      </Menu>
    );
    return (
      <Header style={{ padding: 0 }}>
        <div className={styles.header}>
          {
            isMobile && (
              [
                (
                  <Link to="/" className={styles.logo} key="logo">
                    <img src={logo} alt="logo" width="32" />
                  </Link>
                ),
                <Divider type="vertical" key="line" />
              ]
            )
          }
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
                  <span className={styles.name}>{currentAdmin.nickname}</span>
                </span>
              </Dropdown>
            ) : <Spin size="small" style={{ marginLeft: 8 }} />}
          </div>
        </div>
      </Header>
    );
  }
}