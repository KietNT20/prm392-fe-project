import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { authServices } from 'services/authServices';
import storageMethod from 'utils/storageMethod';
import { Alert } from 'react-native';

export const useLogin = () => {
  const navigation = useNavigation();
  const { mutate, ...rest } = useMutation({
    mutationKey: ['login'],
    mutationFn: (data) => authServices.loginUser(data),
    onSuccess: (response) => {
      console.log('Login success', response);
      storageMethod.set({
        token: response?.token,
      });
      navigation.navigate('Home');
    },
    onError: (error) => {
      console.log('Login error', error);
    },
  });

  return { mutate, ...rest };
};

export const useRegister = () => {
  const navigation = useNavigation();

  const mutation = useMutation({
    mutationFn: (data) => authServices.registerUser(data),
    onSuccess: async (response) => {
      console.log('Registration success:', response);

      // Simulate delay before storing token and navigating
      setTimeout(async () => {
        // Save the token to AsyncStorage
        await storageMethod.set({ token: response.token });
        // Navigate to Home screen or show success message
        Alert.alert('Registration Successful!', 'Welcome to PawFund!', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      }, 500); // Delay for 500ms to ensure backend completes registration
    },
    onError: (error) => {
      console.log('Registration error', error);
      Alert.alert('Registration Failed', error.message || 'Please try again.');
    },
  });

  return {
    registerUser: mutation.mutate, // Call this in the Register screen
    isLoading: mutation.isLoading, // For loading states
    ...mutation, // Spread any other properties you might need
  };
};
