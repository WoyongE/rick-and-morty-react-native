import React, { FC, useCallback } from 'react';
import { FlatList, FlatListProps, KeyboardAvoidingView, ListRenderItemInfo, Platform, StyleSheet, View } from 'react-native';
import appStore from '../../store/store';
import { view } from '@risingstack/react-easy-state';
import { Character, CharactersLayout } from '../../types';
import { numberOfGridColumns } from '../../constants';
import useColors from '../../colors';
import CharacterGridItem from './CharacterGridItem';
import CharacterListItem from './CharacterListItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import CharactersListSeparator from './CharactersListSeparator';

const itemHeight = 85;

interface Props extends Partial<FlatListProps<Character>> {
  characters: Character[];
}

type RenderInfo = ListRenderItemInfo<Character>;

const CharactersList: FC<Props> = ({ characters, ...props }) => {
  const colors = useColors();
  const isGridView = appStore.charactersLayout === CharactersLayout.GRID;
  const numColumns = isGridView ? numberOfGridColumns : 1;
  const numberOfFullRows = Math.floor(characters.length / numberOfGridColumns);
  const backgroundColor = isGridView ? 'none' : colors.secondaryBackground;
  const keyExtractor = useCallback((item: Character) => item.id.toString(), []);
  const renderListItem = useCallback((info: RenderInfo) => <CharacterListItem {...info} />, []);

  const renderGridItem = useCallback(
    (info: RenderInfo) => <CharacterGridItem numberOfFullRows={numberOfFullRows} {...info} />,
    [numberOfFullRows],
  );

  const renderItem = isGridView ? renderGridItem : renderListItem;
  const getItemLayout = useCallback((data: any, index: number) => ({ length: itemHeight, offset: itemHeight * index, index }), []);

  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <KeyboardAvoidingView
        behavior={Platform.select({
          ios: 'padding',
          android: undefined,
        })}>
        <FlatList
          {...props}
          data={characters}
          removeClippedSubviews
          numColumns={numColumns}
          renderItem={renderItem}
          style={styles.container}
          onEndReachedThreshold={0.7}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          key={appStore.charactersLayout}
          ItemSeparatorComponent={CharactersListSeparator}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={[styles.contentContainerStyle, { backgroundColor }]}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 400,
    paddingHorizontal: 20,
  },
  contentContainerStyle: {
    borderRadius: 10,
  },
});

export default view(CharactersList);
