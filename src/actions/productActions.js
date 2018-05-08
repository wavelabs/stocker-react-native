import {
  FETCH_PRODUCTS,
  CREATE_PRODUCT,
  NEW_PRODUCT,
  CHANGE_PRODUCT_ATTRIBUTES
} from './types';
import { objectToUriQuery } from '../utils';

export const fetchProducts = (filters = {}, callback = null) => dispatch => {
  fetch('http://192.168.1.2:3000/products?' + objectToUriQuery(filters))
    .then(res => res.json())
    .then(products => {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: products
      })
      if (callback) { callback(products) }
    });
}

export const changeProductAttributes = (attributes = {}) => dispatch => {
  dispatch({
    type: CHANGE_PRODUCT_ATTRIBUTES,
    payload: attributes
  });
}

export const createProduct = (productData) => dispatch => {
  fetch('http://192.168.1.2:3000/products', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(productData)
  })
  .then(res => res.json())
  .then(product => {
    dispatch({
      type: CREATE_PRODUCT,
      payload: product
    });
    dispatch({type: NEW_PRODUCT});
  });
}
