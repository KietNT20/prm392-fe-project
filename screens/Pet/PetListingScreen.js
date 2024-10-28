import React, { useState } from 'react';
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

const PetListingScreen = () => {
  const navigation = useNavigation();
  const { pets, isLoading, isError, error } = useGetAllPets();
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { mutate: deletePet } = useDeletePet();

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

  const handleDelete = (petId) => {
    Alert.alert(
      'Delete Pet', // Title of the alert dialog
      'Are you sure you want to delete this pet?', // Message inside the alert
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deletePet(petId, {
              onSuccess: () => {
                console.log('Pet deleted successfully');
                setModalVisible(false); // Close modal after deletion
              },
              onError: (error) => {
                console.error('Error deleting pet:', error);
              },
            });
          },
          style: 'destructive', // Use destructive style for dangerous actions
        },
      ],
      { cancelable: true },
    );
  };

  const handleDetail = (petId, imageUrl) => {
    setModalVisible(false);
    navigation.navigate('PetDetail', { petId, imageUrl });
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <FlatList
        data={pets}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PetDetail', {
                petId: item._id,
                imageUrl: item.image.url, // Pass the image URL to the detail screen
              })
            }
            className="bg-white shadow-md rounded-lg p-4 m-2 flex flex-row items-center"
          >
            <Image
              source={{ uri: item.image.url }}
              className="w-16 h-16 rounded-full"
            />
            <View className="ml-4 flex-1">
              <Text className="text-lg font-bold text-indigo-700">
                {item.name}
              </Text>
              <Text className="text-sm text-gray-600">{item.breed}</Text>
              <Text className="text-xs text-gray-400">{item.sex}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setSelectedPet(item);
                setModalVisible(true);
              }}
            >
              <Ionicons name="ellipsis-vertical" size={24} color="#000" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      {selectedPet && (
        <Modal
          transparent={true}
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
              <View className="bg-white p-6 rounded-lg w-4/5">
                <TouchableOpacity
                  onPress={() =>
                    handleDetail(selectedPet._id, selectedPet.image.url)
                  }
                  className="my-2"
                >
                  <Text className="text-lg text-black">View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(selectedPet._id)}
                  className="my-2"
                >
                  <Text className="text-lg  text-black">Delete Pet</Text>
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
