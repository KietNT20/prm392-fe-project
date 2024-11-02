import storageMethod from '@/utils/storageMethod';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndAnimate = async () => {
      // Start the fade-in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();

      try {
        // Check for authentication token while animation is running
        const token = await storageMethod.get();
        // Wait for both animation and minimum splash duration
        setTimeout(async () => {
          if (token) {
            navigation.navigate('Drawer');
          } else {
            navigation.navigate('Login');
          }
          setIsLoading(false);
        }, 2000); // Minimum splash screen duration
      } catch (error) {
        console.error('Auth check failed:', error);
        // If there's an error, navigate to Auth stack
        setTimeout(() => {
          navigation.navigate('Login');
          setIsLoading(false);
        }, 2000);
      }
    };

    checkAuthAndAnimate();
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
