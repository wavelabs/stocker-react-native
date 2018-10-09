import {
  SET_CURRENT_USER,
  CLEAN_CURRENT_USER,
  API
} from './types';

export const authenticate = (email, password) => dispatch => (
  dispatch({
    type: API,
    url: '/api/v1/auth/sign_in.json',
    method: 'POST',
    body: JSON.stringify({ email, password }),
    success: SET_CURRENT_USER
  })
)

export const signUp = (userData) => dispatch => {
  dispatch({
    type: API,
    url: '/api/v1/auth.json',
    method: 'POST',
    body: JSON.stringify(userData),
    success: SET_CURRENT_USER
  })
}

export const signOut = () => dispatch => {
  dispatch({
    type: API,
    url: '/api/v1/auth/sign_out.json',
    method: 'DELETE',
    success: CLEAN_CURRENT_USER
  })
}