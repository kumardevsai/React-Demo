import { getAdminInfoApi } from '@/service/api';

const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';

const init = {
  error: ''
};

// reducer
export function admin(state=init, action) {
  const { type, payload } = action;
  switch(type) {
    case SUCCESS:
      return {...state, ...payload };
    case ERROR:
      return {...state, error: payload };
    default:
      return state;
  }
}

export function getAdminInfo() {
  return dispatch => {
    getAdminInfoApi().then(res => {
      if (res.status === 1) {
        dispatch(success(res.data));
      } else {
        dispatch(error(res.message));
      }
    });
  }
}

function success(data) {
  return { type: SUCCESS, payload: data };
}

function error(msg) {
  return { type: ERROR, payload: msg };
}