import React, { PureComponent } from 'react';
import { Layout, Icon } from 'antd';
import styles from './index.scss';

const { Header } = Layout;

export default class GlobalHeader extends PureComponent {
  render() {
    const { collapsed } = this.props;
    return (
      <Header className={styles.header}>
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
      </Header>
    );
  }
}