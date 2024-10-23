import { petServices } from '@/services/petService';
import { useQuery } from '@tanstack/react-query';

export const useGetAllPets = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['allPets'],
    queryFn: () => petServices.getAllPets(), // Call to the API
    onSuccess: (response) => {
      console.log('API Response:', response); // Log the response to see the structure
    },
    onError: (error) => {
      console.log('Error fetching pets:', error);
    },
  });

  return {
    pets: data?.data || [], // Handle the structure of the response
    isLoading,
    isError,
    error,
  };
};
export const usePetDetail = (id) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['petDetail', id],
    queryFn: () => petServices.getPetDetail(id), // Fetch detailed pet info
    onSuccess: (response) => {
      console.log('Pet detail fetched:', response);
    },
    onError: (error) => {
      console.log('Error fetching pet detail:', error);
    },
  });

  return {
    pet: data?.data || null,
    isLoading,
    isError,
    error,
  };
};
