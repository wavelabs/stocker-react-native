import {
  FETCH_PRODUCTS,
  CREATE_PRODUCT,
  NEW_PRODUCT,
  CHANGE_PRODUCT_ATTRIBUTES
} from './types';
import { objectToUriQuery } from '../utils';

import {
  productsUrl,
  createProductUrl
} from '../../config/api_routes'

export const fetchProducts = (filters = {}, callback = null) => dispatch => {
  fetch(`${productsUrl}?${objectToUriQuery(filters)}`)
    .then(res => res.json())
    .then(products => {
      console.log(products)
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
  const data = JSON.stringify({ product: {...productData, stock: 1} });
  console.log(data);
  fetch(createProductUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ product: productData })
  })
  .then(res => res.json())
  .then(product => {
    dispatch({
      type: CREATE_PRODUCT,
      payload: product
    });
    dispatch({type: NEW_PRODUCT});
  })
  .catch(error => {
    console.log('ERROR', error);
  });
}
