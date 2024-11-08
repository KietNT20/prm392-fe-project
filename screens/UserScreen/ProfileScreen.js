import React, { useState, useCallback } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import storageMethod from 'utils/storageMethod';
import { authServices } from 'services/authServices';

const ProfileScreen = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: '',
    phoneNumber: '',
  });

  const fetchUserData = async () => {
    try {
      const token = await storageMethod.get().token; // Retrieve token from storage
      const storedUserId = await storageMethod.get('userId'); // Retrieve userId object from storage
      const userId = storedUserId.userId || storedUserId; // Get the userId from object or as a direct string

      console.log('Token retrieved:', token); // Log token correctly
      console.log('User ID retrieved:', userId); // Log userId correctly

      if (token && userId) {
        // Fetch user data using the userId and token
        const response = await authServices.fetchUserData(userId, token);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          address: response.data.address,
          phoneNumber: response.data.phoneNumber.toString(),
        });
      } else {
        console.log('Token or userId is missing!');
        Alert.alert('Error', 'Token or User ID is missing.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Could not fetch user data.');
    }
  };

  // Use useFocusEffect to refetch data whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, []),
  );

  const handleInputChange = (field, value) =>
    setFormData({ ...formData, [field]: value });

  return (
    <View className="flex-1 bg-indigo-100 p-6">
      <TextInput
        value={formData.username}
        onChangeText={(text) => handleInputChange('username', text)}
        className="border border-indigo-400 p-2 rounded mb-3"
      />
      <TextInput
        value={formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
        className="border border-indigo-400 p-2 rounded mb-3"
      />
      {/* Additional fields */}
    </View>
  );
};

export default ProfileScreen;
