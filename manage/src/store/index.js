import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { admin } from './admin.reducer';
import { global } from './global.reducer';

const store = createStore(combineReducers({ admin, global }), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;