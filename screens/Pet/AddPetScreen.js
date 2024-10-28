import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddPetForm = () => {
  const [imageUri, setImageUri] = useState(null); // For displaying the image
  const [hasPermission, setHasPermission] = useState(null); // To track permission status

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

  const pickImage = async () => {
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Camera roll access is required to upload an image.',
      );
      return;
    }

    try {
      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.uri) {
        setImageUri(result.uri); // Set the image URI for preview
      } else {
        console.log('Image picking was canceled.');
      }
    } catch (error) {
      console.error('Error picking the image:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Add a Pet</Text>
      <TextInput
        placeholder="Pet Name"
        style={{
          borderBottomWidth: 1,
          borderColor: '#ccc',
          marginBottom: 10,
          padding: 8,
        }}
      />
      <Button title="Pick an Image" onPress={pickImage} />
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, marginVertical: 10 }}
        />
      )}
    </View>
  );
};

export default AddPetForm;
