import { useAddPet, useUploadImage } from '@/hooks/Pet';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  Modal,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const AddPetForm = () => {
  const [imageUri, setImageUri] = useState(null);
  const [uploadedImageId, setUploadedImageId] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    sex: '',
    age: '',
    species: '',
    coatColor: '',
    breed: '',
    vaccinated: false,
    healthStatus: '',
    description: '',
  });
  const [isHealthModalVisible, setIsHealthModalVisible] = useState(false);

  const { mutate: uploadImage } = useUploadImage();
  const { mutate: addPet } = useAddPet();

  const healthStatusOptions = ['Healthy', 'Sick', 'Injured'];

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert(
          'Permission required',
          'We need access to your camera roll to upload photos. Please enable it in your device settings.',
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Camera roll access is required to upload an image.',
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const pickedImageUri = result.assets[0].uri;
        setImageUri(pickedImageUri);
        setUploadedImageId(null);
      }
    } catch (error) {
      console.error('Error picking the image:', error);
    }
  };

  const uploadAndSaveImage = async () => {
    if (!imageUri) {
      Alert.alert('No Image', 'Please select an image before uploading.');
      return;
    }

    try {
      const fileType = imageUri.split('.').pop();

      const imageFile = {
        uri: imageUri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      };

      uploadImage(imageFile, {
        onSuccess: (response) => {
          const imageId = response?.id;
          if (imageId) {
            setUploadedImageId(imageId);
            Alert.alert('Upload successful', `Image ID: ${imageId}`);
          }
        },
        onError: (error) => {
          console.error('Error uploading the image:', error);
        },
      });
    } catch (error) {
      console.error('Error uploading the image:', error);
    }
  };

  const submitPet = () => {
    if (!uploadedImageId) {
      Alert.alert('Error', 'Please upload an image before submitting.');
      return;
    }

    const petData = {
      ...formData,
      age: parseInt(formData.age, 10),
      image_id: uploadedImageId,
    };

    addPet(petData, {
      onSuccess: () => {
        Alert.alert('Pet added successfully');
      },
      onError: (error) => {
        console.error('Error adding pet:', error);
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }} className="bg-gray-50">
      {/* Pick Image */}
      {!imageUri && !uploadedImageId && (
        <Button title="Pick an Image" onPress={pickImage} />
      )}

      {imageUri && (
        <View className="flex items-center mt-4">
          <Image
            source={{ uri: imageUri }}
            className="w-48 h-48 rounded-lg shadow-lg border border-gray-200"
          />
        </View>
      )}

      {imageUri && !uploadedImageId && (
        <Button
          title="Upload Image"
          onPress={uploadAndSaveImage}
          className="mt-4"
        />
      )}

      <TextInput
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        className="mt-6 p-4 bg-white rounded-lg shadow border border-gray-200"
      />

      <TextInput
        placeholder="Sex"
        value={formData.sex}
        onChangeText={(text) => setFormData({ ...formData, sex: text })}
        className="mt-4 p-4 bg-white rounded-lg shadow border border-gray-200"
      />

      <TextInput
        placeholder="Species"
        value={formData.species}
        onChangeText={(text) => setFormData({ ...formData, species: text })}
        className="mt-4 p-4 bg-white rounded-lg shadow border border-gray-200"
      />

      <TextInput
        placeholder="Coat Color"
        value={formData.coatColor}
        onChangeText={(text) => setFormData({ ...formData, coatColor: text })}
        className="mt-4 p-4 bg-white rounded-lg shadow border border-gray-200"
      />

      <TextInput
        placeholder="Breed"
        value={formData.breed}
        onChangeText={(text) => setFormData({ ...formData, breed: text })}
        className="mt-4 p-4 bg-white rounded-lg shadow border border-gray-200"
      />

      <TextInput
        placeholder="Age"
        value={formData.age}
        keyboardType="numeric"
        onChangeText={(text) => setFormData({ ...formData, age: text })}
        className="mt-4 p-4 bg-white rounded-lg shadow border border-gray-200"
      />

      <View className="flex-row items-center mt-6">
        <Text className="mr-3 text-gray-700 font-medium">Vaccinated:</Text>
        <Switch
          value={formData.vaccinated}
          onValueChange={(value) =>
            setFormData({ ...formData, vaccinated: value })
          }
        />
      </View>
      <TouchableOpacity
        onPress={() => setIsHealthModalVisible(true)}
        className="mt-6"
      >
        <TextInput
          placeholder="Health Status"
          value={formData.healthStatus}
          editable={false}
          className="p-4 bg-white rounded-lg shadow border border-gray-200"
        />
      </TouchableOpacity>
      <Modal
        visible={isHealthModalVisible}
        transparent={true}
        animationType="slide"
      >
        <TouchableWithoutFeedback
          onPress={() => setIsHealthModalVisible(false)}
        >
          <View className="flex-1 justify-center bg-black/50 px-6">
            <View className="bg-white rounded-lg p-6 shadow-lg">
              <Text className="text-lg font-semibold text-gray-700 mb-4">
                Select Health Status
              </Text>
              <FlatList
                data={healthStatusOptions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setFormData({ ...formData, healthStatus: item });
                      setIsHealthModalVisible(false);
                    }}
                  >
                    <Text className="p-3 text-gray-700 hover:bg-gray-100 rounded-md">
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <TextInput
        placeholder="Description"
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
        multiline={true}
        numberOfLines={4}
        className="mt-6 p-4 bg-white rounded-lg shadow border border-gray-200"
      />

      <View className="mt-8">
        <Button title="Submit Pet" onPress={submitPet} color="#4A90E2" />
      </View>
    </ScrollView>
  );
};

export default AddPetForm;
