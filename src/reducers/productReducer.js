import {
  FETCH_PRODUCTS,
  NEW_PRODUCT,
  CREATE_PRODUCT,
  CHANGE_PRODUCT_ATTRIBUTES,
  UNABLE_CREATE_PRODUCT,
  PRODUCT_CREATED,
  FETCH_PRODUCT
} from '../actions/types';

const initialState = {
  items: [],
  item: {
    price: 0,
    stock: 0
  }
}

export default function (state = initialState, action) {
  switch(action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        items: action.payload
      }
    case NEW_PRODUCT:
      return {
        ...state,
        item: {
          ...initialState.item
        }
      }
    case CHANGE_PRODUCT_ATTRIBUTES:
      return {
        ...state,
        item: {
          ...state.item,
          ...action.payload
        }
      }
    case FETCH_PRODUCT:
      const product = state.items.find(product => product.barcode == action.payload.barcode)
      const index = state.items.indexOf(product);
      return {
        ...state,
        items: [
          ...state.items.slice(0, index),
          action.payload,
          ...state.items.slice(index + 1)
        ],
        item: action.payload
      }
    case PRODUCT_CREATED:
      return {
        ...state,
        items: [
          ...state.items,
          action.payload
        ],
        item: {
          ...initialState.item
        }
      }
    default:
      return state;
  }
}
