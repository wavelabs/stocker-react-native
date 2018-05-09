import {combineReducers} from 'redux';

import invoiceReducer from './invoiceReducer';
import productReducer from './productReducer';
import screenReducer  from './screenReducer';

export default combineReducers({
  invoices: invoiceReducer,
  products: productReducer,
  screens:  screenReducer
})
