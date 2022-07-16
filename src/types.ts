import { NativeSyntheticEvent } from 'react-native';
import { ContextMenuOnPressNativeEvent } from 'react-native-context-menu-view';

interface BaseCharacter {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  origin: Origin;
  location: Location;
  gender: string;
  episode: string[];
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev?: any;
}

export interface Origin {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface Result extends BaseCharacter {
  episode: string[];
}

export interface Episode {
  id: number;
  name: string;
  episode: string;
  url: string;
}

export interface Character extends BaseCharacter {
  firstSeenEpisode: Episode;
  lastSeenEpisode: Episode;
}

export enum CharactersLayout {
  LIST = 'list',
  GRID = 'grid',
}

export type AppStore = {
  nextPage?: number;
  searchNextPage?: number;
  loadingCharacters: boolean;
  loadingSearchResults: boolean;
  characters: Character[];
  favCharacters: Character[];
  characterSearchResults: Character[];
  isSearching: boolean;
  resetSearchData: () => void;
  filterCharactersByName: (text: string, isLoadMore?: boolean) => void;
  toggleCharacterInFavourites: (character: Character) => void;
  getCharacters: () => void;
  setInitialCharactersLayout: () => void;
  loadFavouriteCharacters: () => void;
  charactersLayout: CharactersLayout;
  toggleCharactersLayout: () => void;
  selectedFilters: string[];
  setSelectedFilters: (event: NativeSyntheticEvent<ContextMenuOnPressNativeEvent>) => void;
};
