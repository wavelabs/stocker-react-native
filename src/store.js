import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers';
import apiMiddleware from './middlewares/apiMiddleware';
import logMiddleware from './middlewares/logMiddleware';

const initialState = {}

const middleware = [logMiddleware, thunk, apiMiddleware]

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
