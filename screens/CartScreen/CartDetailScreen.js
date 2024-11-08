import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useGetCartPetDetail } from '@/hooks/CartPet';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartDetailScreen = ({ navigation }) => {
  const route = useRoute(); // Get the parameters passed from the navigation
  const { cartId, petDetail } = route.params; // Extract cartId and petDetail

  // If petDetail was passed, use it, otherwise fetch the data based on cartId
  const petData = petDetail ? petDetail.petData : null;

  // Fetch cart pet details if petDetail is not passed
  const { data, isLoading, isError, error } = useGetCartPetDetail(cartId);
  const status = data?.data?.status || null;

  if (isLoading && !petDetail) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Cart Details...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error loading cart detail: {error.message}</Text>
      </View>
    );
  }

  const statusColor = {
    pending: '#555555',
    confirmed: '#28a745',
    cancelled: '#dc3545',
  };
  return (
    <View className="flex-1 bg-gray-100 p-4 justify-center items-center">
      <TouchableOpacity
        className="absolute top-12 left-5 z-10"
        onPress={() => navigation.navigate('Cart')}
      >
        <Ionicons name="arrow-back" size={30} color="#6c63ff" />
      </TouchableOpacity>
      <Text className="text-xl font-bold mt-16">Cart Detail</Text>

      {/* Status Section */}
      <View className="mt-4 mb-6 flex-row items-center">
        <Text className="text-xl font-semibold mr-2">Status:</Text>
        <Text
          className="text-xl font-semibold"
          style={{
            color: statusColor[status] || '#000',
          }}
        >
          {status === 'pending' && 'Đang duyệt'}
          {status === 'confirmed' && 'Đã duyệt'}
          {status === 'cancelled' && 'Hủy'}
        </Text>
      </View>
      {petData && (
        <>
          <Image
            source={{
              uri:
                `https://res.cloudinary.com/do9g6j7jw/image/upload/v1729306538/${petData.image_id}.jpg` ||
                'https://via.placeholder.com/150',
            }}
            className="w-40 h-40 rounded-lg mb-4"
          />
          <Text className="text-lg font-semibold">{petData?.name}</Text>
          <Text className="text-sm text-gray-600">
            Species: {petData?.species}
          </Text>
          <Text className="text-sm text-gray-600">Breed: {petData?.breed}</Text>
          <Text className="text-sm text-gray-600">Age: {petData?.age}</Text>
          <Text className="text-sm text-gray-600">
            Description: {petData?.description}
          </Text>
        </>
      )}
    </View>
  );
};

export default CartDetailScreen;
