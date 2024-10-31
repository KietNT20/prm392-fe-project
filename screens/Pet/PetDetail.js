import React from 'react';
import { View, Text, Button, Image, Alert } from 'react-native';

const PetDetailScreen = ({ route, navigation }) => {
  const { pet } = route.params;

  return (
    <View className="flex-1 p-5 bg-white">
      <Image
        source={{ uri: pet.image_id }}
        className="w-full h-64 rounded-lg mb-5"
        resizeMode="cover"
      />
      <Text className="text-2xl font-bold text-indigo-800 mb-2">
        {pet.name}
      </Text>
      <Text className="text-lg text-gray-600 mb-1">{pet.breed}</Text>
      <Text className="text-base text-gray-500 mb-1">Sex: {pet.sex}</Text>
      <Text className="text-base text-gray-500 mb-1">
        Vaccinated: {pet.vaccinated ? 'Yes' : 'No'}
      </Text>
      <Text className="text-base text-gray-500 mb-3">
        Health Status: {pet.healthStatus}
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
