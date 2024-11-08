import { useAddPet, useUploadImage } from '@/hooks/Pet';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
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
  const [imageUri, setImageUri] = useState(null); // For displaying the image
  const [uploadedImageId, setUploadedImageId] = useState(null); // To hold the uploaded image ID
  const [hasPermission, setHasPermission] = useState(null); // To track permission status
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
  const [isHealthModalVisible, setIsHealthModalVisible] = useState(false); // For health status modal

  const { mutate: uploadImage } = useUploadImage();
  const { mutate: addPet } = useAddPet();

  const healthStatusOptions = ['Healthy', 'Sick', 'Injured']; // Health status options

  // Request media library permissions on component mount
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

  // Pick an image from the user's device
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
        setUploadedImageId(null); // Reset uploaded image ID when a new image is picked
      } else {
        console.log('Image picking was canceled.');
      }
    } catch (error) {
      console.error('Error picking the image:', error);
    }
  };

  // Upload the selected image
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

  // Submit the pet details with the uploaded image ID
  const submitPet = () => {
    if (!uploadedImageId) {
      Alert.alert('Error', 'Please upload an image before submitting.');
      return;
    }

    const petData = {
      ...formData,
      age: parseInt(formData.age, 10), // Ensure age is a number
      image_id: uploadedImageId, // Pass the uploaded image ID
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

  // Render the form inputs
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {/* Pick Image */}
      {!imageUri && !uploadedImageId && (
        <Button title="Pick an Image" onPress={pickImage} />
      )}

      {/* Display picked image */}
      {imageUri && (
        <>
          <Image
            source={{ uri: imageUri }}
            style={{ width: 200, height: 200, marginVertical: 10 }}
          />
        </>
      )}

      {/* Upload Image */}
      {imageUri && !uploadedImageId && (
        <Button title="Upload Image" onPress={uploadAndSaveImage} />
      )}

      {/* Form Inputs */}
      <TextInput
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        style={{
          marginVertical: 10,
          padding: 10,
          borderColor: 'gray',
          borderWidth: 1,
        }}
      />

      <TextInput
        placeholder="Sex"
        value={formData.sex}
        onChangeText={(text) => setFormData({ ...formData, sex: text })}
        style={{
          marginVertical: 10,
          padding: 10,
          borderColor: 'gray',
          borderWidth: 1,
        }}
      />

      <TextInput
        placeholder="Species"
        value={formData.species}
        onChangeText={(text) => setFormData({ ...formData, species: text })}
        style={{
          marginVertical: 10,
          padding: 10,
          borderColor: 'gray',
          borderWidth: 1,
        }}
      />

      <TextInput
        placeholder="Coat Color"
        value={formData.coatColor}
        onChangeText={(text) => setFormData({ ...formData, coatColor: text })}
        style={{
          marginVertical: 10,
          padding: 10,
          borderColor: 'gray',
          borderWidth: 1,
        }}
      />

      <TextInput
        placeholder="Breed"
        value={formData.breed}
        onChangeText={(text) => setFormData({ ...formData, breed: text })}
        style={{
          marginVertical: 10,
          padding: 10,
          borderColor: 'gray',
          borderWidth: 1,
        }}
      />

      {/* Numeric input for Age */}
      <TextInput
        placeholder="Age"
        value={formData.age}
        keyboardType="numeric"
        onChangeText={(text) => setFormData({ ...formData, age: text })}
        style={{
          marginVertical: 10,
          padding: 10,
          borderColor: 'gray',
          borderWidth: 1,
        }}
      />

      {/* Vaccinated Switch */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}
      >
        <Text>Vaccinated: </Text>
        <Switch
          value={formData.vaccinated}
          onValueChange={(value) =>
            setFormData({ ...formData, vaccinated: value })
          }
        />
      </View>

      {/* Health Status (Modal Dropdown) */}
      <TouchableOpacity onPress={() => setIsHealthModalVisible(true)}>
        <TextInput
          placeholder="Health Status"
          value={formData.healthStatus}
          editable={false} // Disable direct text input
          style={{
            marginVertical: 10,
            padding: 10,
            borderColor: 'gray',
            borderWidth: 1,
          }}
        />
      </TouchableOpacity>

      {/* Modal for Health Status Options */}
      <Modal
        visible={isHealthModalVisible}
        transparent={true}
        animationType="slide"
      >
        <TouchableWithoutFeedback
          onPress={() => setIsHealthModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                margin: 20,
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Text>Select Health Status</Text>
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
                    <Text style={{ padding: 10 }}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Description */}
      <TextInput
        placeholder="Description"
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
        multiline={true}
        numberOfLines={4}
        style={{
          marginVertical: 10,
          padding: 10,
          borderColor: 'gray',
          borderWidth: 1,
        }}
      />

      {/* Show "Submit Pet" button after the image is uploaded */}
      <Button title="Submit Pet" onPress={submitPet} />
    </ScrollView>
  );
};

export default AddPetForm;
