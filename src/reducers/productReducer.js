import {
  FETCH_PRODUCTS,
  NEW_PRODUCT,
  CREATE_PRODUCT,
  CHANGE_PRODUCT_ATTRIBUTES
} from '../actions/types';

const initialState = {
  items: [],
  item: {
    price: 0
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
          price: 0
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
    case CREATE_PRODUCT:
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    default:
      return state;
  }
}
