import { adoptionRequestService } from '@/services/adoptionRequestService';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const useGetAllAdoptionRequests = () => {
  const {
    data: adoptionRequests,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['adoptionRequests'],
    queryFn: adoptionRequestService.getAdoptReq,
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  return { adoptionRequests, error, isLoading };
};

export const useUpdateAdoptionRequestStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) => {
      try {
        const response = await adoptionRequestService.updateAdoptRegStatus({
          id,
          status,
        });
        return response.data; // Ensure response.data contains the expected response
      } catch (error) {
        throw new Error(error);
      }
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['adoptionRequests'],
      });
      // Show success message
      ToastAndroid.show('Status updated successfully', ToastAndroid.TOP);
      console.log('Status updated successfully:', data);
    },
    onError: (error) => {
      // Show error alert if mutation fails
      Alert.alert('Error', error.message);
      console.error('Error updating status:', error);
    },
  });
};
