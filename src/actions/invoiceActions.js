import {
  FETCH_INVOICES,
  CREATE_INVOICE,
  ADD_INVOICE_LINE_ITEM,
  REMOVE_INVOICE_LINE_ITEM
} from './types';
import { objectToUriQuery } from '../utils';

export const fetchInvoices = () => dispatch => {
  fetch('http://192.168.1.2:3000/invoices')
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
  fetch('http://192.168.1.2:3000/invoices', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(invoiceData)
  })
  .then(res => res.json())
  .then(invoice =>
    dispatch({
      type: CREATE_INVOICE,
      payload: invoice
    })
  );
}
