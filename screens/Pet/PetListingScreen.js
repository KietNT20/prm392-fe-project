import PetSearchBar from '@/components/Search/SearchBar';
import { useDeletePet, useGetAllPets } from '@/hooks/Pet';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
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

  // Pass searchParams to useGetAllPets to trigger search with current filters
  const { pets, isLoading, isError, error } = useGetAllPets(searchParams);
  const { mutate: deletePet } = useDeletePet();

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

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#f3f4f6' }}>
      {/* Pet Search Bar */}
      <PetSearchBar onSearch={setSearchParams} />

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ flex: 1, justifyContent: 'center' }}
        />
      ) : isError ? (
        <Text style={{ color: 'red', textAlign: 'center' }}>
          Error loading pets: {error.message}
        </Text>
      ) : (
        <FlatList
          data={pets}
          keyExtractor={(item, index) => item._id || index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleDetail(item._id, item.image.url)}
              style={{
                backgroundColor: '#fff',
                padding: 16,
                marginVertical: 4,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 8,
              }}
            >
              <Image
                source={{ uri: item.image.url }}
                style={{ width: 64, height: 64, borderRadius: 32 }}
              />
              <View style={{ marginLeft: 16, flex: 1 }}>
                <Text style={{ fontSize: 18, color: '#4f46e5' }}>
                  {item.name}
                </Text>
                <Text>{item.breed}</Text>
                <Text>{item.sex}</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedPet(item)}>
                <Ionicons name="ellipsis-vertical" size={24} color="#000" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Modal for Pet Options */}
      {selectedPet && (
        <Modal
          transparent
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 16,
                  borderRadius: 8,
                  width: '80%',
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    handleDetail(selectedPet._id, selectedPet.image.url)
                  }
                  style={{ paddingVertical: 8 }}
                >
                  <Text>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(selectedPet._id)}
                  style={{ paddingVertical: 8 }}
                >
                  <Text>Delete Pet</Text>
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
