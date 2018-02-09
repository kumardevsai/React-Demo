import { signinApi } from '@/service/api';

const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';

const init = {
  storeStatus: '',
  storeType: 'account',
  storeError: ''
};

// reducer
export function signin(state=init, action) {
  const { type, payload } = action;
  switch(type) {
    case SUCCESS:
      return { ...state, storeStatus: 'success', storeError: '' };
    case ERROR:
      return { ...state, storeStatus: 'error', storeError: payload };
    default:
      return state;
  }
}

export function signinFunc(info) {
  return dispatch => {
    signinApi(info).then(res => {
      if (res.status === 1) {
        dispatch(success());
      } else {
        dispatch(error(res.message));
      }
    });
  }
}

function success() {
  return { type: SUCCESS };
}

function error(msg) {
  return { type: ERROR, payload: msg };
}