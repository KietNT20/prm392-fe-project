import { adoptionRequestService } from '@/services/adoptionRequestService';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const useCreateAdoptionRequest = () => {
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
    onSuccess: () => {
      // Do something after success
      Alert.alert('Adoption request has been sent successfully');
    },
    onError: (error) => {
      // Do something after error
      Alert.alert('Error', error.message);
    },
  });
  return { createAdoptionReq, ...rest };
};
