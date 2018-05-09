import {
  OPEN_DRAWER,
  CLOSE_DRAWER
} from '../actions/types';

const initialState = {
  drawerOpen: false
}

export default function (state = initialState, action) {
  switch(action.type) {
    case OPEN_DRAWER:
      return {
        ...state,
        drawerOpen: true
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        drawerOpen: false
      };
    default:
      return state;
  }
}
