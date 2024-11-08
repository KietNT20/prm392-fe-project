import PetSearchBar from '@/components/Search/SearchBar';
import { useDeletePet, useGetAllPets } from '@/hooks/Pet';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const PetListingScreen = () => {
  const navigation = useNavigation();
  const [searchParams, setSearchParams] = useState({});
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { pets, isLoading, isError, error } = useGetAllPets(searchParams);
  const { mutate: deletePet } = useDeletePet();

  useEffect(() => {
    if (isLoading) // console.log('Fetching pets...');
    if (isError) console.error('Error fetching pets:', error);
    if (pets) // console.log('Fetched pets:', pets);
  }, [isLoading, isError, pets]);

  const handleDelete = (petId) => {
    Alert.alert('Delete Pet', 'Are you sure you want to delete this pet?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deletePet(petId, {
            onSuccess: () => {
              // console.log('Pet deleted successfully:', petId);
            },
            onError: (error) => {
              console.error('Error deleting pet:', error);
            },
          });
        },
      },
    ]);
  };

  const handleDetail = (petId, imageUrl) => {
    setModalVisible(false);
    navigation.navigate('PetDetail', { petId, imageUrl });
  };

  const getImageUrl = (item) => {
    if (item.image && item.image.url) {
      return item.image.url;
    }
    if (item.image_id) {
      return `https://res.cloudinary.com/do9g6j7jw/image/upload/v1729306538/${item.image_id}.jpg`;
    }
    return 'https://via.placeholder.com/150';
  };

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <View className="flex-1 p-4 bg-indigo-100">
      <PetSearchBar onSearch={handleSearch} />

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#4f46e5"
          className="flex-1 justify-center"
        />
      ) : isError ? (
        <Text className="text-red-500 text-center">
          Error loading pets: {error.message}
        </Text>
      ) : (
        <FlatList
          data={pets}
          keyExtractor={(item, index) => item._id || index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleDetail(item._id, getImageUrl(item))}
              className="bg-white my-2 rounded-lg shadow-md overflow-hidden"
            >
              <Image
                source={{ uri: getImageUrl(item) }}
                className="w-full h-48"
              />

              <View className="p-4">
                <Text className="text-lg font-semibold text-indigo-600">
                  {item.name}
                </Text>
                <Text className="text-gray-600 font-semibold italic my-1">
                  Breed: {item.breed}
                </Text>
                <Text className="text-gray-500">Sex: {item.sex}</Text>
                <Text className="text-gray-500">
                  Health Status: {item.healthStatus}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setSelectedPet(item);
                  setModalVisible(true);
                }}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md"
              >
                <Ionicons name="ellipsis-vertical" size={24} color="#000" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}

      {selectedPet && (
        <Modal
          transparent
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View className="flex-1 justify-center items-center bg-black/50">
              <View className="bg-white p-4 rounded-lg w-4/5">
                <TouchableOpacity
                  onPress={() =>
                    handleDetail(selectedPet._id, getImageUrl(selectedPet))
                  }
                  className="py-2"
                >
                  <Text className="text-center text-indigo-600">
                    View Details
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(selectedPet._id)}
                  className="py-2"
                >
                  <Text className="text-center text-red-500">Delete Pet</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

export default PetListingScreen;
