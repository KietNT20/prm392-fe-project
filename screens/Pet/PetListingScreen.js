
import PetSearchBar from '@/components/Search/SearchBar';
import { useDeletePet, useGetAllPets } from '@/hooks/Pet';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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
    if (isLoading) console.log('Fetching pets...');
    if (isError) console.error('Error fetching pets:', error);
    if (pets) console.log('Fetched pets:', pets);
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
              console.log('Pet deleted successfully:', petId);
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
    <View className="flex-1 p-4 bg-slate-150">
      <PetSearchBar onSearch={handleSearch} />

      {isLoading ? (
        <View className="flex-1 justify-center items-center mt-16">
          <ActivityIndicator size="large" color="#6B46C1" className="mb-6" />
          <Text className="text-xl font-semibold text-indigo-800 mb-2">
            Fetching pets...
          </Text>
          <Text className="text-center text-gray-500">
            Please wait a moment while we load the latest pets for you.
          </Text>
        </View>
      ) : isError ? (
        <View className="flex-1 justify-center items-center mt-16 p-6 bg-red-100 rounded-lg shadow-md mx-4">
          <Ionicons name="alert-circle-outline" size={48} color="#F56565" />
          <Text className="text-xl font-semibold text-red-500 mt-4">
            Error loading pets!
          </Text>
          <Text className="text-center text-gray-600 mt-2">
            {error.message}
          </Text>
        </View>
      ) : (
        <FlatList
          className="mt-10"
          data={pets}
          keyExtractor={(item, index) => item._id || index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleDetail(item._id, getImageUrl(item))}
              className="bg-white my-4 rounded-xl shadow-lg overflow-hidden" 
            >
              <View className="relative w-full h-56 rounded-t-xl overflow-hidden mt-2">
                <Image
                  source={{ uri: getImageUrl(item) }}
                  className="w-full h-full object-cover"
                  style={{
                    borderRadius: 16, 
                    borderWidth: 2,
                    borderColor: '#FFFFFF', 
                  }}
                />
                <View className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-t-xl" />
                <Text className="absolute bottom-6 left-6 text-3xl font-extrabold text-white tracking-wide shadow-2xl">
                  {item.name}
                </Text>
              </View>

              <View className="p-5 bg-indigo-50 rounded-b-xl">
                <View className="flex-row items-center mb-2">
                  <MaterialIcons name="pets" size={20} color="#FF6D6D" />
                  <Text className="text-lg font-medium italic text-gray-700 ml-2">
                    Breed: {item.breed}
                  </Text>
                </View>

                <View className="flex-row items-center mb-2">
                  <Ionicons
                    name="male-female-outline"
                    size={18}
                    color="#FF6D6D"
                  />
                  <Text className="text-lg text-gray-600 ml-2">
                    Sex: {item.sex}
                  </Text>
                </View>

 
                <View className="flex-row items-center mb-2">
                  <Ionicons name="medkit-outline" size={18} color="#FF6D6D" />
                  <Text className="text-lg text-gray-600 ml-2">
                    Health Status: {item.healthStatus}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}


      {selectedPet && (
        <Modal
          transparent
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View className="flex-1 justify-center items-center bg-black/50">
              <View className="bg-white p-5 rounded-lg w-4/5 shadow-xl">
                <TouchableOpacity
                  onPress={() =>
                    handleDetail(selectedPet._id, getImageUrl(selectedPet))
                  }
                  className="py-3 border-b border-gray-200"
                >
                  <Text className="text-center text-blue-600 font-semibold">
                    View Details
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(selectedPet._id)}
                  className="py-3"
                >
                  <Text className="text-center text-red-500 font-semibold">
                    Delete Pet
                  </Text>
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
