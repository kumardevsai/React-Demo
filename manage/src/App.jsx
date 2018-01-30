import React from 'react';
// import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Authorized from './components/Authorized/Authorized';
import Article from './components/Article/Article';

class App extends React.Component {
  render() {
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
}

export default App;
