import { petServices } from '@/services/petService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetAllPets = (searchParams = {}) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['pets', searchParams],
    queryFn: () =>
      Object.keys(searchParams).length
        ? petServices.getPetsByQuery(searchParams) // Fetch with filters
        : petServices.getAllPets(), // Fetch all pets if no filters
    onSuccess: (response) => {
      console.log('Fetched pets:', response);
    },
    onError: (error) => {
      console.log('Error fetching pets:', error);
    },
  });

  return {
    pets: data?.data || [],
    isLoading,
    isError,
    error,
  };
};

export const usePetDetail = (id) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['pets', id],
    queryFn: () => petServices.getPetDetail(id), // Fetch pet detail using the ID
    onSuccess: (response) => {
      console.log('Pet detail fetched:', response);
    },
    onError: (error) => {
      console.log('Error fetching pet detail:', error);
    },
  });

  return {
    pet: data?.pet || null,
    isLoading,
    isError,
    error,
  };
};

// Mutation for adding a pet
export const useAddPet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPet) => petServices.addPet(newPet), // Make sure you pass the full newPet object with the image id
    onSuccess: () => {
      console.log('Pet added successfully');
      queryClient.invalidateQueries(['pets']);
    },
  });
};

// Mutation for uploading an image
export const useUploadImage = () => {
  return useMutation({
    mutationFn: (imageFile) => {
      const formData = new FormData();
      formData.append('image', imageFile); // assuming 'image' is the field name for the image in the backend

      return petServices.media(formData); // pass the FormData object to the media service
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
      queryClient.invalidateQueries(['pets', response.pet._id]);

      // Optionally, you can refetch the data to ensure the UI reflects the latest data
      queryClient.refetchQueries(['pets', response.pet._id]);
    },
    onError: (error) => {
      console.error('Error updating pet:', error);
    },
  });
};

export const useDeletePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => petServices.deletePet(id), // Call delete API
    onSuccess: () => {
      console.log('Pet deleted successfully');

      // Optionally invalidate or refetch queries related to the pets list
      queryClient.invalidateQueries(['pets']); // Ensure updated list after deletion
    },
    onError: (error) => {
      console.error('Error deleting pet:', error);
    },
  });
};
export const useDeleteMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => petServices.deleteMedia(id), // Call delete API
    onSuccess: () => {
      console.log('Image deleted successfully');

      // Optionally invalidate or refetch queries related to the pets list
      queryClient.invalidateQueries(['pets']); // Ensure updated list after deletion
    },
    onError: (error) => {
      console.error('Error deleting image:', error);
    },
  });
};
export const useSearchPets = (queryParams) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['petsQuery', queryParams],
    queryFn: () => petServices.getPetsByQuery(queryParams),
    enabled: !!queryParams && Object.keys(queryParams).length > 0,
    onSuccess: (response) => {
      console.log('Search results:', response);
    },
    onError: (error) => {
      console.log('Error fetching search results:', error);
    },
  });

  return {
    pets: data?.data || [],
    isLoading,
    isError,
    error,
  };
};
