import {
  FETCH_PRODUCTS,
  CREATE_PRODUCT,
  PRODUCT_CREATED,
  NEW_PRODUCT,
  CHANGE_PRODUCT_ATTRIBUTES,
  ADD_ERROR,
  CLEAN_FLASH,
  DISPLAY_SUCCESS,
  FETCH_PRODUCT
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
      dispatch({
        type: FETCH_PRODUCTS,
        payload: products
      })
      if (callback) { callback(products) }
    });
}

export const fetchProductByBarcode = (barcode, callback = null) => dispatch => {
  fetch(`${productsUrl}/${barcode}`)
    .then(res => res.json())
    .then(product => {
      dispatch({
        type: FETCH_PRODUCT,
        payload: product
      });
      if (callback) { callback(product) }
    })
}

export const changeProductAttributes = (attributes = {}) => dispatch => {
  dispatch({
    type: CHANGE_PRODUCT_ATTRIBUTES,
    payload: attributes
  });
}

export const createProduct = (productData) => (dispatch, getState) => {
  dispatch({type: CLEAN_FLASH});
  fetch(createProductUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ product: productData })
  })
  .then(res => res.ok ? res.json() : Promise.reject())
  .then(product => {
    dispatch({
      type: DISPLAY_SUCCESS,
      payload: 'Producto guardado correctamente'
    })
    dispatch({
      type: PRODUCT_CREATED,
      payload: product
    });
    dispatch({type: NEW_PRODUCT});
  })
  .catch(error => {
    dispatch({
      type: ADD_ERROR,
      payload: 'No se pudo crear el Producto'
    });
  });
}
