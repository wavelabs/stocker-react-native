import {
  API
} from '../actions/types';

import {
  apiStart,
  apiDone,
  apiError
} from '../actions/uiActions';

const BASE_URL = 'https://app-stocker.herokuapp.com/';

const apiMiddleware = ({dispatch}) => next => action => {
  if (action.type != API) {
    return next(action);
  }

  const handleError = status => {
    dispatch(apiDone());
    if (status === 401) {
      return dispatch(apiError('Unauthorized'));
    }
    return dispatch(apiError(error));
  };

  const { payload } = action;
  const fetchOptions = {
    method:  action.method || 'GET',
    headers: { 'content-type': 'application/json' },
    body:    action.body ? action.body : null
  }

  dispatch(apiStart());
  fetch(BASE_URL + action.url, fetchOptions)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return Promise.reject(response.status)
      }
    })
    .then(response => {
      dispatch(apiDone());
      dispatch({type: payload.success, payload: response });
    })
    .catch(handleError)
}

export default  apiMiddleware;
