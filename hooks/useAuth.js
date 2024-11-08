//useAuth.js
import { useAuthContext } from '@/context/AuthContext';
import {
  clearProfile,
  handleSaveProfile,
} from '@/store/reducers/userProfileReducer';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
      // console.log('Register success:', response);
      ToastAndroid.show('Register successful', ToastAndroid.TOP);
      navigation.navigate('Login');
    },
    onError: (error) => {
      // console.log('Registration error', error);
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
        if (response) {
          await storageMethod.set({ token: response.token });
          dispatch(handleSaveProfile(jwtDecode(response.token)));
          updateToken(response.token);
          ToastAndroid.show('Login successful', ToastAndroid.TOP);
        }
      } catch (error) {
        console.error('Error during login:', error);
        Alert.alert(
          'Login Error',
          'There was an error while logging in. Please try again.',
        );
      }
    },
    onError: (error) => {
      // console.log('Login error', error);
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
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await storageMethod.remove();
      clearToken();
      dispatch(clearProfile());
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

export const useGetUserDetails = (userId) => {
  const { data: getUserDetailsData, ...rest } = useQuery({
    queryKey: ['userDetails', userId],
    queryFn: () => authServices.getUserDetails(userId),
    enabled: !!userId,
  });
  return { getUserDetailsData, ...rest };
};
export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient(); // Initialize query client for cache management

  return useMutation({
    mutationFn: ({ userId, updatedUserData }) =>
      authServices.updateUser(userId, updatedUserData), // Call the API to update user data
    onSuccess: (response) => {
      console.log('User updated successfully:', response);

      // Invalidate and refetch the user's data by ID to keep it in sync
      queryClient.invalidateQueries(['user', response.data._id]);

      // Optionally, you can refetch the user data to update the UI immediately
      queryClient.refetchQueries(['user', response.data._id]);
    },
    onError: (error) => {
      console.error('Error updating user:', error);
    },
  });
};
