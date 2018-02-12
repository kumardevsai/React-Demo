import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { Layout, Icon } from 'antd';
import { getAdminInfo } from '@/store/admin.reducer';
import { changeLayoutCollapsed } from '@/store/global.reducer';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';
import SliderMenu from '@/components/SliderMenu';

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

@connect(
  ({ admin, global}) => ({
    currentStatus: admin.status,
    currentAdmin: admin.admin,
    collapsed: global.collapsed
  }),
  { getAdminInfo, changeLayoutCollapsed }
)
class BasicLayout extends PureComponent {
  componentWillMount() {
    this.props.getAdminInfo();
  }

  handleMenuCollapse(collapsed) {
    this.props.changeLayoutCollapsed(collapsed);
  }

  renderChild(status, layout) {
    switch(status) {
      case 'success':
        return layout;
      case 'audit':
        return <Redirect to="/admin/acc-result" />
      case 'reject':
        return <Redirect to="/admin/acc-result" />
      case 'normal':
      default:
        return <Redirect to="/admin/signin" />
    }
  }

  render() {
    const { collapsed, currentAdmin, currentStatus } = this.props;
    const layout = (
      <Layout>
        <SliderMenu
          collapsed={collapsed}
          onCollapse={this.handleMenuCollapse.bind(this)}
        />
        <Layout>
          <GlobalHeader
            currentAdmin={currentAdmin}
            collapsed={collapsed}
            onCollapse={this.handleMenuCollapse.bind(this)}
          />
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            hhh
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

    const child = this.renderChild(currentStatus, layout);

    return (
      <DocumentTitle title="hhh">
        <ContainerQuery query={query}>
          { parmas => (<div className={classNames(parmas)}>{child}</div>) }
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default BasicLayout;