import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAdminInfo } from '@/service/api';
import { userInfo } from '@/store/user.reducer';

@withRouter
@connect(
  null,
  { userInfo }
)
class Authorized extends React.Component {
  componentDidMount() {
    const publicList = ['/signin', '/signup'];
    const pathname = this.props.location.pathname;
    if (publicList.includes(pathname)) {
      return null;
    }
    this.isLoigin();
  }

  async isLoigin() {
    const res = await getAdminInfo();

    if (res.status === 1) {
      this.props.userInfo(res.data);
    } else {
      this.props.history.push('signin');
    }
  }

  render() {
    return null;
  }
}

export default Authorized;