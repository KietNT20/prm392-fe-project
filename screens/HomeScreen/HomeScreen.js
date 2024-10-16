import React from 'react';
import { View, Text, Button, ScrollView, Alert } from 'react-native';
import storageMethod from '../../utils/storageMethod'; // Assuming you have this file for managing local storage

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      // Remove the token from storage
      await storageMethod.remove();

      // Navigate back to the Login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });

      Alert.alert('Success', 'You have been logged out.');
    } catch (error) {
      console.log('Logout Error:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 justify-center items-center px-5">
        <Text className="text-2xl font-bold mb-4">Welcome to PawFund!</Text>
        <Button
          title="View Pet Listings"
          onPress={() => navigation.navigate('PetListings')}
        />
        <Button
          title="Donate"
          onPress={() => navigation.navigate('Donation')}
        />
        <Button title="Events" onPress={() => navigation.navigate('Events')} />
        <Button
          title="Profile"
          onPress={() => navigation.navigate('UserProfile')}
        />
        <Button
          title="Logout"
          onPress={handleLogout}
          color="#FF6347" // Red color to indicate logout
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
