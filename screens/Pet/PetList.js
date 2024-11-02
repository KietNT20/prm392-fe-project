import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// New pets data structure
const pets = [
  {
    id: '1',
    name: 'Fluffy',
    sex: 'Female',
    breed: 'Labrador',
    vaccinated: true,
    healthStatus: 'Healthy',
    image_id: 'https://via.placeholder.com/150', // Sample image URL
  },
  {
    id: '2',
    name: 'Bella',
    sex: 'Female',
    breed: 'Golden Retriever',
    vaccinated: true,
    healthStatus: 'Healthy',
    image_id: 'https://via.placeholder.com/150', // Sample image URL
  },
];

const PetListingsScreen = () => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={pets}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('PetDetail', { pet: item })}
          className="bg-white shadow-md rounded-lg p-4 m-2 flex flex-row items-center"
        >
          <Image
            source={{ uri: item.image_id }}
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

export default PetListingsScreen;
