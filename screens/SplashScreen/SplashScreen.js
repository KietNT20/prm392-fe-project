import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { Animated, View, Text } from 'react-native';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity: 0
  const navigation = useNavigation();

  useEffect(() => {
    // Start the animation
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade to opacity 1
      duration: 2000, // Animation duration
      useNativeDriver: true,
    }).start(() => {
      // Navigate to the next screen once animation completes
      setTimeout(() => {
        navigation.navigate('Login'); // Replace 'Login' with your target screen
      }, 1000); // Delay to hold the splash screen
    });
  }, [fadeAnim, navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-indigo-500">
      <Animated.View
        style={{ opacity: fadeAnim }}
        className="justify-center items-center"
      >
        <Ionicons name="paw-outline" size={80} color="white" />
        <Text className="text-4xl font-bold text-white mt-4">PawFund</Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
