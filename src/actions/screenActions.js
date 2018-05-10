import {
  ADD_ERROR,
  DISPLAY_SUCCESS,
  CLEAN_FLASH
} from './types';

export const addError = (text) => dispatch => {
  dispatch({type: ADD_ERROR, payload: text});
}

export const clearErrors = () => dispatch => {
  dispatch({type: CLEAN_FLASH});
}

export const displaySuccess = (text) => dispatch => {
  dispatch({type: DISPLAY_SUCCESS, payload: text});
}
