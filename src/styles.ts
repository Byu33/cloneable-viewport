import { StyleSheet, Animated } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    maxWidth: 1280,
    marginHorizontal: 'auto',
    padding: 32, // 2rem = 32px
    alignItems: 'center',
  },
  logo: {
    height: 96, // 6em = 96px
    padding: 24, // 1.5em = 24px
  },
  logoReact: {
    // Note: hover effects are not supported in React Native
    // This would need to be handled with onPress events and state changes
  },
  card: {
    padding: 32, // 2em = 32px
  },
  readTheDocs: {
    color: '#888',
  },
});

// Animation for logo spin
export const createLogoSpinAnimation = () => {
  const spinValue = new Animated.Value(0);
  
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 20000, // 20s
      useNativeDriver: true,
    })
  ).start();
  
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  return { transform: [{ rotate: spin }] };
};

// Note: Media queries are not directly supported in React Native
// For responsive design, use Dimensions API or a library like react-native-responsive-screen
// For example:
// import { Dimensions } from 'react-native';
// const { width } = Dimensions.get('window');
// const isSmallScreen = width < 600; 