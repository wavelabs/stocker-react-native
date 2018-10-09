import {combineReducers} from 'redux';

import invoiceReducer     from './invoiceReducer';
import productReducer     from './productReducer';
import uiReducer          from './uiReducer';
import currentUserReducer, * as fromCurrentUser from './currentUserReducer';

export default combineReducers({
  invoices:     invoiceReducer,
  products:     productReducer,
  ui:           uiReducer,
  currentUser:  currentUserReducer
});

export const isLoggedIn = (state) => fromCurrentUser.isLoggedIn(state.currentUser);