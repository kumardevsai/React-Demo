import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { enquireScreen } from 'enquire-js';
import { Layout, Icon } from 'antd';
import { getAdminInfo, signoutFunc } from '@/store/admin.reducer';
import { changeLayoutCollapsed } from '@/store/global.reducer';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';
import SliderMenu from '@/components/SliderMenu';
import logo from '@/assets/logo.svg';
import Analysis from '@/pages/Dashboard/Analysis';
import Monitor from '@/pages/Dashboard/Monitor';
import AdminList from '@/pages/User/AdminList';

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

@connect(
  ({ admin, global}) => ({
    currentStatus: admin.status,
    currentAdmin: admin.admin,
    collapsed: global.collapsed
  }),
  { getAdminInfo, signoutFunc, changeLayoutCollapsed }
)
class BasicLayout extends PureComponent {
  static childContextTypes = {
    location: PropTypes.object
  };
  state = {
    isMobile
  };
  getChildContext() {
    const { location } = this.props;
    return {
      location
    };
  }

  componentWillMount() {
    if (!this.props.currentAdmin) {
      this.props.getAdminInfo();
    }
  }

  componentDidMount() {
    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    });
  }

  handleMenuCollapse(collapsed) {
    this.props.changeLayoutCollapsed(collapsed);
  }

  handleMenuClick({ key }) {
    if (key === 'signout') {
      this.props.signoutFunc();
    }
  }

  getPath(status) {
    switch(this.props.currentStatus) {
      case 'success':
        return null;
      case 'audit':
        return <Redirect to="/account/acc-result" />
      case 'reject':
        return <Redirect to="/account/acc-result" />
      case 'normal':
      default:
        return <Redirect to="/account/signin" />
    }
  }

  render() {
    const { collapsed, currentStatus, currentAdmin } = this.props;
    const path = this.getPath(currentStatus);
    const layout = (
      <Layout>
        <SliderMenu
          collapsed={collapsed}
          isMobile={this.state.isMobile}
          onCollapse={this.handleMenuCollapse.bind(this)}
        />
        <Layout>
          <GlobalHeader
            logo={logo}
            currentAdmin={currentAdmin}
            collapsed={collapsed}
            isMobile={this.state.isMobile}
            onMenuClick={this.handleMenuClick.bind(this)}
            onCollapse={this.handleMenuCollapse.bind(this)}
          />
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/dashboard/analysis" />} key="home" />
              <Route exact path="/dashboard" render={() => <Redirect to="/dashboard/analysis" />}  key="dashboard" />
              <Route path="/dashboard/analysis" component={Analysis} key="analysis" />
              <Route path="/dashboard/monitor" component={Monitor} key="monitor" />
              <Route exact path="/user" render={() => <Redirect to="/user/adminlist" />} key="user" />
              <Route path="/user/adminlist" component={AdminList} key="adminlist" />
            </Switch>
          </Content>
          <GlobalFooter
            links={
              [{
                key: 'home',
                title: '首页',
                href: ''
              },{
                key: 'help',
                title: '帮助',
                href: ''
              },{
                key: 'github',
                title: 'GITHUB',
                href: 'https://github.com/yudaren007007/React-Demo',
                blankTarget: true
              }]
            }
            copyright={
              <div>Copyright <Icon type="copyright" /> 2018 青湛鼎力出品.</div>
            }
          />
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title="hhh">
        <ContainerQuery query={query}>
          { parmas => (<div className={classNames(parmas)}>{path ? path : layout}</div>) }
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default BasicLayout;