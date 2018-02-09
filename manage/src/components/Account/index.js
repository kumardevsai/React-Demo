import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Tabs } from 'antd';
import AccTab from './AccTab';
import AccItem from './AccItem';
import AccPic from './AccPic';
import AccMsg from './AccMsg';
import AccSubmit from './AccSubmit';
import styles from './index.scss';

@Form.create()
class Account extends Component {
  static defaultProps = {
    className: '',
    defaultActiveKey: '',
    onTabChange: () => {},
    onSubmit: () => {}
  };
  static propTypes = {
    className: PropTypes.string,
    defaultActiveKey: PropTypes.string,
    onTabChange: PropTypes.func,
    onSubmit: PropTypes.func
  };
  static childContextTypes = {
    tabUtil: PropTypes.object,
    form: PropTypes.object,
    updateActive: PropTypes.func
  };
  state = {
    type: this.props.defaultActiveKey,
    tabs: [],
    active: {}
  };

  getChildContext() {
    return {
      tabUtil: {
        addTab: (id) => {
          this.setState({
            tabs: [...this.state.tabs, id],
          });
        },
        removeTab: (id) => {
          this.setState({
            tabs: this.state.tabs.filter(currentId => currentId !== id),
          });
        }
      },
      form: this.props.form,
      updateActive: (activeItem) => {
        const { type, active } = this.state;
        if (active[type]) {
          active[type].push(activeItem);
        } else {
          active[type] = [activeItem];
        }
        this.setState({ active });
      }
    };
  }

  onSwitch(type) {
    this.setState({ type });
    this.props.onTabChange(type);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { active, type } = this.state;
    const activeFileds = active[type];
    this.props.form.validateFields(activeFileds, { force: true }, (err, values) => {
      this.props.onSubmit(err, values);
    });
  }

  render() {
    const { className, children } = this.props;
    const { type, tabs } = this.state;
    const TabChildren = [];
    const OtherChildren = [];
    React.Children.forEach(children, item => {
      if (!item) {
        return;
      }
      if (item.type.__QZ_ACC_TAB) {
        TabChildren.push(item);
      } else {
        OtherChildren.push(item);
      }
    });
    return (
      <div className={classNames(className, styles.account)}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          {
            tabs.length ? (
              <div>
                <Tabs
                  animated={false}
                  className={styles.tabs}
                  activeKey={type}
                  onChange={this.onSwitch.bind(this)}
                >
                  {TabChildren}
                </Tabs>
                {OtherChildren}
              </div>
            ) : [...children]
          }
        </Form>
      </div>
    );
  }
}

Account.Tab = AccTab;
Account.Pic = AccPic;
Account.Msg = AccMsg; 
Account.Submit = AccSubmit;
Object.keys(AccItem).forEach(item => {
  Account[item] = AccItem[item];
});

export default Account;