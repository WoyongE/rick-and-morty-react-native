import React, { FC, useCallback, useLayoutEffect } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Character } from '../../types';
import Icon from 'react-native-vector-icons/Ionicons';
import appStore from '../../store/store';
import { view } from '@risingstack/react-easy-state';
import { deviceHeight } from '../../constants';
import Text from '../../components/Text/Text';
import CharacterInfoBlock from './CharacterInfoBlock/CharacterInfoBlock';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<any>;

const CharacterDetails: FC<Props> = ({ navigation, route }) => {
  const character = route.params!.character as Character;
  const characterIsFavourite = appStore.favCharacters.find(value => value.id === character.id);
  const favIcon = characterIsFavourite ? 'heart' : 'heart-outline';
  const onPressFavIcon = useCallback(() => {
    appStore.toggleCharacterInFavourites(character);
  }, [character]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Icon onPress={onPressFavIcon} size={20} color="white" name={favIcon} />,
      title: character.name,
    });
  }, [character, favIcon, navigation, onPressFavIcon]);

  return (
    <SafeAreaView edges={['right', 'left']}>
      <ScrollView>
        <Image style={styles.image} source={{ uri: character.image }} />
        <View style={styles.contentContainer}>
          <Text style={styles.name}>{character.name}</Text>
          <CharacterInfoBlock title="Status" description={character.status} />
          <CharacterInfoBlock title="Species" description={character.species} />
          <CharacterInfoBlock title="Gender" description={character.gender} />
          <CharacterInfoBlock title="Origin location" description={character.origin.name} />
          <CharacterInfoBlock title="Last known location" description={character.location.name} />
          <CharacterInfoBlock title="Total episodes" description={character.episode.length.toString()} />
          <CharacterInfoBlock title="First seen episode" description={character.firstSeenEpisode.name} />
          <CharacterInfoBlock title="Last seen episode" description={character.lastSeenEpisode.name} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    height: deviceHeight * 0.4,
    maxHeight: 400,
    width: '100%',
  },
  contentContainer: {
    padding: 20,
  },
  name: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default view(CharacterDetails);
