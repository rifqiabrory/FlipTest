import 'react-native-gesture-handler';
import { AppRegistry, LogBox } from 'react-native';
import { name as appName } from './app.json';
import App from './App';

AppRegistry.registerComponent(appName, () => App);
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);
  
