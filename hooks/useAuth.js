// hooks/useAuth.js
import { authServices } from '@/services/authServices';
import storageMethod from '@/utils/storageMethod';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

// Hook đăng ký
export const useRegister = () => {
  const navigation = useNavigation();
  const mutation = useMutation({
    mutationKey: 'register',
    mutationFn: (data) => authServices.registerUser(data),
    onSuccess: async (response) => {
      console.log('response', response);
      try {
        await storageMethod.set({ token: response.token });
        Alert.alert('Đăng ký thành công!', 'Chào mừng bạn đến với PawFund!', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      } catch (error) {
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi lưu thông tin đăng nhập');
      }
    },
    onError: (error) => {
      Alert.alert('Đăng ký thất bại', error.message || 'Vui lòng thử lại.');
    },
  });

  return {
    registerUser: mutation.mutate,
    isLoading: mutation.isPending,
  };
};

// Hook đăng nhập
export const useLogin = () => {
  const navigation = useNavigation();
  const {
    mutate: login,
    isPending: isLoading,
    ...rest
  } = useMutation({
    mutationKey: 'login',
    mutationFn: ({ identifier, password }) =>
      authServices.loginUser({ identifier, password }),
    onSuccess: async (response) => {
      console.log('response', response);
      try {
        await storageMethod.set({ token: response.token });
        navigation.navigate('Main');
      } catch (error) {
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi lưu thông tin đăng nhập');
      }
    },
    onError: (error) => {
      Alert.alert(
        'Đăng nhập thất bại',
        error.message || 'Thông tin đăng nhập không chính xác',
      );
    },
  });
  return { login, isLoading, ...rest };
};

// Hook đăng xuất
export const useLogout = () => {
  const navigation = useNavigation();

  const logout = async () => {
    try {
      await storageMethod.remove();
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi đăng xuất. Vui lòng thử lại.');
    }
  };

  return { logout };
};
