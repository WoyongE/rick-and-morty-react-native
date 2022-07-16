import React, { FC } from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home/Home';
import { useColorScheme } from 'react-native';
import { navigationRef } from './src/RootNavigation';
import CharacterDetails from './src/screens/CharacterDetails/CharacterDetails';
import { screensNames } from './src/constants';
import FavouritesStack from './src/screens/Favourites/FavouritesStack';

const Stack = createNativeStackNavigator();

const App: FC = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';
  const theme = isDarkMode ? DarkTheme : DefaultTheme;

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} theme={theme}>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen name={screensNames.home} component={Home} />
            <Stack.Screen name={screensNames.characterDetails} component={CharacterDetails} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
            <Stack.Screen name={screensNames.favouritesStack} component={FavouritesStack} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
