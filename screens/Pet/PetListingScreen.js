import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useDeletePet, useGetAllPets } from '@/hooks/Pet';
import PetSearchBar from '@/components/Search/SearchBar';

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
    <View style={{ flex: 1, padding: 16, backgroundColor: '#f3f4f6' }}>
      <PetSearchBar onSearch={handleSearch} />

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
              onPress={() => handleDetail(item._id, getImageUrl(item))}
              style={{
                backgroundColor: '#fff',
                marginVertical: 8,
                borderRadius: 12,
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              {/* Image at the top of the card */}
              <Image
                source={{ uri: getImageUrl(item) }}
                style={{ width: '100%', height: 200 }}
              />

              {/* Info below the image */}
              <View style={{ padding: 16 }}>
                <Text
                  style={{ fontSize: 18, fontWeight: 'bold', color: '#4f46e5' }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: '#555',
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    marginVertical: 4,
                  }}
                >
                  Breed: {item.breed}
                </Text>
                <Text style={{ color: '#777' }}>Sex: {item.sex}</Text>
                <Text style={{ color: '#777' }}>
                  Health Status: {item.healthStatus}
                </Text>
              </View>

              {/* Icon button at the right */}
              <TouchableOpacity
                onPress={() => setSelectedPet(item)}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  padding: 8,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 5,
                }}
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
                    handleDetail(selectedPet._id, getImageUrl(selectedPet))
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
