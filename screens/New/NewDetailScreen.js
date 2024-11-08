
import React, { useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNewDetail } from '@/hooks/New';

const NewDetailScreen = ({ route, navigation }) => {
  const { newId } = route.params;
  const { data: news, isLoading, isError, error } = useNewDetail(newId);

  useEffect(() => {
    if (news) {
      navigation.setOptions({ title: news.name });
    }
  }, [news, navigation]);

  if (isLoading) {
    return (
      <Text className="text-center text-lg text-indigo-800 mt-5">
        Loading...
      </Text>
    );
  }

  if (isError) {
    return (
      <Text className="text-center text-lg text-red-600 mt-5">
        Error: {error.message}
      </Text>
    );
  }

  return (
    <ScrollView className="flex-1 p-5 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200">
      {/* Back Button with Icon */}
      <TouchableOpacity
        className="absolute top-12 left-5 z-10 bg-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
        onPress={() => navigation.navigate('New')}
      >
        <Ionicons name="arrow-back-outline" size={30} color="#6c63ff" />
      </TouchableOpacity>

      {/* News Details Section */}
      <View className="mt-20 bg-white p-8 rounded-2xl shadow-2xl border border-indigo-200">
        <Text className="text-4xl font-extrabold text-indigo-900 mb-4 font-poppins">
          {news?.name}
        </Text>

        <Text className="text-lg text-gray-600 mb-3 font-semibold">
          Views: <Text className="text-indigo-600">{news?.views ?? 'N/A'}</Text>
        </Text>

        <Text className="text-sm text-gray-500 mb-1 font-medium">
          Date Posted:{' '}
          {news?.datePosted
            ? new Date(news.datePosted).toLocaleString()
            : 'N/A'}
        </Text>

        <Text className="text-sm text-gray-500 mb-1 font-medium">
          Created At:{' '}
          {news?.createdAt ? new Date(news.createdAt).toLocaleString() : 'N/A'}
        </Text>

        <Text className="text-sm text-gray-500 font-medium">
          Updated At:{' '}
          {news?.updatedAt ? new Date(news.updatedAt).toLocaleString() : 'N/A'}
        </Text>
      </View>

      {/* Action Buttons Section */}
      <View className="mt-10 space-y-4">
        {/* Back to News List Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('New')}
          className="w-full bg-indigo-600 py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          <Text className="text-center text-white text-xl font-semibold font-poppins">
            <Ionicons name="list-outline" size={24} color="white" /> Back to
            News List
          </Text>
        </TouchableOpacity>

        {/* Share News Button */}
        <TouchableOpacity
          onPress={() => Alert.alert('Share this news')}
          className="w-full bg-green-600 py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          <Text className="text-center text-white text-xl font-semibold font-poppins">
            <Ionicons name="share-social-outline" size={24} color="white" />{' '}
            Share News
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewDetailScreen;
