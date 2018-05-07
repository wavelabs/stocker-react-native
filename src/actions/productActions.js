import { FETCH_PRODUCTS } from './types';
import { objectToUriQuery } from '../utils';


export const fetchProducts = (filters = {}, callback) => dispatch => {
  fetch('http://192.168.0.11:3000/products?' + objectToUriQuery(filters))
    .then(res => res.json())
    .then(products => {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: products
      })
      callback(products)
    });
}
