import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from '@/store';

import Interceptor from '@/components/Interceptor/Interceptor';
import Authorized from '@/components/Authorized/Authorized';

import Signin from '@/pages/Signin/Signin';
import Signup from '@/pages/Signup/Signup';
import Home from '@/pages/Home/Home';

import './index.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="root">
          <Interceptor />
          <Authorized />
          <Switch>
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route component={Home} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
