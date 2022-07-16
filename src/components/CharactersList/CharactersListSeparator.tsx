import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import useColors from '../../colors';
import appStore from '../../store/store';
import { CharactersLayout } from '../../types';
import { view } from '@risingstack/react-easy-state';

const CharactersListSeparator: FC = () => {
  const colors = useColors();
  const isGridView = appStore.charactersLayout === CharactersLayout.GRID;

  if (isGridView) {
    return null;
  }

  return <View style={[styles.itemSeparator, { borderColor: colors.borderColor }]} />;
};

const styles = StyleSheet.create({
  itemSeparator: {
    borderWidth: 0.4,
    borderStyle: 'solid',
  },
});

export default view(CharactersListSeparator);
