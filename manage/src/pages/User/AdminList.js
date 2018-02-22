import React, { Component } from 'react';
import { Table, Divider } from 'antd';
import { getAdminListApi } from '@/service/api';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';

const columns = [{
  title: 'ID',
  dataIndex: 'id'
}, {
  title: '昵称',
  dataIndex: 'nickname',
}, {
  title: '用户名',
  dataIndex: 'username'
}, {
  title: '手机号',
  dataIndex: 'mobile'
}, {
  title: '级别',
  dataIndex: 'role'
}, {
  title: '状态',
  dataIndex: 'status'
}, {
  title: '创建时间',
  dataIndex: 'create_at'
}, {
  title: '操作',
  dataIndex: '',
  render: (text, record) => {
    const statusSuccess = (
      <span>
        <a>删除</a>
      </span>
    );

    const statusAudit = (
      <span>
        <a>删除</a>
        <Divider type="vertical" />
        <a>通过</a>
        <Divider type="vertical" />
        <a>驳回</a>
      </span>
    );

    return (
      <div>
        { record.status === 'audit' ? statusAudit : statusSuccess }
      </div>
    );
  }
}];

export default class AdminList extends Component {
  state = {
    data: []
  }

  componentWillMount() {
    this.getAdminList();
  }

  async getAdminList() {
    const res = await getAdminListApi();
    if (res.status === 1) {
      this.setState({ data: res.data });
    }
  }

  onSelectChange() {

  }

  render() {
    const { data } = this.state;
    const rowSelection = {
      data,
      onChange: this.onSelectChange
    }
    return (
      <PageHeaderLayout title="管理员列表">
        hh
      </PageHeaderLayout>
    );
  }
}