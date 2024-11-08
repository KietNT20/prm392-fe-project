import { useGetAllCartPets } from '@/hooks/CartPet';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CartScreen = ({ navigation }) => {
  const [petDetails, setPetDetails] = useState([]); // Store pet details

  // Fetch carts data
  const { data: carts, isLoading, isError, error } = useGetAllCartPets();
  console.log('Carts:', carts?.data);

  // Ensure hooks are not conditionally called by only invoking once
  useEffect(() => {
    if (carts?.data?.length) {
      const fetchPetDetails = async () => {
        try {
          const details = await Promise.all(
            carts.data.map(async (cart) => {
              const petData = await fetch(
                `https://mobi-prm.vercel.app/api/pets/${cart.petId}`,
              )
                .then((response) => response.json())
                .then((data) => data.pet)
                .catch((error) => {
                  console.error('Error fetching pet details:', error);
                  return null;
                });

              return { petId: cart.petId, petData };
            }),
          );
          setPetDetails(details);
        } catch (error) {
          console.error('Error fetching pet details:', error);
        }
      };

      fetchPetDetails();
    }
  }, [carts]);

  // Loading state
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Carts...</Text>
      </View>
    );
  }

  // Error state
  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error loading cart: {error.message}</Text>
      </View>
    );
  }

  const getImageUrl = (petDetail) => {
    if (petDetail?.petData?.image && petDetail.petData.image.url) {
      return petDetail.petData.image.url;
    }
    if (petDetail?.petData?.image_id) {
      return `https://res.cloudinary.com/do9g6j7jw/image/upload/v1729306538/${petDetail.petData.image_id}.jpg`;
    }
    return 'https://via.placeholder.com/150';
  };

  const renderCartItem = ({ item }) => {
    const petDetail = petDetails.find((detail) => detail.petId === item.petId);

    return (
      <TouchableOpacity
        className="bg-white shadow-md rounded-lg p-4 m-2 flex-row items-center"
        onPress={() => {
          // Navigate to the CartDetailScreen and pass cartId and petDetail
          navigation.navigate('CartDetailScreen', {
            cartId: item._id,
            petDetail: petDetail,
          });
        }}
      >
        <View className="absolute top-2 right-2 bg-gray-200 px-2 py-1 rounded-full">
          <Text className="text-xs font-semibold text-gray-800">
            {item.status}
          </Text>
        </View>
        <View className="flex-shrink-0 mr-4">
          <Image
            source={{ uri: getImageUrl(petDetail) }}
            className="w-24 h-24 rounded-lg"
          />
        </View>

        <View className="flex-1">
          {petDetail ? (
            <>
              <Text className="text-lg font-semibold">
                {petDetail.petData?.name}
              </Text>
              <Text className="text-sm text-gray-600">
                Species: {petDetail.petData?.species}
              </Text>
              <Text className="text-sm text-gray-600">
                Breed: {petDetail.petData?.breed}
              </Text>
              <Text className="text-sm text-gray-600">
                Age: {petDetail.petData?.age}
              </Text>
            </>
          ) : (
            <Text className="text-sm">Loading pet details...</Text>
          )}
        </View>
        <Ionicons name="ellipsis-vertical" size={24} color="#000" />
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold">Carts List</Text>
      </View>
      <FlatList
        data={carts?.data}
        keyExtractor={(item) => item._id}
        renderItem={renderCartItem}
      />
    </View>
  );
};

export default CartScreen;
