import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

@withRouter
class Authorized extends Component {
  componentDidMount() {
    const publicList = ['/signin', '/signup'];
    const pathname = this.props.location.pathname;
    if (publicList.includes(pathname)) {
      return null;
    }
  }

  render() {
    return null;
  }
}

export default Authorized;