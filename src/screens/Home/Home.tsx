import React, { FC, useCallback, useLayoutEffect, useState } from 'react';
import appStore from '../../store/store';
import { view } from '@risingstack/react-easy-state';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderRight from './HeaderRight';
import CharactersList from '../../components/CharactersList/CharactersList';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

type Props = NativeStackScreenProps<any>;

const Home: FC<Props> = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const characters = appStore.isSearching ? appStore.characterSearchResults : appStore.characters;
  const activeFilters = appStore.selectedFilters;
  const filteredCharacters = activeFilters.length
    ? characters.filter(value => activeFilters.includes(value.status.toLowerCase()))
    : characters;

  const onFocus = useCallback(() => {
    appStore.isSearching = true;
  }, []);

  const onChangeText = useCallback((event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const text = event.nativeEvent.text;

    appStore.filterCharactersByName(text);
    setSearchText(text);
  }, []);

  const onEndReached = useCallback(() => {
    if (appStore.isSearching) {
      appStore.filterCharactersByName(searchText, true);
    } else {
      appStore.getCharacters();
    }
  }, [searchText]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight />,
      headerLargeTitle: true,
      title: 'All characters',
      headerSearchBarOptions: {
        onChangeText,
        onFocus: onFocus,
        hideWhenScrolling: false,
        onCancelButtonPress: appStore.resetSearchData,
      },
    });
  }, [navigation, onChangeText, onFocus]);

  return <CharactersList onEndReached={onEndReached} characters={filteredCharacters} />;
};

export default view(Home);
