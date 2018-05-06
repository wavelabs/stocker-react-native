import { StackNavigator } from 'react-navigation';

import AddProductScreen from './AddProductScreen';
import InvoicesScreen from './screens/invoices';
import NewInvoiceScreen from './screens/new_invoice';

const AppNavigator = StackNavigator({
    Invoices:    { screen: InvoicesScreen },
    NewInvoice:  { screen: NewInvoiceScreen },
    AddProduct:  { screen: AddProductScreen }
}, {
    headerMode: 'none',
});

export default AppNavigator;
