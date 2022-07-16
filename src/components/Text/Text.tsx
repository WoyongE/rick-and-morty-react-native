import React, { FC } from 'react';
import { StyleSheet, Text as ReactNativeText, TextProps, useColorScheme } from 'react-native';

interface Props extends TextProps {
  children: string | string[];
}

const Text: FC<Props> = ({ children, ...props }) => {
  const scheme = useColorScheme();
  const color = scheme === 'dark' ? 'white' : 'black';

  return (
    <ReactNativeText {...props} style={[styles.text, { color }, props.style]}>
      {children}
    </ReactNativeText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
});

export default Text;
