import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

export default class AccTab extends Component {
  static __QZ_ACC_TAB = true;
  static contextTypes = {
    tabUtil: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.uniqueId = generateId('account-tab-');
  }
  componentWillMount() {
    if (this.context.tabUtil) {
      this.context.tabUtil.addTab(this.uniqueId);
    }
  }

  render() {
    return <TabPane {...this.props} />;
  }
}