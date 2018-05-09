import {
  FETCH_INVOICES,
  CREATE_INVOICE,
  ADD_INVOICE_LINE_ITEM,
  REMOVE_INVOICE_LINE_ITEM
} from './types';
import { objectToUriQuery } from '../utils';

import {
  invoicesUrl,
  createInvoiceUrl
} from '../../config/api_routes'

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

export const addLineItem = (product, quantity) => dispatch => {
  const {name, id, price} = product;
  const subtotal = quantity * price;

  dispatch({
    type: ADD_INVOICE_LINE_ITEM,
    payload: {
      quantity:   quantity,
      name:       name,
      product_id: id,
      price:      price,
      subtotal:   subtotal
    }
  });
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
  fetch(createInvoiceUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({invoice: invoiceData})
  })
  .then(res => res.json())
  .then(invoice =>
    dispatch({
      type: CREATE_INVOICE,
      payload: invoice
    })
  );
}
