import { useColorScheme } from 'react-native';

type Colors = {
  secondaryBackground: string;
  borderColor: string;
  iconColor: string;
};

const useColors = (): Colors => {
  const scheme = useColorScheme() || 'dark';
  const colors: Record<'light' | 'dark', Colors> = {
    dark: {
      secondaryBackground: '#1c1c1e',
      borderColor: '#3d3d3d',
      iconColor: 'white',
    },
    light: {
      secondaryBackground: '#ddd',
      borderColor: '#cccccc',
      iconColor: 'black',
    },
  };

  return colors[scheme];
};

export default useColors;
