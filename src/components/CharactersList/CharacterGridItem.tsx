import React, { FC, useCallback } from 'react';
import { Image, ListRenderItemInfo, StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '../Text/Text';
import { Character } from '../../types';
import { numberOfGridColumns, screensNames } from '../../constants';
import ContextMenuWrapper from './ContextMenuWrapper';
import { navigate } from '../../RootNavigation';
import useColors from '../../colors';

interface Props extends Omit<ListRenderItemInfo<Character>, 'separators'> {
  numberOfFullRows: number;
}

const CharacterGridItem: FC<Props> = ({ item, index, numberOfFullRows }) => {
  const colors = useColors();
  const indexOffset = index + 1;
  const isLeftColumn = indexOffset % numberOfGridColumns === 0;
  const elementNotInFullRow = indexOffset > numberOfFullRows * numberOfGridColumns;
  const flex = elementNotInFullRow ? 1 / numberOfGridColumns : 1;
  const marginRight = isLeftColumn ? 0 : 15;

  const onPress = useCallback(() => {
    navigate(screensNames.characterDetails, {
      character: item,
    });
  }, [item]);

  return (
    <ContextMenuWrapper style={{ marginRight, flex }} character={item}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.container, { backgroundColor: colors.secondaryBackground }]}>
        <Image style={styles.image} source={{ uri: item.image }} />
        <View style={styles.contentContainer}>
          <Text numberOfLines={1}>{item.name}</Text>
          <Text style={styles.status} numberOfLines={1}>
            Status: {item.status}
          </Text>
          <Text style={styles.status} numberOfLines={1}>
            Species: {item.species}
          </Text>
          <Text style={styles.status} numberOfLines={1}>
            First Episode: {item.firstSeenEpisode.name}
          </Text>
          <Text style={styles.status} numberOfLines={1}>
            Origin Location: {item.origin.name}
          </Text>
        </View>
      </TouchableOpacity>
    </ContextMenuWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    height: 100,
    width: '100%',
  },
  contentContainer: {
    padding: 10,
  },
  status: {
    fontSize: 13,
    marginTop: 5,
    color: '#666',
  },
});

export default CharacterGridItem;
