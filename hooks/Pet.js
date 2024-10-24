import { petServices } from '@/services/petService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

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
    queryFn: () => petServices.getPetDetail(id), // Fetch pet detail using the ID
    onSuccess: (response) => {
      console.log('Pet detail fetched:', response);
    },
    onError: (error) => {
      console.log('Error fetching pet detail:', error);
    },
  });

  return {
    pet: data?.pet || null, // Access the 'pet' object directly from the API response
    isLoading,
    isError,
    error,
  };
};

// Mutation for adding a pet
export const useAddPet = () => {
  return useMutation({
    mutationFn: (newPet) => petServices.addPet(newPet),
    onSuccess: () => {
      console.log('Pet added successfully');
    },
    onError: (error) => {
      console.error('Error adding pet:', error);
    },
  });
};

// Mutation for uploading an image
export const useUploadImage = () => {
  return useMutation({
    mutationFn: (formData) => petServices.media(formData),
    onSuccess: (response) => {
      console.log('Image uploaded successfully:', response);
    },
    onError: (error) => {
      console.error('Error uploading image:', error);
    },
  });
};

export const useUpdatePet = () => {
  const queryClient = useQueryClient(); // Get query client to invalidate or update data after mutation

  return useMutation({
    mutationFn: ({ id, updatedPetData }) =>
      petServices.updatePet(id, updatedPetData), // Call the API to update pet
    onSuccess: (response) => {
      console.log('Pet updated successfully:', response);

      // Use correct pet ID from response
      queryClient.invalidateQueries(['petDetail', response.pet._id]);

      // Optionally, you can refetch the data to ensure the UI reflects the latest data
      queryClient.refetchQueries(['petDetail', response.pet._id]);
    },
    onError: (error) => {
      console.error('Error updating pet:', error);
    },
  });
};
