import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import styles from './AdminLayout.scss';
import logo from '@/assets/logo.svg';
import Signin from '@/pages/User/Signin';
import Signup from '@/pages/User/Signup';
import AccResult from '@/pages/User/AccResult';
import GlobalFooter from '@/components/GlobalFooter';

class AdminLayout extends Component {
  getPageTitle() {
    let title = '技术社区-管理端'
    return title;
  }
  render() {
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>技术社区-管理端</span>
                </Link>
              </div>
              <div className={styles.desc}>React + Redux + Express + MongoDB + Antd + Purely 构建技术社区！</div>
            </div>
            <Switch>
              <Route path="/admin/signin" component={Signin} key="signin" />
              <Route path="/admin/signup" component={Signup} key="signup" />
              <Route path="/admin/acc-result" component={AccResult} key="acc-result" />
              <Redirect exact from="/admin" to="/admin/signin" />
            </Switch>
          </div>
          <GlobalFooter
            links={
              [{
                key: 'home',
                title: '首页',
                href: ''
              }, {
                key: 'help',
                title: '帮助',
                href: ''
              }]
            }
            copyright={
              <div>Copyright <Icon type="copyright" /> 2018 青湛鼎力出品.</div>
            }
          />
        </div>
      </DocumentTitle>
    );
  }
}

export default AdminLayout;
