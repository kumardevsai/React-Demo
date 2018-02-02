import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from '@/store';

// import AuthorizedRoute from '@/components/AuthorizedRoute/AuthorizedRoute';
// import BasicLayout from '@/layouts/BasicLayout/BasicLayout';
import AdminLayout from '@/layouts/AdminLayout/AdminLayout';

import './index.scss';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route
            path="/admin"
            component={ AdminLayout }
          />
          {/*<AuthorizedRoute 
            path="/"
            render={props => <BasicLayout {...props} />}
            redireactPath="/admin/signin"
          />*/}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
