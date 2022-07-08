import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/app/store';
import Main from './src/Main';

const App = () => {
  return (
    <Provider store={store} >
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          <Main />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
