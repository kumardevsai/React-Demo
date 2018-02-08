import { signupApi } from '@/service/api';

const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';
const LOAD = 'LOAD';

/*
* 状态status_r
* error 无
* info 待审核
* warn 被驳回
* success 成功通过
*/

const initState = {
  status_r: 'error',
  error_r: null,
  admin_r: null,
  permissions_r: 'visitor'
};

// reducer
export function admin(state=initState, action) {
  const { type, payload, data, status } = action;

  switch(type) {
    case LOAD:
      return {...state, admin_r: payload };
    case SUCCESS:
      return {...state, admin_r: data, status_r: status, permissions_r: 'admin' };
    case ERROR:
      return {...state, error_r: payload };
    default:
      return state;
  }
}

function error(msg) {
  return { type: ERROR, payload: msg };
}

function success(data, status) {
  return { type: SUCCESS, data, status };
}

export function load(data) {
  return { type: LOAD, payload: data };
}

export function signin(userInfo) {

}

export function signup(userInfo) {
  return dispatch => {
    signupApi(userInfo).then(res => {
      console.log(res);
      if (res.status === 1) {
        dispatch(success(res.data, 'info'));
      } else {
        dispatch(error(res.message));
      }
    });
  }
}