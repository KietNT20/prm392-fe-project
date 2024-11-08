import { useAuthContext } from '@/context/AuthContext';
import { handleGetProfile } from '@/store/reducers/userProfileReducer';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { Alert, ToastAndroid } from 'react-native';
import { useDispatch } from 'react-redux';
import { authServices } from 'services/authServices';
import storageMethod from 'utils/storageMethod';

export const useRegister = () => {
  const navigation = useNavigation();
  const mutation = useMutation({
    mutationKey: 'register',
    mutationFn: (data) => authServices.registerUser(data),
    onSuccess: async (response) => {
      console.log('Register success:', response);
      ToastAndroid.show('Register successful', ToastAndroid.TOP);
      navigation.navigate('Login');
    },
    onError: (error) => {
      console.log('Registration error', error);
      Alert.alert('Registration Failed', error.message || 'Please try again.');
    },
  });

  return {
    registerUser: mutation.mutate,
    isLoading: mutation.isPending,
  };
};

// useLogin.js
export const useLogin = () => {
  const { updateToken } = useAuthContext();
  const dispatch = useDispatch();
  const { mutate: login, ...rest } = useMutation({
    mutationKey: ['login'],
    mutationFn: ({ identifier, password }) =>
      authServices.loginUser({ identifier, password }),
    onSuccess: async (response) => {
      try {
        if (response && response.token) {
          await storageMethod.set({ token: response.token });
          updateToken(response.token);
          dispatch(handleGetProfile(jwtDecode(response.token)));
          ToastAndroid.show('Login successful', ToastAndroid.TOP);
        }
      } catch (error) {
        console.error('Error handling login:', error);
        Alert.alert(
          'Login Error',
          'There was an error while logging in. Please try again.',
        );
      }
    },
    onError: (error) => {
      console.log('Login error', error);
      Alert.alert(
        'Login Failed',
        error?.message || 'Invalid credentials. Please try again.',
      );
    },
  });

  return { login, ...rest };
};

// Hook đăng xuất
export const useLogout = () => {
  const navigation = useNavigation();
  const { clearToken } = useAuthContext();

  const logout = async () => {
    try {
      await storageMethod.remove();
      clearToken();
      ToastAndroid.show('Logout successful', ToastAndroid.TOP);
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert(
        'Logout Error',
        'There was an error while logging out. Please try again.',
      );
    }
  };

  return { logout };
};
