import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from '@/store';
import Authorized from '@/components/Authorized/Authorized';
import AdminLayout from '@/layouts/AdminLayout/AdminLayout';
import BasicLayout from '@/layouts/BasicLayout/BasicLayout';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Authorized />
          <Switch>
            <Route path="/signin" component={AdminLayout} />
            <Route path="/signup" component={AdminLayout} />
            <Route path="/" component={BasicLayout}>
              <Route path="/home" component={BasicLayout} />
              <Route path="/user" component={BasicLayout} />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
