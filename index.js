import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import appStore from './src/store/store';

appStore.setInitialCharactersLayout();
appStore.loadFavouriteCharacters();
appStore.getCharacters();

AppRegistry.registerComponent(appName, () => App);
