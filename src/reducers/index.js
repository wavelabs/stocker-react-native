import {combineReducers} from 'redux';

import invoiceReducer from './invoiceReducer';
import productReducer from './productReducer';

export default combineReducers({
  invoices: invoiceReducer,
  products: productReducer
})
