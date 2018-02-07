import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAdminInfoApi } from '@/service/api';
import { load } from '@/store/admin.reducer';

@withRouter
@connect(
  null,
  { load }
)
class Authorized extends React.Component {
  componentDidMount() {
    const publicList = ['/admin'];
    const pathname = this.props.location.pathname;
    if (publicList.includes(pathname)) {
      return null;
    }
    this.isSignin();
  }
  async isSignin() {
    const res = await getAdminInfoApi();

    if (res.status === 1) {
      this.props.load(res.data);
    } else {
      this.props.history.push('/admin/signin');
    }
  }
  render() {
    return null;
  }
}

export default Authorized;