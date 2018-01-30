const SIGNOUT = 'SIGNOUT';

export function user(state=0, action) {
  switch(action.type) {
    case SIGNOUT:
      return
    default:
      return state;
  }
}

