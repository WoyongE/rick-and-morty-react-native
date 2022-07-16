import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../../../components/Text/Text';

type Props = {
  title: string;
  description: string;
};

const CharacterInfoBlock: FC<Props> = ({ title, description }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default CharacterInfoBlock;
