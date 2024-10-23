import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePetDetail } from '@/hooks/Pet';

const PetDetailScreen = ({ route, navigation }) => {
  const { petId } = route.params; // Get petId from navigation
  const { pet, isLoading, isError, error } = usePetDetail(petId); // Fetch the pet details

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading pet details...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error loading pet details: {error.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-5 bg-white">
      <TouchableOpacity
        style={{ position: 'absolute', top: 50, left: 20, zIndex: 1 }}
        onPress={() => navigation.navigate('Pet')}
      >
        <Ionicons name="arrow-back" size={30} color="#6c63ff" />
      </TouchableOpacity>

      {/* Display pet image */}
      <Image
        source={{ uri: pet?.image?.url }} // Directly use pet.image.url for the image
        className="w-full h-64 rounded-lg mb-5"
        resizeMode="cover"
      />

      {/* Display pet details */}
      <Text className="text-2xl font-bold text-indigo-800 mb-2">
        {pet?.name}
      </Text>
      <Text className="text-lg text-gray-600 mb-1">{pet?.breed}</Text>
      <Text className="text-base text-gray-500 mb-1">Sex: {pet?.sex}</Text>
      <Text className="text-base text-gray-500 mb-1">
        Vaccinated: {pet?.vaccinated ? 'Yes' : 'No'}
      </Text>
      <Text className="text-base text-gray-500 mb-3">
        Health Status: {pet?.healthStatus}
      </Text>

      <Button
        title="Start Adoption Process"
        onPress={() => Alert.alert('Adoption process started')}
        color="#6c63ff"
      />
      <View className="mt-4">
        <Button
          title="Donate"
          onPress={() => navigation.navigate('Donation')}
          color="#34D399"
        />
      </View>
    </View>
  );
};

export default PetDetailScreen;
