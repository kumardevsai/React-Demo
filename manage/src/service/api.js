import fetch from './fetch';

/*
* 获取用户信息
*/
export const getUserInfo = () => fetch('/user/info');

/*
* 管理员登录
*/
export const signin = (adminInfo) => fetch('/admin/signin', adminInfo, 'POST');

/*
* 管理员申请
*/
export const signin = (adminInfo) => fetch('/admin/signin', adminInfo, 'POST');

/*
* 管理员登出
*/
export const signout = () => fetch('/admin/signout');
