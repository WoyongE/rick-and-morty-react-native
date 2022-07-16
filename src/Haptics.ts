import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const lightImpact = () => {
  ReactNativeHapticFeedback.trigger('impactLight', options);
};

export default {
  lightImpact,
};
