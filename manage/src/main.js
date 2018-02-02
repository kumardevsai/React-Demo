import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'antd/dist/antd.css';

ReactDOM.render(
  (
    <LocaleProvider local={zh_CN}>
      <App />
    </LocaleProvider>
  ),
  document.getElementById('root')
);