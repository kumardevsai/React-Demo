import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import store from '@/store';

import BasicLayout from '@/layouts/BasicLayout';
import AdminLayout from '@/layouts/AdminLayout';

import './index.scss';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route
            path="/account"
            component={ AdminLayout }
          />
          <Route
            path="/"
            component={ BasicLayout }
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
