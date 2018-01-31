const USER_INFO = 'USER_INFO';
const INIT = {};

// reducer
export function user(state=INIT, action) {
  const { type, payload } = action;

  switch(type) {
    case USER_INFO:
      return {...state, ...payload };
    default:
      return state;
  }
}

export function userInfo(userInfo) {
  return { type: USER_INFO, payload: userInfo };
}