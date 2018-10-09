import {
  API, 
  SET_AUTH_TOKENS
} from '../actions/types';

import {
  apiStart,
  apiDone,
  apiError
} from '../actions/uiActions';

const BASE_URL = 'https://app-stocker.herokuapp.com';

const apiMiddleware = ({dispatch, getState}) => next => action => {
  if (action.type != API) {
    return next(action);
  }

  const handleError = response => {
    dispatch(apiDone());
    if (response.status === 401) {
      console.log(response)
      return dispatch(apiError('Sin Autorización'));
    }
    return dispatch(apiError('Not found'));
  };

  const { payload } = action;
  const { currentUser } = getState();
  const fetchOptions = {
    method:  action.method || 'GET',
    headers: { 
      'content-type': 'application/json',
      'access-token': currentUser.accessToken,
      'uid':          currentUser.uid,
      'client':       currentUser.client
    },
    body:    action.body ? action.body : null
  }

  dispatch(apiStart());
  return fetch(BASE_URL + action.url, fetchOptions)
    .then(response => {
      if (response.headers.has('access-token') && response.headers.has('token-type') && response.headers.has('client')) {
        dispatch({type: SET_AUTH_TOKENS, payload: response.headers})
      }

      if (response.ok) {
        return response.json()
      } else {
        return Promise.reject(response)
      }
    })
    .then(response => {
      dispatch(apiDone());
      dispatch({type: action.success, payload: response });
    })
    .catch(handleError)
}

export default  apiMiddleware;
