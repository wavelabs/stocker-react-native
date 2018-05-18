import {
  API_START,
  API_DONE,
  API_ERROR
} from './types';

export const apiStart  = ()      => ({type: API_START});
export const apiDone   = ()      => ({type: API_DONE});
export const apiError  = (error) => ({type: API_ERROR, payload: error});

