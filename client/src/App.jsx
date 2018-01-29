'use strict';

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import Home from './pages/home/home';
import Genre from './pages/genre/genre';
import Add from './pages/add/add';
import Mood from './pages/mood/mood';
import User from './pages/user/user';
import Footer from './components/footer/footer';

import './style/normalize.scss';
import './style/index.scss';

import store from './store';

const App = () => (
  <Provider store={ store }>
    <Router>
      <div>
        <Route exact path="/" render={() => <Redirect to="/home" />} key="entry" />
        <Route path="/home" component={ Home } key="home" />
        <Route path="/genre" component={ Genre } key="genre" />
        <Route path="/add" component={ Add } key="add" />
        <Route path="/mood" component={ Mood } key="mood" />
        <Route path="/user" component={ User } key="user" />
        <Footer />
      </div>
    </Router>
  </Provider>
);

export default App;
