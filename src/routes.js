import { StackNavigator } from 'react-navigation';

import NewProductScreen from './screens/new_product';
import InvoicesScreen from './screens/invoices';
import NewInvoiceScreen from './screens/new_invoice';
import ProductsScreen from './screens/products';

const AppNavigator = StackNavigator({
    Invoices:    { screen: InvoicesScreen },
    Products:    { screen: ProductsScreen },
    NewInvoice:  { screen: NewInvoiceScreen },
    NewProduct:  { screen: NewProductScreen }
}, {
    headerMode: 'none',
});

export default AppNavigator;
