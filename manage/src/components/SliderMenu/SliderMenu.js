import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import styles from './index.scss';
import logo from '@/assets/logo.svg';

const { Sider } = Layout;
const { SubMenu } = Menu;

class SliderMenu extends Component {
  render() {
    const { collapsed, onCollapse } = this.props;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={256}
        className={styles.sider}
      >
        <div className={styles.logo} key="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>Qz Demo Manage</h1>
          </Link>
        </div>
        <Menu
          key="menu"
          theme="dark"
          mode="inline"
          style={{ padding: '16px 0', width: '100%' }}
        >
          <SubMenu key="dashboard" title={<span><Icon type="dashboard" /><span>dashboard</span></span>}>
            <Menu.Item key="analysis"><Link to="/dashboard/analysis">分析页</Link></Menu.Item>
            <Menu.Item key="monitor"><Link to="/dashboard/monitor">监控页</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="account" title={<span><Icon type="team" /><span>账户管理</span></span>}>
            <Menu.Item key="adminlist"><Link to="/account/adminlist">管理员列表</Link></Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default SliderMenu;