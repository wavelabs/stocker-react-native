import {
  API_START,
  API_DONE,
  API_ERROR
} from '../actions/types';

const initialState = {
  requests: 0,
  errors: null
}

const uiReducer = (state = initialState, action) => {
  switch(action.type) {
    case API_START:
      return {
        ...state,
        requests: state.requests + 1
      }
    case API_DONE:
      return {
        ...state,
        requests: state.requests - 1
      }
    case API_ERROR:
      return {
        ...state,
        errors: action.payload
      }
    default:
      return state;
  }
}

export default uiReducer;
