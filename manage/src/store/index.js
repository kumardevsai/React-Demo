import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { admin } from './admin.reducer';
import { signin } from './signin.reducer';

const store = createStore(combineReducers({ admin, signin }), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;