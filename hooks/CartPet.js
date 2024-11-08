import { cartPetService } from '@/services/cartPetService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const useGetAllCartPets = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['cartPets'],
    queryFn: () => cartPetService.getAllCartPets(),
  });
  return {
    data,
    ...rest,
  };
};

export const useGetCartPetDetail = (id) => {
  const { data, ...rest } = useQuery({
    queryKey: ['cartPets', id],
    queryFn: () => cartPetService.getCartPetById(id),
  });
  return {
    data,
    ...rest,
  };
};

export const useAddCartPet = () => {
  const queryClient = useQueryClient();
  const { mutate: addCartPet, ...rest } = useMutation({
    mutationFn: ({ petId }) => cartPetService.addCartPet({ petId }),
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries(['pets', 'cart']);
      // Add success notification
      Alert.alert('Success', 'Pet added to cart successfully', [
        { text: 'OK' },
      ]);
    },
    onError: (error) => {
      // Add error notification
      Alert.alert('Error', error.message || 'Failed to add pet to cart', [
        { text: 'OK' },
      ]);
    },
  });

  return {
    addCartPet,
    ...rest,
  };
};

export const useUpdateCartPetStatus = () => {
  const queryClient = useQueryClient();

  const { mutate: updateStatus, ...rest } = useMutation({
    mutationFn: (data) => cartPetService.updateStatusCartPet(data),
    onSuccess: (response) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries(['pets', 'cart']);
      // Add success notification
      Alert.alert('Success', 'Cart updated successfully', [{ text: 'OK' }]);
    },
    onError: (error) => {
      // Add error notification
      Alert.alert('Error', error.message || 'Failed to update cart', [
        { text: 'OK' },
      ]);
    },
  });

  return {
    updateStatus,
    ...rest,
  };
};

export const useDeleteCartPet = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCartPet, ...rest } = useMutation({
    mutationFn: (id) => cartPetService.deleteCartPet(id),
    onSuccess: (response) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries(['pets', 'cart']);
      // Add success notification
      Alert.alert('Success', 'Pet removed from cart successfully', [
        { text: 'OK' },
      ]);
    },
    onError: (error) => {
      // Add error notification
      Alert.alert('Error', error.message || 'Failed to remove pet from cart', [
        { text: 'OK' },
      ]);
    },
  });

  return {
    deleteCartPet,
    ...rest,
  };
};
