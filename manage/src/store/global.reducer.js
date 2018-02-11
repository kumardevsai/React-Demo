const CHANGE_LAYOUT_COLLAPSED = 'CHANGE_LAYOUT_COLLAPSED';
const init = {
  collapsed: true
}

// reducer
export function global(state=init, action) {
  const { type, payload } = action;
  switch(type) {
    case CHANGE_LAYOUT_COLLAPSED:
      return { ...state, collapsed: payload };
    default:
      return state;
  }
}

export function changeLayoutCollapsed(collapsed) {
  return { type: CHANGE_LAYOUT_COLLAPSED, payload: collapsed }
}