import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { account } from './account.reducer';
import { global } from './global.reducer';
import { admin } from './admin.reducer';

const store = createStore(combineReducers({ account, global, admin }), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;