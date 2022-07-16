import { store } from '@risingstack/react-easy-state';
import { AppStore, Character, CharactersLayout, Episode, Result } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { favCharactersAsyncStorageKey, layoutAsyncStorageKey } from '../constants';
import { NativeSyntheticEvent } from 'react-native';
import { ContextMenuOnPressNativeEvent } from 'react-native-context-menu-view';
import Haptics from '../Haptics';

const apiBaseUrl = 'https://rickandmortyapi.com/api';

const transformCharacters = async (results: Result[]) => {
  const characters: Character[] = [];

  for (const result of results) {
    const totalEpisodes = result.episode.length;
    const firstEpisodeUrl = result.episode[0];
    const lastEpisodeUrl = result.episode[totalEpisodes - 1];
    const responses = await Promise.all([fetch(firstEpisodeUrl), fetch(lastEpisodeUrl)]);
    const responsesAsJSON: Episode[] = await Promise.all(responses.map(value => value.json()));
    const [firstSeenEpisode, lastSeenEpisode] = responsesAsJSON;
    const character = {
      name: result.name,
      firstSeenEpisode: {
        id: firstSeenEpisode.id,
        episode: firstSeenEpisode.episode,
        url: firstSeenEpisode.url,
        name: firstSeenEpisode.name,
      },
      image: result.image,
      status: result.status,
      lastSeenEpisode: {
        id: lastSeenEpisode.id,
        episode: lastSeenEpisode.episode,
        url: lastSeenEpisode.url,
        name: lastSeenEpisode.name,
      },
      origin: result.origin,
      species: result.species,
      location: result.location,
      id: result.id,
      gender: result.gender,
      episode: result.episode,
    };

    characters.push(character);
  }

  return characters;
};

const resetSearchData = () => {
  appStore.isSearching = false;
  appStore.loadingSearchResults = false;
  appStore.searchNextPage = 1;
  appStore.characterSearchResults = [];
};

const setInitialCharactersLayout = async () => {
  const savedLayout = await AsyncStorage.getItem(layoutAsyncStorageKey);

  if (savedLayout) {
    appStore.charactersLayout = savedLayout as CharactersLayout;
  }
};

const toggleCharactersLayout = async () => {
  const isGrid = appStore.charactersLayout === CharactersLayout.GRID;
  const newLayout = isGrid ? CharactersLayout.LIST : CharactersLayout.GRID;

  appStore.charactersLayout = newLayout;

  try {
    await AsyncStorage.setItem(layoutAsyncStorageKey, newLayout);
  } catch (e) {
    console.log(e);
  }
};

const filterCharactersByName = async (name: string, isLoadMore?: boolean) => {
  try {
    if (isLoadMore && (!appStore.searchNextPage || appStore.loadingSearchResults)) {
      return;
    }

    appStore.loadingSearchResults = true;

    if (!isLoadMore) {
      appStore.searchNextPage = 1;
      appStore.characterSearchResults = [];
    }

    const url = `${apiBaseUrl}/character/?name=${name}&page=${appStore.searchNextPage || 0}`;
    const response = await fetch(url);
    const responseAsJSON = await response.json();

    if (responseAsJSON.results) {
      const hasNextPage = !!responseAsJSON.info.next;
      const newCharacters = await transformCharacters(responseAsJSON.results);

      if (isLoadMore) {
        appStore.characterSearchResults = appStore.characterSearchResults.concat(newCharacters);
      } else {
        appStore.characterSearchResults = newCharacters;
      }

      appStore.searchNextPage = hasNextPage ? (appStore.searchNextPage || 0) + 1 : undefined;
    } else {
      appStore.characterSearchResults = [];
    }

    appStore.loadingSearchResults = false;
  } catch (e) {
    console.log(e);
  }
};

const getCharacters = async () => {
  if (!appStore.nextPage || appStore.loadingCharacters) {
    return;
  }

  appStore.loadingCharacters = true;

  try {
    const url = `${apiBaseUrl}/character?page=${appStore.nextPage}`;
    const response = await fetch(url);
    const responseAsJSON = await response.json();
    const newCharacters = await transformCharacters(responseAsJSON.results);
    const hasNextPage = !!responseAsJSON.info.next;

    appStore.characters = appStore.characters.concat(newCharacters);
    appStore.nextPage = hasNextPage ? appStore.nextPage + 1 : undefined;
    appStore.loadingCharacters = false;
  } catch (e) {
    console.log(e);
  }
};

const toggleCharacterInFavourites = async (character: Character) => {
  const characterIsFavourite = appStore.favCharacters.find(value => value.id === character.id);

  if (characterIsFavourite) {
    appStore.favCharacters = appStore.favCharacters.filter(value => value.id !== character.id);
  } else {
    appStore.favCharacters = [character, ...appStore.favCharacters];
  }

  Haptics.lightImpact();

  try {
    const favCharactersIds = appStore.favCharacters.map(value => value.id);
    const favCharactersIdsAsStringArray = JSON.stringify(favCharactersIds);

    await AsyncStorage.setItem(favCharactersAsyncStorageKey, favCharactersIdsAsStringArray);
  } catch (e) {
    console.log(e);
  }
};

const setSelectedFilters = (event: NativeSyntheticEvent<ContextMenuOnPressNativeEvent>) => {
  const eventAsLowercase = event.nativeEvent.name.toLowerCase();
  const filterIsSelected = appStore.selectedFilters.includes(eventAsLowercase);

  if (filterIsSelected) {
    appStore.selectedFilters = appStore.selectedFilters.filter(value => value !== eventAsLowercase);
  } else {
    appStore.selectedFilters = [eventAsLowercase, ...appStore.selectedFilters];
  }
};

const loadFavouriteCharacters = async () => {
  try {
    const savedFavCharacters = await AsyncStorage.getItem(favCharactersAsyncStorageKey);

    if (savedFavCharacters) {
      const parsedFavCharacterIds: number[] = JSON.parse(savedFavCharacters);
      const splitFavCharacterIds = parsedFavCharacterIds.join(',');
      const url = `${apiBaseUrl}/character/${splitFavCharacterIds}`;
      const response = await fetch(url);
      const responseAsJSON = await response.json();
      const isMultipleCharacters = Array.isArray(responseAsJSON);
      const results: Result[] = isMultipleCharacters ? responseAsJSON : [responseAsJSON];
      const sortedResults = results.sort((a, b) => parsedFavCharacterIds.indexOf(a.id) - parsedFavCharacterIds.indexOf(b.id));

      appStore.favCharacters = await transformCharacters(sortedResults);
    }
  } catch (e) {
    console.log(e);
  }
};

const appStore: AppStore = store({
  characters: [],
  nextPage: 1,
  searchNextPage: 1,
  favCharacters: [],
  isSearching: false,
  selectedFilters: [],
  loadingCharacters: false,
  characterSearchResults: [],
  loadingSearchResults: false,
  charactersLayout: CharactersLayout.LIST,
  getCharacters: getCharacters,
  resetSearchData: resetSearchData,
  setSelectedFilters: setSelectedFilters,
  filterCharactersByName: filterCharactersByName,
  toggleCharactersLayout: toggleCharactersLayout,
  loadFavouriteCharacters: loadFavouriteCharacters,
  setInitialCharactersLayout: setInitialCharactersLayout,
  toggleCharacterInFavourites: toggleCharacterInFavourites,
});

export default appStore;
