import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const pets = [
  {
    id: '1',
    name: 'Fluffy',
    sex: 'Female',
    breed: 'Labrador',
    vaccinated: true,
    healthStatus: 'Healthy',
    image_id: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Bella',
    sex: 'Female',
    breed: 'Golden Retriever',
    vaccinated: true,
    healthStatus: 'Healthy',
    image_id: 'https://via.placeholder.com/150',
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
          className=" shadow-xl rounded-2xl overflow-hidden m-3 flex flex-row items-center border transition-all transform active:scale-95"
          style={{ elevation: 5 }}
        >
          {/* Pet Image */}
          <View className="relative w-20 h-20 ml-3">
            <Image
              source={{ uri: item.image_id }}
              className="w-full h-full rounded-full object-cover border-2"
            />
            <View className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent rounded-full" />
          </View>

          {/* Pet Info */}
          <View className="ml-5 flex-1 py-6 pr-4">
            <Text className="text-xl font-bold text-indigo-900 mb-1 tracking-wide">
              {item.name}
            </Text>
            <Text className="text-gray-600 text-base mb-1 font-medium">
              {item.breed}
            </Text>
            <Text className="text-indigo-600 text-sm font-medium">
              {item.sex}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ paddingVertical: 15 }}
      className="bg-gradient-to-b from-gray-50 to-indigo-50"
    />
  );
};

export default PetListingsScreen;
