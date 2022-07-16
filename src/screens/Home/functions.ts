import { ContextMenuAction, ContextMenuOnPressNativeEvent } from 'react-native-context-menu-view';
import { AppStore, Character } from '../../types';
import appStore from '../../store/store';
import { NativeSyntheticEvent } from 'react-native';
import { navigate } from '../../RootNavigation';
import { screensNames } from '../../constants';

const characterContextActions = (character: Character, favCharacters: Character[]): ContextMenuAction[] => {
  const characterIsFavourite = favCharacters.find(value => value.id === character.id);
  const favIcon = characterIsFavourite ? 'heart.fill' : 'heart';
  const favTitle = characterIsFavourite ? 'Remove from favourites' : 'Add to favourites';

  return [
    { systemIcon: favIcon, title: favTitle },
    { systemIcon: 'person.fill', title: 'More details' },
  ];
};

const handleActionPress = (event: NativeSyntheticEvent<ContextMenuOnPressNativeEvent>, character: Character) => {
  switch (event.nativeEvent.index) {
    case 0: {
      appStore.toggleCharacterInFavourites(character);
      break;
    }
    case 1: {
      navigate(screensNames.characterDetails, {
        character,
      });
    }
  }
};

const getFilterMenuActions = (selectedFilters: AppStore['selectedFilters']): ContextMenuAction[] => {
  const selectedFilterIcon = 'checkmark';

  const defaultActions: Omit<ContextMenuAction, 'systemIcon'>[] = [
    {
      title: 'Alive',
    },
    {
      title: 'Unknown',
    },
    {
      title: 'Dead',
    },
  ];

  return defaultActions.map(value => ({
    ...value,
    systemIcon: selectedFilters.includes(value.title.toLowerCase()) ? selectedFilterIcon : '',
  }));
};

export { characterContextActions, handleActionPress, getFilterMenuActions };
