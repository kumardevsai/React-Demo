import fetch from './fetch';

/*
* 用户注册
*/
export const signup = (userInfo) => fetch('/signup', userInfo, 'POST');

/*
* 用户登录
*/
export const signin = (userInfo) => fetch('/signin', userInfo, 'POST');

/*
* 用户登出
*/
export const signout = () => fetch('/signout');

/*
* 获取用户信息
*/
export const getUserInfo = () => fetch('/user/info');
