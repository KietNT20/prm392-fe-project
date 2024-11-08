import { adoptionRequestService } from '@/services/adoptionRequestService';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { Alert, ToastAndroid } from 'react-native';

export const useCreateAdoptionRequest = () => {
  const navigation = useNavigation();
  const { mutate: createAdoptionReq, ...rest } = useMutation({
    mutationKey: 'createAdoptionRequest',
    mutationFn: ({ petId, userId, name, address, phoneNumber, cccd }) =>
      adoptionRequestService.createAdoptReq({
        petId,
        userId,
        name,
        address,
        phoneNumber,
        cccd,
      }),
    onSuccess: (response) => {
      // console.log('Adoption request sent:', response);
      // Do something after success
      ToastAndroid.show('Adoption request sent', ToastAndroid.TOP);
      navigation.navigate('Pet');
    },
    onError: (error) => {
      // Do something after error
      Alert.alert('Error', error.message);
    },
  });
  return { createAdoptionReq, ...rest };
};
