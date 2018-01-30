import React from 'react';
import { Link } from 'react-router-dom';

import './footer.scss';

const Footer = () => {
  return (
    <div className="footer-fixed">
      <Link to="/home" className="iconfont">&#xe637;</Link>
      <Link to="/genre" className="iconfont">&#xe602;</Link>
      <Link to="/add" className="iconfont">&#xe648;</Link>
      <Link to="/mood" className="iconfont">&#xe60a;</Link>
      <Link to="/user" className="iconfont">&#xe670;</Link>
    </div>
  )
}

export default Footer;