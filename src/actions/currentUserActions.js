import {
  SET_CURRENT_USER
} from './types';

export const authenticate = (email, password) => {
  dispatch({
    type: API,
    url: '/api/v1/sign_in',
    method: 'POST'
  })
}
