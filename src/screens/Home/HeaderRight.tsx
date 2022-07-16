import React, { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { iconSize, screensNames } from '../../constants';
import appStore from '../../store/store';
import { CharactersLayout } from '../../types';
import { view } from '@risingstack/react-easy-state';
import { navigate } from '../../RootNavigation';
import ContextMenu from 'react-native-context-menu-view';
import { getFilterMenuActions } from './functions';
import useColors from '../../colors';

const FilterButton: FC = view(() => {
  const colors = useColors();

  return (
    <ContextMenu
      title="Filter by"
      onPress={appStore.setSelectedFilters}
      dropdownMenuMode
      actions={getFilterMenuActions(appStore.selectedFilters)}>
      <Icon color={colors.iconColor} style={styles.icon} size={iconSize} name="ios-filter" />
    </ContextMenu>
  );
});

const HeaderRight: FC = () => {
  const colors = useColors();
  const isGridView = appStore.charactersLayout === CharactersLayout.GRID;
  const layoutIconName = isGridView ? 'list' : 'grid';
  const showFavouritesScreen = useCallback(() => {
    navigate(screensNames.favouritesStack, {
      screen: screensNames.favourites,
    });
  }, []);

  return (
    <View style={styles.container}>
      <FilterButton />
      <Icon onPress={appStore.toggleCharactersLayout} color={colors.iconColor} style={styles.icon} size={iconSize} name={layoutIconName} />
      <Icon onPress={showFavouritesScreen} color={colors.iconColor} size={20} name="heart" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 200,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
});

export default view(HeaderRight);
