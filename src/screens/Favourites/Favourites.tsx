import React, { FC, useCallback, useLayoutEffect } from 'react';
import CharactersList from '../../components/CharactersList/CharactersList';
import appStore from '../../store/store';
import { view } from '@risingstack/react-easy-state';
import Icon from 'react-native-vector-icons/Ionicons';
import { iconSize } from '../../constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useColors from '../../colors';

type Props = NativeStackScreenProps<any>;

const Favourites: FC<Props> = ({ navigation }) => {
  const colors = useColors();
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
      headerLeft: () => <Icon onPress={goBack} name="md-close-outline" size={iconSize} color={colors.iconColor} />,
    });
  }, [navigation, goBack, colors.iconColor]);

  return <CharactersList characters={appStore.favCharacters} />;
};

export default view(Favourites);
