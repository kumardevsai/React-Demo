import React, { Component } from 'react';
// import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Authorized from './components/Authorized/Authorized';
import Article from './components/Article/Article';

const App = () => {
  return (
    <Router>
      <div>
        <Authorized />
        <Switch>
          <Route path="/article" component={Article} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;