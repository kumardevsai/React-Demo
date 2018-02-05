import fetch from './fetch';

/*
* 管理员登录
*/
export const signin = (adminInfo) => fetch('/admin/signin', adminInfo, 'POST');

/*
* 管理员申请
*/
export const signup = (adminInfo) => fetch('/admin/signup', adminInfo, 'POST');

/*
* 管理员登出
*/
export const signout = () => fetch('/admin/signout');

/*
* 获取管理员信息
*/
export const getAdminInfo = () => fetch('/admin/info');
