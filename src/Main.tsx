import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransactionDetail from './features/transaction-detail/TransactionDetail';
import TransactionList from './features/transaction-list/TransactionList';
import { SortModal } from './components';
import { StackParams } from './types';
import { Colors } from './utilities';

const Stack = createNativeStackNavigator<StackParams>();

const Main = () => {
  return (
    <Stack.Navigator initialRouteName='Transaction'>
      <Stack.Screen name="Transaction" component={TransactionList} options={{ headerShown: false }} />
      <Stack.Screen name="TransactionDetail" component={TransactionDetail} options={{ title: "Transaction Detail", headerTitleStyle: { color: Colors.black }, headerTintColor: Colors.grey}} />
      <Stack.Group>
        <Stack.Screen name="SortModal" component={SortModal} options={{
            headerShown: false,
            animation: 'fade',
            presentation: 'transparentModal',
        }} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Main;
