import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransactionDetail from './features/transaction-detail/TransactionDetail';
import TransactionList from './features/transaction-list/TransactionList';
import { FilterModal } from './components';
import type { StackParams } from './types';
import { Colors } from './utilities';

/**
 * Create Stack's Navigator
 */
const Stack = createNativeStackNavigator<StackParams>();

/**
 * Main Application
 */
const Main = () => {
  return (
    <Stack.Navigator initialRouteName='Transaction'>
      <Stack.Screen name="Transaction" component={TransactionList} options={{ headerShown: false }} />
      <Stack.Screen name="TransactionDetail" component={TransactionDetail} options={{
        title: "Transaction Detail",
        headerTintColor: Colors.grey,
        headerTitleStyle: {
          color: Colors.black
        },
      }} />
      <Stack.Group>
        <Stack.Screen name="FilterModal" component={FilterModal} options={{
          headerShown: false,
          animation: 'fade',
          presentation: 'transparentModal',
        }} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Main;
