'use strict';

import { combineReducers, createStore, compose } from 'redux';
import { user } from './user.redux';

const reducers = combineReducers({ user });
const store = createStore(reducers, compose(

));

export default store;