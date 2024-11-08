import { useNavigation } from '@react-navigation/native';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';


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
          className="bg-white shadow-lg rounded-xl overflow-hidden m-3 flex flex-row items-center border border-gray-200"
          style={{ elevation: 4 }} 
        >
          <View className="relative w-20 h-20 ml-2">
            <Image
              source={{ uri: item.image_id }}
              className="w-full h-full rounded-full object-cover"
            />
            <View className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent rounded-full" />
          </View>
          <View className="ml-5 flex-1 py-4">
            <Text className="text-lg font-semibold text-indigo-800 mb-1 tracking-wide">
              {item.name}
            </Text>
            <Text className="text-gray-600 text-base mb-1">{item.breed}</Text>
            <Text className="text-gray-500 text-sm">{item.sex}</Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ paddingVertical: 10 }}
      className="bg-gray-50"
    />
  );
};

export default PetListingsScreen;
