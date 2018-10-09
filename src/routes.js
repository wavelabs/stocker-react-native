import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';

import NewProductScreen from './screens/new_product';
import InvoicesScreen from './screens/invoices';
import NewInvoiceScreen from './screens/new_invoice';
import ProductsScreen from './screens/products';

import AuthScreen from './screens/Auth';

import SideBar from './components/SideBar';

const InvoiceNavigator = StackNavigator({
  ListInvoices:   { screen: InvoicesScreen },
  NewInvoice:     { screen: NewInvoiceScreen }
}, {
  headerMode: 'none'
});

const ProductNavigator = StackNavigator({
  ListProducts: { screen: ProductsScreen },
  NewProduct:   { screen: NewProductScreen }
}, {
  headerMode: 'none'
});

const MainNavigator = DrawerNavigator({
    Invoices:    { screen: InvoiceNavigator },
    Products:    { screen: ProductNavigator}
}, {
    headerMode: 'none',
    contentComponent: (props) => <SideBar {...props} />
});

const AppNavigator = StackNavigator({
  Auth: { screen: AuthScreen },
  Main: { screen: MainNavigator }
}, {
  headerMode: 'none'
})

export default AppNavigator;
