import { FETCH_PRODUCTS } from '../actions/types';

const initialState = {
  items: [],
  item: {}
}

export default function (state = initialState, action) {
  switch(action.type) {
    case FETCH_PRODUCTS:
      const concat = state.items.concat(action.payload);
      const items = concat.sort().filter((value,pos) => {return concat.indexOf(value) == pos})
      return {
        ...state,
        items: items
      }
    default:
      return state;
  }
}
