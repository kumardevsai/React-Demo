import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import styles from './index.scss';
import logo from '@/assets/logo.svg';

const { Sider } = Layout;

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
      </Sider>
    );
  }
}

export default SliderMenu;