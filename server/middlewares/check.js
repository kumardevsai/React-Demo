'use strict';

export default class Check {
  constructor () {}

  isLogin (req, res, next) {
    next();
  }

  isAdmin (req, res, next) {
    next();
  }

  isHimSelf (req, res, next) {
    next();
  }
}