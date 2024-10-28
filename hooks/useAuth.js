import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { authServices } from 'services/authServices';
import storageMethod from 'utils/storageMethod';

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
      navigation.navigate('AddPet');
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

      setTimeout(async () => {
        await storageMethod.set({ token: response.token });
        Alert.alert('Registration Successful!', 'Welcome to PawFund!', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      }, 500);
    },
    onError: (error) => {
      console.log(
        'Registration error:',
        error?.response?.data || error.message,
      );
      Alert.alert(
        'Registration Failed',
        error?.response?.data?.message || 'Please try again.',
      );
    },
  });

  return {
    registerUser: mutation.mutate, // Ensure the registerUser is returned correctly
    isLoading: mutation.isLoading,
    ...mutation,
  };
};
