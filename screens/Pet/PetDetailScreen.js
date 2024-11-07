import { usePetDetail, useUpdatePet } from '@/hooks/Pet';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const PetDetailScreen = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editablePet, setEditablePet] = useState(pet);
  const [originalPet, setOriginalPet] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { petId, imageUrl } = route.params;
  const { pet } = usePetDetail(petId);
  const updatePetMutation = useUpdatePet();

  useEffect(() => {
    if (pet) {
      setEditablePet(pet);
      setOriginalPet(pet); // Save the original data on first load
    }
  }, [pet]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // Handle changes in TextInput fields
  const handleInputChange = (key, value) => {
    setEditablePet({ ...editablePet, [key]: value });
  };

  const handleRequestAdoption = () => {
    Alert.alert('Adoption process started');
    navigation.navigate('Adoption', {
      petId: petId,
      petName: pet.name,
    });
  };

  // Handle canceling the edit and revert to original data
  const handleCancel = () => {
    setEditablePet(originalPet); // Restore original pet data
    setIsEditMode(false); // Exit edit mode
  };

  // Function to handle saving edited pet details
  const handleSave = () => {
    updatePetMutation.mutate(
      {
        id: petId,
        updatedPetData: editablePet,
      },
      {
        onSuccess: (response) => {
          if (response && response.pet) {
            const updatedPet = response.pet;
            setEditablePet(updatedPet);
            setIsEditMode(false);
            Alert.alert('Success', 'Pet details updated successfully.');
          } else {
            Alert.alert('Error', 'Pet update response is missing data.');
          }
        },
        onError: (err) => {
          Alert.alert('Error', `Failed to update pet details: ${err.message}`);
        },
      },
    );
  };

  return (
    <ScrollView className="flex-1 p-5 bg-white">
      <TouchableOpacity
        className="absolute top-12 left-5 z-10"
        onPress={() => navigation.navigate('Pet')}
      >
        <Ionicons name="arrow-back" size={30} color="#6c63ff" />
      </TouchableOpacity>

      {/* Edit and Cancel Icons */}
      {isEditMode ? (
        <View className="absolute top-12 right-5 flex-row space-x-4 z-10">
          {/* Save Icon */}
          <TouchableOpacity onPress={handleSave}>
            <Ionicons name="checkmark" size={30} color="#6c63ff" />
          </TouchableOpacity>
          {/* Cancel Icon */}
          <TouchableOpacity onPress={handleCancel}>
            <Ionicons name="close" size={30} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          className="absolute top-12 right-5 z-10"
          onPress={toggleEditMode}
        >
          <Ionicons name="pencil" size={30} color="#6c63ff" />
        </TouchableOpacity>
      )}

      <Image
        source={{ uri: imageUrl }}
        className="w-full h-64 rounded-lg mb-5"
        resizeMode="cover"
      />

      {/* Editable Fields */}
      {isEditMode ? (
        <View>
          <TextInput
            value={editablePet?.name}
            onChangeText={(text) => handleInputChange('name', text)}
            placeholder="Pet Name"
            className="bg-gray-100 rounded-lg p-3 mb-4 text-lg"
          />
          <TextInput
            value={editablePet?.breed}
            onChangeText={(text) => handleInputChange('breed', text)}
            placeholder="Breed"
            className="bg-gray-100 rounded-lg p-3 mb-4 text-lg"
          />
          <TextInput
            value={editablePet?.age?.toString()}
            onChangeText={(text) => handleInputChange('age', text)}
            placeholder="Age"
            className="bg-gray-100 rounded-lg p-3 mb-4 text-lg"
            keyboardType="numeric"
          />
          <TextInput
            value={editablePet?.sex}
            onChangeText={(text) => handleInputChange('sex', text)}
            placeholder="Sex"
            className="bg-gray-100 rounded-lg p-3 mb-4 text-lg"
          />
          <TextInput
            value={editablePet?.species}
            onChangeText={(text) => handleInputChange('species', text)}
            placeholder="Species"
            className="bg-gray-100 rounded-lg p-3 mb-4 text-lg"
          />
          <TextInput
            value={editablePet?.coatColor}
            onChangeText={(text) => handleInputChange('coatColor', text)}
            placeholder="Coat Color"
            className="bg-gray-100 rounded-lg p-3 mb-4 text-lg"
          />
          <TextInput
            value={editablePet?.healthStatus}
            onChangeText={(text) => handleInputChange('healthStatus', text)}
            placeholder="Health Status"
            className="bg-gray-100 rounded-lg p-3 mb-4 text-lg"
          />
          <TextInput
            value={editablePet?.description}
            onChangeText={(text) => handleInputChange('description', text)}
            placeholder="Description"
            className="bg-gray-100 rounded-lg p-3 mb-4 text-lg h-24"
            multiline
          />
        </View>
      ) : (
        <View>
          <Text className="text-2xl font-bold text-indigo-800 mb-2">
            {pet?.name}
          </Text>
          <Text className="text-lg text-gray-600 mb-1">{pet?.breed}</Text>
          <Text className="text-base text-gray-500 mb-1">
            Age: {pet?.age} years
          </Text>
          <Text className="text-base text-gray-500 mb-1">Sex: {pet?.sex}</Text>
          <Text className="text-base text-gray-500 mb-1">
            Species: {pet?.species}
          </Text>
          <Text className="text-base text-gray-500 mb-1">
            Coat Color: {pet?.coatColor}
          </Text>
          <Text className="text-base text-gray-500 mb-1">
            Vaccinated: {pet?.vaccinated ? 'Yes' : 'No'}
          </Text>
          <Text className="text-base text-gray-500 mb-1">
            Health Status: {pet?.healthStatus}
          </Text>
          <Text className="text-base text-gray-500 mb-3">
            {pet?.description}
          </Text>
        </View>
      )}

      <Button
        title="Start Adoption Process"
        onPress={() => handleRequestAdoption()}
        color="#6c63ff"
      />
      <View className="mt-5 mb-10">
        <Button
          title="Donate"
          onPress={() => navigation.navigate('Donation')}
          color="#34D399"
        />
      </View>
    </ScrollView>
  );
};

export default PetDetailScreen;
