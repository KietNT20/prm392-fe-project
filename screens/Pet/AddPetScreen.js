import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';
import { useAddPet, useUploadImage } from '@/hooks/Pet';

const AddPetScreen = () => {
  const navigation = useNavigation();
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petSex, setPetSex] = useState('');
  const [petSpecies, setPetSpecies] = useState('');
  const [coatColor, setCoatColor] = useState('');
  const [healthStatus, setHealthStatus] = useState('');
  const [vaccinated, setVaccinated] = useState(false);
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  // Use mutations for image upload and adding pet
  const { mutateAsync: uploadImage } = useUploadImage();
  const { mutateAsync: addPet } = useAddPet();

  // Image picker function
  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Camera roll permission is needed to upload images.',
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      if (!result.cancelled) {
        setFile(result.uri);
        setError(null);
      } else {
        setError('Image selection was cancelled.');
      }
    }
  };

  // Function to handle image upload and pet submission
  const handleAddPet = async () => {
    try {
      if (!file) {
        Alert.alert('No image selected', 'Please select an image first.');
        return;
      }

      // Prepare image for upload
      const formData = new FormData();
      formData.append('file', {
        uri: file,
        name: `image_${Date.now()}.jpg`,
        type: 'image/jpeg',
      });

      // Upload the image
      const uploadResponse = await uploadImage(formData);
      const uploadedImageId = uploadResponse?.data?.image_id;
      if (!uploadedImageId) return;

      // Prepare new pet data
      const newPet = {
        name: petName,
        breed: petBreed,
        age: parseInt(petAge),
        sex: petSex,
        species: petSpecies,
        coatColor: coatColor,
        vaccinated: vaccinated,
        healthStatus: healthStatus,
        description: description,
        image_id: uploadedImageId, // Use uploaded image ID
      };

      // Add the pet
      await addPet(newPet);
      Alert.alert('Success', 'Pet added successfully!');
      navigation.goBack(); // Navigate back after successful addition
    } catch (error) {
      console.error('Error adding pet:', error);
      Alert.alert('Failed to add pet', 'Please try again.');
    }
  };

  return (
    <ScrollView className="flex-grow p-5 bg-white">
      {/* Form fields */}
      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-5"
        placeholder="Enter pet name"
        value={petName}
        onChangeText={setPetName}
      />

      <Text className="text-lg text-gray-700 mb-2">Breed</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-5"
        placeholder="Enter pet breed"
        value={petBreed}
        onChangeText={setPetBreed}
      />

      <Text className="text-lg text-gray-700 mb-2">Age</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-5"
        placeholder="Enter pet age"
        value={petAge}
        onChangeText={setPetAge}
        keyboardType="numeric"
      />

      <Text className="text-lg text-gray-700 mb-2">Sex</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-5"
        placeholder="Enter pet sex"
        value={petSex}
        onChangeText={setPetSex}
      />

      <Text className="text-lg text-gray-700 mb-2">Species</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-5"
        placeholder="Enter pet species"
        value={petSpecies}
        onChangeText={setPetSpecies}
      />

      <Text className="text-lg text-gray-700 mb-2">Coat Color</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-5"
        placeholder="Enter coat color"
        value={coatColor}
        onChangeText={setCoatColor}
      />

      <Text className="text-lg text-gray-700 mb-2">Health Status</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-5"
        placeholder="Enter health status"
        value={healthStatus}
        onChangeText={setHealthStatus}
      />

      <Text className="text-lg text-gray-700 mb-2">Description</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-5"
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Image Upload */}
      {file && (
        <Image source={{ uri: file }} className="w-full h-52 rounded-lg mb-5" />
      )}
      <TouchableOpacity
        className="bg-indigo-600 rounded-lg p-4 mb-5"
        onPress={handleSelectImage}
      >
        <Text className="text-white font-bold text-lg text-center">
          Select Pet Image
        </Text>
      </TouchableOpacity>

      {/* Submit */}
      <TouchableOpacity
        className="bg-indigo-600 rounded-lg p-4 mb-8"
        onPress={handleAddPet}
      >
        <Text className="text-white font-bold text-lg text-center">
          Add Pet
        </Text>
      </TouchableOpacity>

      {error && <Text className="text-red-500 mt-5">{error}</Text>}
    </ScrollView>
  );
};

export default AddPetScreen;
