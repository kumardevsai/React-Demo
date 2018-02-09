import React, { PureComponent } from 'react';
// import { Switch } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { Layout } from 'antd';
import Authorized from '@/components/Authorized';
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

class BasicLayout extends PureComponent {
  render() {
    const layout = (
      <Layout>
        <SliderMenu

        />
        <Layout>
          <GlobalHeader 

          />
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            Content
          </Content>
          <GlobalFooter 

          />
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title="hhh">
        <ContainerQuery query={query}>
          { parmas => (<div className={classNames(parmas)}><Authorized />{layout}</div>) }
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default BasicLayout;