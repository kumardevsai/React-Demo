import React, { PureComponent } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import styles from './index.scss';
import logo from '@/assets/logo.svg';
import Signin from '@/pages/Account/Signin';
import Signup from '@/pages/Account/Signup';
import Forget from '@/pages/Account/Forget';
import AccResult from '@/pages/Account/AccResult';
import GlobalFooter from '@/components/GlobalFooter';

class AdminLayout extends PureComponent {
  getPageTitle() {
    let title = '管理端-技术社区'
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
              <Route path="/account/signin" component={Signin} key="signin" />
              <Route path="/account/signup" component={Signup} key="signup" />
              <Route path="/account/forget" component={Forget} key="forget" />
              <Route path="/account/acc-result" component={AccResult} key="acc-result" />
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
