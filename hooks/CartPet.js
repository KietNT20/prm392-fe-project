import { cartPetService } from "@/services/cartPetService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllCartPets = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["cartPets"],
    queryFn: () => cartPetService.getAllCartPets(),
  });
  return {
    data,
    ...rest,
  };
};

export const useGetCartPetDetail = (id) => {
  const { data, ...rest } = useQuery({
    queryKey: ["cartPets", id],
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
    mutationFn: (data) => cartPetService.addCartPet(data),
    onSuccess: (response) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries(["pets", "cart"]);
      // Add success notification
      toast.success("Pet added to cart successfully");
    },
    onError: (error) => {
      // Add error notification
      toast.error(error.message || "Failed to add pet to cart");
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
      queryClient.invalidateQueries(["pets", "cart"]);
      // Add success notification
      toast.success("Cart updated successfully");
    },
    onError: (error) => {
      // Add error notification
      toast.error(error.message || "Failed to update cart");
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
      queryClient.invalidateQueries(["pets", "cart"]);
      // Add success notification
      toast.success("Pet removed from cart successfully");
    },
    onError: (error) => {
      // Add error notification
      toast.error(error.message || "Failed to remove pet from cart");
    },
  });

  return {
    deleteCartPet,
    ...rest,
  };
};
