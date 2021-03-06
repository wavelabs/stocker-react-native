import {
  SET_INVOICES,
  CREATE_INVOICE,
  NEW_INVOICE,
  ADD_INVOICE_LINE_ITEM,
  REMOVE_INVOICE_LINE_ITEM
} from '../actions/types';

const initialState = {
  items: [],
  item: {
    created_at: Date.today,
    total: 0,
    invoice_lines_attributes: []
  }
}

export default function (state = initialState, action) {
  switch(action.type) {
    case SET_INVOICES:
      return {
        ...state,
        items: action.payload
      }
    case NEW_INVOICE:
      return {
        ...state,
        item: {
          created_at: Date.today,
          total: 0,
          invoice_lines_attributes: []
        }
      }
    case ADD_INVOICE_LINE_ITEM:
      const { name, id, price } = action.payload.product;
      const subtotal = action.payload.quantity * price;
      const invoiceLine = {
        quantity: action.payload.quantity.toString(),
        name: name,
        product_id: id.toString(),
        price: price.toString(),
        subtotal: subtotal.toString()
      };

      return {
        ...state,
        item: {
          ...state.item,
          invoice_lines_attributes: [...state.item.invoice_lines_attributes, invoiceLine],
          total: state.item.total + subtotal
        }
      }
    case REMOVE_INVOICE_LINE_ITEM:
      return {
        ...state,
        item: {
          ...state.item,
          invoice_lines_attributes: action.payload.invoice_lines_attributes,
          total: action.payload.total
        }
      }
    case CREATE_INVOICE:
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    default:
      return state;
  }
}
