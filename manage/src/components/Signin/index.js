import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Tabs } from 'antd';
import SigninItem from './SigninItem';
import SigninTab from './SigninTab';
import SigninSubmit from './SigninSubmit';
import styles from './index.scss';

@Form.create()
class Signin extends Component {
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
    onSubmit: PropTypes.func,
  };
  static childContextTypes = {
    tabUtil: PropTypes.object,
    form: PropTypes.object,
    updateActive: PropTypes.func,
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
        },
      },
      form: this.props.form,
      updateActive: (activeItem) => {
        const { type, active } = this.state;
        if (active[type]) {
          active[type].push(activeItem);
        } else {
          active[type] = [activeItem];
        }
        this.setState({
          active,
        });
      },
    };
  }


  componentDidMount() {
    // console.log(this.props);
  }

  onSwitch(type) {
    this.setState({
      type
    });
    this.props.onTabChange(type);
  }

  handleSubmit() {
    console.log(1);
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
      if (item.type.__QZ_SIGNIN_TAB) {
        TabChildren.push(item);
      } else {
        OtherChildren.push(item);
      }
    });
    return (
      <div className={classNames(className, styles.signin)}>
        <Form onSubmit={this.handleSubmit}>
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

Signin.Tab = SigninTab;
Signin.Submit = SigninSubmit;
Object.keys(SigninItem).forEach(item => {
  Signin[item] = SigninItem[item];
});

export default Signin;