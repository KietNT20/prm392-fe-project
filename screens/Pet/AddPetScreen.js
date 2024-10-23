import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { petServices } from '@/services/petService';
import * as ImagePicker from 'expo-image-picker'; // Use expo-image-picker

const AddPetScreen = () => {
  const navigation = useNavigation();
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  // Function to pick an image from the device's media library
  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Sorry, we need camera roll permission to upload images.',
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.cancelled) {
        setFile(result.uri);
        setError(null); // Clear any previous error
      } else {
        setError('Image selection was cancelled.');
      }
    }
  };

  // Handle image upload to media API
  const handleUploadImage = async () => {
    if (!file) {
      Alert.alert('No image selected', 'Please select an image first.');
      return null;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: file,
      name: `image_${Date.now()}.jpg`, // Assign a default name if missing
      type: 'image/jpeg',
    });

    try {
      const uploadResponse = await petServices.media(formData); // Upload image to API
      return uploadResponse?.data?.url; // Return the uploaded image URL
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Image upload failed', 'Please try again.');
      return null;
    }
  };

  const handleAddPet = async () => {
    try {
      const uploadedImageUrl = await handleUploadImage(); // Upload image first
      if (!uploadedImageUrl) return; // Ensure the image was uploaded before proceeding

      const newPet = {
        name: petName,
        breed: petBreed,
        age: petAge,
        image: uploadedImageUrl, // Set uploaded image URL
      };

      await petServices.addPet(newPet); // Add the pet to the backend
      Alert.alert('Success', 'Pet added successfully!');
      navigation.goBack(); // Go back after adding the pet
    } catch (error) {
      console.error('Error adding pet:', error);
      Alert.alert('Failed to add pet', 'Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add a New Pet</Text>

      <Text style={styles.label}>Pet Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pet name"
        value={petName}
        onChangeText={setPetName}
      />

      <Text style={styles.label}>Breed</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pet breed"
        value={petBreed}
        onChangeText={setPetBreed}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pet age"
        value={petAge}
        onChangeText={setPetAge}
        keyboardType="numeric"
      />

      {file && <Image source={{ uri: file }} style={styles.image} />}

      <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
        <Text style={styles.buttonText}>Select Pet Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleAddPet}>
        <Text style={styles.buttonText}>Add Pet</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4F46E5',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default AddPetScreen;
