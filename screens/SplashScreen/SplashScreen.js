import { useAuthContext } from '@/context/AuthContext';
import { handleSaveProfile } from '@/store/reducers/userProfileReducer';
import storageMethod from '@/utils/storageMethod';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const { updateToken } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthAndAnimate = async () => {
      // Start the fade-in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();

      try {
        // Check for authentication token while animation is running
        const token = await storageMethod.get();
        // Wait for both animation and minimum splash duration
        setTimeout(() => {
          if (token?.token) {
            // Just navigate to Login screen, the RootNavigator will handle the redirection
            updateToken(token.token);
            dispatch(handleSaveProfile(jwtDecode(token.token)));
            navigation.navigate('App');
          } else {
            navigation.replace('Login');
          }
          setIsLoading(false);
        }, 1500); // Minimum splash screen duration
      } catch (error) {
        console.error('Auth check failed:', error);
        // If there's an error, navigate to Login screen
        setTimeout(() => {
          navigation.replace('Login');
          setIsLoading(false);
        }, 1500);
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
