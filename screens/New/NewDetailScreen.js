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
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <ScrollView className="flex-1 p-5 bg-white">
      <TouchableOpacity
        className="absolute top-12 left-5 z-10"
        onPress={() => navigation.navigate('New')}
      >
        <Ionicons name="arrow-back" size={30} color="#6c63ff" />
      </TouchableOpacity>

      <View className="mt-20">
        <Text className="text-2xl font-bold text-indigo-800 mb-2">
          Name: {news?.name}
        </Text>
        <Text className="text-lg text-gray-600 mb-1">
          Views: {news?.views ?? 'N/A'} {/* Sử dụng ?? để hiển thị 'N/A' nếu views không có */}
        </Text>
        <Text className="text-base text-gray-500 mb-1">
          Date Posted: {news?.datePosted ? new Date(news.datePosted).toLocaleString() : 'N/A'}
        </Text>
        <Text className="text-base text-gray-500 mb-1">
          Created At: {news?.createdAt ? new Date(news.createdAt).toLocaleString() : 'N/A'}
        </Text>
        <Text className="text-base text-gray-500 mb-1">
          Updated At: {news?.updatedAt ? new Date(news.updatedAt).toLocaleString() : 'N/A'}
        </Text>
      </View>

      <Button
        title="Back to News List"
        onPress={() => navigation.navigate('New')}
        color="#6c63ff"
      />
      <View className="mt-5 mb-10">
        <Button
          title="Share News"
          onPress={() => Alert.alert('Share this news')}
          color="#34D399"
        />
      </View>
    </ScrollView>
  );
};

export default NewDetailScreen;
