import fetch from './fetch';

/*
* 图形验证码
*/
export const getPicCaptchaApi = () => fetch('/common/piccaptcha');

/*
* 短信验证码
*/
export const getMsgCaptchaApi = mobile => fetch('/common/msgcaptcha', mobile);

/*
* 管理员登录
*/
export const signinApi = (adminInfo) => fetch('/admin/signin', adminInfo, 'POST');

/*
* 管理员申请
*/
export const signupApi = (adminInfo) => fetch('/admin/signup', adminInfo, 'POST');

/*
* 管理员登出
*/
export const signoutApi = () => fetch('/admin/signout');

/*
* 获取管理员信息
*/
export const getAdminInfoApi = () => fetch('/admin/info');
