import React, { FC, useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '../Text/Text';
import { Character } from '../../types';
import { navigate } from '../../RootNavigation';
import { screensNames } from '../../constants';
import ContextMenuWrapper from './ContextMenuWrapper';

const imageSize = 50;

type Props = {
  item: Character;
};

const CharacterListItem: FC<Props> = ({ item }) => {
  const onPress = useCallback(() => {
    navigate(screensNames.characterDetails, {
      character: item,
    });
  }, [item]);

  return (
    <ContextMenuWrapper character={item}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.container}>
        <Image style={styles.image} source={{ uri: item.image }} />
        <View style={styles.contentContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.status}>Status: {item.status}</Text>
          <Text style={styles.status}>Species: {item.species}</Text>
          <Text numberOfLines={1} style={styles.episode}>
            First episode: {item.firstSeenEpisode.name}
          </Text>
          <Text numberOfLines={1} style={styles.originLocation}>
            Origin location: {item.origin.name}
          </Text>
        </View>
      </TouchableOpacity>
    </ContextMenuWrapper>
  );
};

const styles = StyleSheet.create({
  name: {
    marginBottom: 5,
  },
  status: {
    fontSize: 13,
    color: '#666',
    marginBottom: 5,
  },
  episode: {
    marginBottom: 5,
    fontSize: 13,
    color: '#666',
  },
  originLocation: {
    fontSize: 13,
    color: '#666',
  },
  container: {
    paddingLeft: 20,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    paddingRight: 20,
  },
  image: {
    marginRight: 20,
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  },
});

export default CharacterListItem;
