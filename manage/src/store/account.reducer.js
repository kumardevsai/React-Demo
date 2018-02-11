import { signupApi, signinApi } from '@/service/api';

const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';
const AUDIT = 'AUDIT';
const REJECT = 'REJECT';

/*
* status:
* normal  申请状态 --> 无
* sucess  申请成功状态
* audit   申请待审核状态
* reject  申请被拒状态
* error   申请错误状态
*/

const init = {
  status: 'normal',
  type: 'account',
  reason: '',
  error: '',
  account: ''
}

// reducer
export function account(state=init, action) {
  const { type, payload } = action;
  switch(type) {
    case SUCCESS:
      return { ...state, status: 'success', account: payload };
    case AUDIT:
      return { ...state, status: 'audit', account: payload };
    case REJECT:
      return { ...state, status: 'reject', reason: payload };
    case ERROR:
      return { ...state, status: 'error', error: payload };
    default:
      return state;
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
        dispatch(success(res.account));
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

function success(account) {
  return { type: SUCCESS, payload: account };
}

function audit(account) {
  return { type: AUDIT, payload: account };
}

function reject(reason) {
  return { type: REJECT, payload: reason };
}

function error(msg) {
  return { type: ERROR, payload: msg };
}