import { signupApi, signinApi, signoutApi, getAdminInfoApi } from '@/service/api';

const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';
const AUDIT = 'AUDIT';
const REJECT = 'REJECT';
const CHANGE_SIGNIN_TYPE = 'CHANGE_SIGNIN_TYPE';
const SIGNOUT = 'SIGNOUT';

/*
* status: 存储管理员申请状态
* normal  申请状态 --> 无
* sucess  申请成功状态
* audit   申请待审核状态
* reject  申请被拒状态
* error   申请错误状态
*/

const init = {
  admin: null,
  status: 'normal',
  signinType: 'account',
  rejectReasion: '',
  error: '',
  account: ''
};

// reducer
export function admin(state=init, action) {
  const { type, payload } = action;
  switch(type) {
    case SUCCESS:
      return { ...state, status: 'success', admin: payload };
    case AUDIT:
      return { ...state, status: 'audit', account: payload };
    case REJECT:
      return { ...state, status: 'reject', reason: payload };
    case ERROR:
      return { ...state, status: 'error', error: payload };
    case CHANGE_SIGNIN_TYPE:
      return { ...state, signinType: payload };
    case SIGNOUT:
      return { ...state, status: 'normal', admin: null };
    default:
      return state;
  }
}

export function getAdminInfo() {
  return dispatch => {
    getAdminInfoApi().then(res => {
      if (res.status === 1) {
        dispatch(success(res.data));
      } else if (res.status === 2) {
        dispatch(audit(res.account));
      } else if (res.status === 3) {
        dispatch(reject(res.reason));
      } else {
        dispatch(error(res.message));
      }
    });
  }
}

export function signupFunc(info) {
  return dispatch => {
    signupApi(info).then(res => {
      if (res.status === 1) {
        dispatch(audit(res.data.username));
      } else {
        dispatch(error(res.message));
      }
    });
  }
}

export function signinFunc(info) {
  return dispatch => {
    signinApi(info).then(res => {
      if (res.status === 1) {
        dispatch(success(res.data));
      } else if (res.status === 2) {
        dispatch(audit(res.account));
      } else if (res.status === 3) {
        dispatch(reject(res.reason));
      } else {
        dispatch(error(res.message));
      }
    });
  }
}

export function signoutFunc() {
  return dispatch => {
    signoutApi().then(res => {
      if (res.status === 1) {
        dispatch(signout());
      }
    });
  }
}

function success(data) {
  return { type: SUCCESS, payload: data };
}

function audit(account) {
  return { type: AUDIT, payload: account };
}

function reject(reason) {
  return { type: REJECT, payload: reason };
}

export function error(msg) {
  return { type: ERROR, payload: msg };
}

export function changeSigninType(type) {
  return { type: CHANGE_SIGNIN_TYPE, payload: type };
}

function signout() {
  return { type: SIGNOUT };
}