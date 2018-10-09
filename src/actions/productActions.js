import {
  FETCH_PRODUCTS,
  PRODUCT_CREATED,
  NEW_PRODUCT,
  CHANGE_PRODUCT_ATTRIBUTES,
  ADD_ERROR,
  CLEAN_FLASH,
  DISPLAY_SUCCESS,
  FETCH_PRODUCT,
  API
} from './types';

import { objectToUriQuery } from '../utils';

export const fetchProducts = (filters = {}) => dispatch => {
  dispatch({
    type: API,
    url: `/api/v1/products?${objectToUriQuery(filters)}`,
    success: FETCH_PRODUCTS
  });
}

export const fetchProductByBarcode = (barcode) => dispatch => {
  dispatch({
    type: API,
    url: `/api/v1/products/${barcode}`,
    success: FETCH_PRODUCT
  })
}

export const changeProductAttributes = (attributes = {}) => dispatch => {
  dispatch({
    type: CHANGE_PRODUCT_ATTRIBUTES,
    payload: attributes
  });
}

export const createProduct = (productData) => dispatch => {
  dispatch({
    type: API,
    url: '/api/v1/products',
    method: 'POST',
    body: JSON.stringify({ product: productData }),
    success: PRODUCT_CREATED
  });
}
