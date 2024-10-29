import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetAllPets } from '@/hooks/Pet';

const PetListingScreen = () => {
  const navigation = useNavigation();
  const { pets, isLoading, isError, error } = useGetAllPets();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading pets...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error loading pets: {error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={pets}
      keyExtractor={(item, index) =>
        item.id ? item.id.toString() : index.toString()
      } // Use index as fallback if id is missing
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('PetDetail', { petId: item._id })} // Pass pet._id
          className="bg-white shadow-md rounded-lg p-4 m-2 flex flex-row items-center"
        >
          <Image
            source={{ uri: item.image.url }} // Use item.image.url for the image source
            className="w-16 h-16 rounded-full"
          />
          <View className="ml-4">
            <Text className="text-xl font-bold text-indigo-800">
              {item.name}
            </Text>
            <Text className="text-gray-600">{item.breed}</Text>
            <Text className="text-gray-500">{item.sex}</Text>
          </View>
        </TouchableOpacity>
      )}
      className="bg-gray-100 p-4"
    />
  );
};

export default PetListingScreen;
