import { Dimensions } from 'react-native';

const numberOfGridColumns = 2;
const iconSize = 20;
const layoutAsyncStorageKey = 'rickmorty-layout';
const windowDimensions = Dimensions.get('window');
const deviceHeight = windowDimensions.height;
const favCharactersAsyncStorageKey = 'rickmorty-fav-characters';
const screensNames = {
  home: 'home',
  favourites: 'favourites',
  favouritesStack: 'favouritesStack',
  characterDetails: 'characterDetails',
};

export { numberOfGridColumns, layoutAsyncStorageKey, favCharactersAsyncStorageKey, iconSize, screensNames, deviceHeight };
