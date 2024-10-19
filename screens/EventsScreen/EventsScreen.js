import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const events = [
  {
    id: '64d2e2b8f5e3e57e79d2c5f6',
    name: 'Breaking News',
    date: '2024-08-20',
    views: 1500,
  },
  {
    id: '1',
    name: 'Adoption Day',
    date: '2024-11-01',
    views: 1200,
  },
  {
    id: '2',
    name: 'Fundraiser Gala',
    date: '2024-12-15',
    views: 800,
  },
];

const EventsScreen = () => {
  const navigation = useNavigation();

  const handlePress = (event) => {
    navigation.navigate('EventDetail', { event });
  };

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handlePress(item)}
          className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 shadow-md rounded-lg p-6 m-3"
          style={{ elevation: 8 }}
        >
          <View className="flex flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-indigo-900 mb-2">
                {item.name}
              </Text>
              <Text className="text-gray-600 text-sm">Date: {item.date}</Text>
            </View>
            <View className="bg-indigo-200 p-3 rounded-full">
              <Text className="text-indigo-800 font-semibold">
                {item.views} views
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      className="bg-gray-100 p-4"
      contentContainerStyle={{ paddingBottom: 80 }}
    />
  );
};

export default EventsScreen;
