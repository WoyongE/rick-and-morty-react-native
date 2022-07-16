import React, { FC, ReactElement, useCallback } from 'react';
import { characterContextActions, handleActionPress } from '../../screens/Home/functions';
import appStore from '../../store/store';
import ContextMenu, { ContextMenuOnPressNativeEvent, ContextMenuProps } from 'react-native-context-menu-view';
import { Character } from '../../types';
import { view } from '@risingstack/react-easy-state';
import { NativeSyntheticEvent } from 'react-native';

interface Props extends ContextMenuProps {
  character: Character;
  children: ReactElement;
}

const ContextMenuWrapper: FC<Props> = ({ character, children, ...props }) => {
  const onPressContextMenuItem = useCallback(
    (event: NativeSyntheticEvent<ContextMenuOnPressNativeEvent>) => {
      handleActionPress(event, character);
    },
    [character],
  );

  return (
    <ContextMenu actions={characterContextActions(character, appStore.favCharacters)} onPress={onPressContextMenuItem} {...props}>
      {children}
    </ContextMenu>
  );
};

export default view(ContextMenuWrapper);
