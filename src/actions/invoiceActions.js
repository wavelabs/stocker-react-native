import {
  FETCH_INVOICES,
  CREATE_INVOICE,
  ADD_INVOICE_LINE_ITEM,
  REMOVE_INVOICE_LINE_ITEM,
  CLEAN_FLASH,
  NEW_INVOICE,
  DISPLAY_SUCCESS,
  ADD_ERROR,
  FETCH_PRODUCT
} from './types';
import { objectToUriQuery } from '../utils';

import {
  invoicesUrl,
  createInvoiceUrl,
  productsUrl
} from '../../config/api_routes'

import {
  fetchProductByBarcode
} from './productActions';

export const fetchInvoices = () => dispatch => {
  fetch(invoicesUrl)
    .then(res => res.json())
    .then(invoices =>
      dispatch({
        type: FETCH_INVOICES,
        payload: invoices
      })
    );
}

export const addLineItem = (barcode, quantity) => (dispatch, getState) => {
  const products = getState().products.items;
  const storedProduct = products.find( product => (product.barcode == barcode));

  if (storedProduct) {
    dispatch({type: FETCH_PRODUCT, payload: storedProduct});
    dispatch({
      type: ADD_INVOICE_LINE_ITEM,
      payload: { quantity: quantity, product: storedProduct }
    });
  } else {
    dispatch(fetchProductByBarcode(barcode))
    .then(() => {
      dispatch({
        type: ADD_INVOICE_LINE_ITEM,
        payload: { quantity, product: getState().products.item }
      })
    } );
  }
}

export const removeLineItem = (lineItems, deletedItems = []) => (dispatch, getState) => {
  const { item } = getState().invoices;

  dispatch({
    type: REMOVE_INVOICE_LINE_ITEM,
    payload: {
      invoice_lines_attributes: lineItems,
      total: item.total - deletedItems.reduce((sum, item) => (sum + item.subtotal), 0)
    }
  })
}

export const createInvoice = (invoiceData) => dispatch => {
  dispatch({type: CLEAN_FLASH});
  fetch(createInvoiceUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({invoice: invoiceData})
  })
  .then(res => res.ok ? res.json() : Promise.reject())
  .then(invoice => {
    dispatch({
      type: DISPLAY_SUCCESS,
      payload: 'Venta guardada correctamente'
    });
    dispatch({
      type: CREATE_INVOICE,
      payload: invoice
    });
    dispatch({type: NEW_INVOICE});
  })
  .catch(error => {
    dispatch({
      type: ADD_ERROR,
      payload: 'No se pudo crear la Venta'
    });
  });
}
