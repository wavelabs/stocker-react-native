import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';

import NewProductScreen from './screens/new_product';
import InvoicesScreen from './screens/invoices';
import NewInvoiceScreen from './screens/new_invoice';
import ProductsScreen from './screens/products';

import SideBar from './components/SideBar';

const invoiceNavigator = StackNavigator({
  ListInvoices:   { screen: InvoicesScreen },
  NewInvoice:     { screen: NewInvoiceScreen }
}, {
  headerMode: 'none'
});

const productNavigator = StackNavigator({
  ListProducts: { screen: ProductsScreen },
  NewProduct:   { screen: NewProductScreen }
}, {
  headerMode: 'none'
});

const AppNavigator = DrawerNavigator({
    Invoices:    { screen: invoiceNavigator },
    Products:    { screen: productNavigator}
}, {
    headerMode: 'none',
    contentComponent: (props) => <SideBar {...props} />
});

export default AppNavigator;
