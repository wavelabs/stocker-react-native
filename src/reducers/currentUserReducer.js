import {
  SET_CURRENT_USER, 
  SET_AUTH_TOKENS,
  CLEAN_CURRENT_USER
} from '../actions/types';

const initialState = {}

const currentUserReducer = (state = {}, action) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        ...action.payload.data
      }
    case SET_AUTH_TOKENS:
      return {
        ...state,
        accessToken: action.payload.get('access-token'),
        accessType:  action.payload.get('token-type'),
        client:      action.payload.get('client')
      }
    case CLEAN_CURRENT_USER:
      return initialState;
    default:
      return state;
  }
}

export const isLoggedIn = state => ['accessToken', 'client', 'uid'].reduce(
  (current, next) => current && state.hasOwnProperty(next), 
  true
)

export default currentUserReducer;
