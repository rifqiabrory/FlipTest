import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import Main from './src/Main';

/**
 * Main Application
 */
const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Provider store={store} >
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle={ isDarkMode ? "light-content" : "dark-content"} />
          <Main />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
