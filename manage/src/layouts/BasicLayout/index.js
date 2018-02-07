import React, { Component } from 'react';
// import { Switch } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import Authorized from '@/components/Authorized';

class BasicLayout extends Component {
  render() {
    return (
      <DocumentTitle title="hhh">
        <div>
          <Authorized />
          <div>
            测试成功
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default BasicLayout;