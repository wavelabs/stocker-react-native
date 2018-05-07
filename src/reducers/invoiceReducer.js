import {
  FETCH_INVOICES,
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
    case FETCH_INVOICES:
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
      return {
        ...state,
        item: {
          ...state.item,
          invoice_lines_attributes: [...state.item.invoice_lines_attributes, action.payload],
          total: state.item.total + action.payload.subtotal
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
