import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
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
      navigation.navigate('Home');
    },
    onError: (error) => {
      console.log('Login error', error);
    },
  });

  return { mutate, ...rest };
};
