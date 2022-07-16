import React, { FC } from 'react';
import { Image, TouchableOpacity } from 'react-native';

type Props = {
  icon: string;
  size?: number;
  color?: string;
  onPress?: () => void;
};

const Icon: FC<Props> = ({ icon, size = 20, color = 'white', onPress = undefined }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <Image source={{ uri: icon }} style={{ height: size, width: size, tintColor: color }} />
  </TouchableOpacity>
);

export default Icon;
