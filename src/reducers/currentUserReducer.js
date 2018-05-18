import {
  SET_CURRENT_USER
} from '../actions/types';

const initialState = {}

const currentUserReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return action.payload
    default:
      return state;
  }
}

export default currentUserReducer;
