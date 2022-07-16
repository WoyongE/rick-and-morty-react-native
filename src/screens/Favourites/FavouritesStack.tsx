import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screensNames } from '../../constants';
import CharacterDetails from '../CharacterDetails/CharacterDetails';
import Favourites from './Favourites';

const Stack = createNativeStackNavigator();

const FavouritesStack: FC = () => (
  <Stack.Navigator>
    <Stack.Screen options={{ title: 'Favourites' }} name={screensNames.favourites} component={Favourites} />
    <Stack.Screen name={screensNames.characterDetails} component={CharacterDetails} />
  </Stack.Navigator>
);

export default FavouritesStack;
