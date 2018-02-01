import React from 'react';
import { getStatus } from '@/service/api';
import { Spin } from 'antd';

import './Interceptor.css';

class Interceptor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false
    }
  }

  componentDidMount() {
    this.getStatus();
  }

  async getStatus() {
    try {
      const res = await getStatus();
      if (res) {
        this.setState({
          status: true
        });
      }
    } catch (err) {

    }
  }

  render() {
    return (
      <div>
        {this.state.status ? null : <div className='pull-container'><Spin tip="服务器无响应..." size="large" wrapperClassName="spin" /></div>}
      </div>
    );
  }
}

export default Interceptor;