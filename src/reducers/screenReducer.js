import {
  DISPLAY_SUCCESS,
  ADD_ERROR,
  CLEAN_FLASH
} from '../actions/types';

const initialState = {
  info: null,
  errors: []
}

export default function (state = initialState, action) {
  switch(action.type) {
    case DISPLAY_SUCCESS:
      return {
        ...state,
        info: action.payload
      };
    case ADD_ERROR:
      return {
        ...state,
        errors: [
          ...state.errors,
          action.payload
        ]
      };
    case CLEAN_FLASH:
      return {
        ...state,
        ...initialState
      }
    default:
      return state;
  }
}
