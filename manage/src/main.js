import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import App from './App';

ReactDOM.render((
  <LocaleProvider local={zh_CN}>
    <App />
  </LocaleProvider>
  ),
  document.getElementById('root')
);