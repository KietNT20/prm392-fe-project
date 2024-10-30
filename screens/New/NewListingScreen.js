import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  useGetAllNews,
  useDeleteNew,
  useUpdateNew,
  useAddNew,
} from '@/hooks/New';
import { useQueryNew } from '@/hooks/New';

const NewListingScreen = ({ navigation }) => {
  const [selectedNews, setSelectedNews] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false); // Modal cho cập nhật
  const [editedNews, setEditedNews] = useState({
    name: '',
    date: '',
    views: '',
  }); // State cho dữ liệu chỉnh sửa
  const [addNews, setAddNews] = useState({
    name: '',
    views: '',
  });
  const { news, isLoading, isError, error } = useGetAllNews();
  const { mutate: deleteNew } = useDeleteNew();
  const { mutate: updateNew } = useUpdateNew(); // Hook cập nhật mới
  const { mutate: addNew } = useAddNew();

  const handleAddClose = () => {
    setAddNews({ name: '', views: '' }); // Reset form
    setAddModalVisible(false);
  };
  // Sử dụng hook tìm kiếm
  const {
    news: searchResults,
    isLoading: isSearching,
    isError: isSearchError,
  } = useQueryNew(searchTerm);

  const handleDetail = (newId) => {
    setModalVisible(false);
    navigation.navigate('NewDetail', { newId });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete News',
      `Are you sure you want to delete ${selectedNews.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteNew(selectedNews._id, {
              onSuccess: () => {
                console.log(`News deleted: ${selectedNews.name}`);
                setModalVisible(false);
              },
              onError: (error) => {
                console.error('Error deleting news:', error);
              },
            });
          },
        },
      ],
    );
  };
  const handleEdit = () => {
    if (!selectedNews) return;

    const updatedNews = {
      id: selectedNews._id,
      name: editedNews.name,
      date: new Date().toISOString(),
      views: Number(editedNews.views),
    };

    updateNew(updatedNews, {
      onSuccess: () => {
        console.log(`News updated: ${updatedNews.name}`);
        setEditModalVisible(false);
        setModalVisible(false);
        Alert.alert('Success', 'News update successfully!', [{ text: 'OK' }]);
      },
      onError: (error) => {
        console.error('Error updating news:', error);
      },
    });
    console.log('data', updatedNews);
  };
  const handleAdd = () => {
    const newNews = {
      name: addNews.name,
      views: Number(addNews.views),
      createdAt: new Date().toISOString(),
    };

    addNew(newNews, {
      onSuccess: () => {
        console.log(`News added: ${addNews.name}`);
        setAddModalVisible(false);
        setAddNews({ name: '', views: '' }); // Reset form
        Alert.alert('Success', 'News added successfully!', [{ text: 'OK' }]);
      },
      onError: (error) => {
        console.error('Error adding news:', error);
      },
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading news...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error loading news: {error.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-bold">News List</Text>
        <TouchableOpacity onPress={() => setSearchModalVisible(true)}>
          <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => setAddModalVisible(true)}
        className="bg-blue-500 p-2 rounded m-2"
      >
        <Text className="text-white text-center">Add News</Text>
      </TouchableOpacity>
      <FlatList
        data={news}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedNews(item);
              setModalVisible(true);
            }}
            className="bg-white shadow-md rounded-lg p-4 m-2 flex flex-row items-center"
          >
            <View className="ml-4 flex-1">
              <Text className="text-lg font-bold text-indigo-700">
                {item.name}
              </Text>
              <Text className="text-sm text-gray-600">
                {new Date(item.datePosted).toLocaleDateString()}
              </Text>
              <Text className="text-sm text-gray-600">Views: {item.views}</Text>
            </View>
            <Ionicons name="ellipsis-vertical" size={24} color="#000" />
          </TouchableOpacity>
        )}
      />

      {selectedNews && (
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              <View className="bg-white p-6 rounded-lg w-4/5">
                <TouchableOpacity
                  onPress={() => handleDetail(selectedNews._id)}
                  className="my-2"
                >
                  <Text className="text-lg text-black">View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete} className="my-2">
                  <Text className="text-lg text-black">Delete News</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setEditedNews({
                      name: selectedNews.name,
                      views: selectedNews.views,
                    });
                    setEditModalVisible(true);
                    setModalVisible(false);
                  }}
                  className="my-2"
                >
                  <Text className="text-lg text-black">Edit News</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      {/* Search Modal */}
      <Modal
        transparent={true}
        visible={searchModalVisible}
        animationType="slide"
        onRequestClose={() => setSearchModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setSearchModalVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <View className="bg-white p-6 rounded-lg w-4/5">
              <TextInput
                placeholder="Search News..."
                value={searchTerm}
                onChangeText={setSearchTerm}
                className="border border-gray-300 rounded p-2 mb-4"
              />
              <TouchableOpacity
                onPress={() => setSearchTerm('')}
                className="bg-blue-500 p-2 rounded"
              >
                <Text className="text-white text-center">Search</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSearchModalVisible(false)}
                className="mt-4"
              >
                <Text className="text-center text-blue-500">Cancel</Text>
              </TouchableOpacity>

              {/* Hiển thị kết quả tìm kiếm */}
              {isSearching && (
                <View className="mt-4">
                  <ActivityIndicator size="large" color="#0000ff" />
                  <Text>Searching for: {searchTerm}</Text>
                </View>
              )}

              {isSearchError && (
                <View className="mt-4">
                  <Text>Error fetching search results.</Text>
                </View>
              )}

              {searchResults && searchResults.length > 0 ? (
                <FlatList
                  data={searchResults}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedNews(item);
                        setModalVisible(true);
                      }}
                      className="bg-white shadow-md rounded-lg p-4 m-2"
                    >
                      <Text className="text-lg font-bold text-indigo-700">
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <View className="mt-4">
                  <Text className="text-center">No results found</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* // edit modal */}
      <Modal
        transparent={true}
        visible={editModalVisible}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setEditModalVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <View className="bg-white p-6 rounded-lg w-4/5">
              <Text className="text-lg font-bold text-center mb-4">
                Update News
              </Text>
              <Text className="text-black mb-1 font-bold">Title Name</Text>
              <TextInput
                placeholder="News Name"
                value={editedNews.name}
                onChangeText={(text) =>
                  setEditedNews({ ...editedNews, name: text })
                }
                className="border border-gray-300 rounded p-2 mb-4"
              />
              <Text className="text-black mb-1 font-bold">Views</Text>
              <TextInput
                placeholder="Views"
                value={String(editedNews.views || '')}
                onChangeText={(text) => {
                  const numericValue = Number(text);
                  setEditedNews({
                    ...editedNews,
                    views: isNaN(numericValue) ? 0 : numericValue,
                  }); // Cập nhật nếu là số
                }}
                className="border border-gray-300 rounded p-2 mb-4"
                keyboardType="numeric"
              />
              <TouchableOpacity
                onPress={handleEdit}
                className="bg-blue-500 p-2 rounded"
              >
                <Text className="text-white text-center">Update News</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setEditModalVisible(false)}
                className="mt-4"
              >
                <Text className="text-center text-blue-500">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* add modal */}
      <Modal
        transparent={true}
        visible={addModalVisible}
        animationType="slide"
        onRequestClose={() => handleAddClose()}
      >
        <TouchableWithoutFeedback onPress={() => handleAddClose()}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <View className="bg-white p-6 rounded-lg w-4/5">
              <Text className="text-lg font-bold text-center mb-4">
                Add News
              </Text>
              <Text className="text-black mb-1 font-bold">Title Name</Text>
              <TextInput
                placeholder="News Name"
                value={addNews.name}
                onChangeText={(text) => setAddNews({ ...addNews, name: text })}
                className="border border-gray-300 rounded p-2 mb-4"
              />
              <Text className="text-black mb-1 font-bold">Views</Text>
              <TextInput
                placeholder="Views"
                value={String(addNews.views || '')}
                onChangeText={(text) => {
                  const numericValue = Number(text);
                  setAddNews({
                    ...addNews,
                    views: isNaN(numericValue) ? 0 : numericValue,
                  });
                }}
                className="border border-gray-300 rounded p-2 mb-4"
                keyboardType="numeric"
              />
              <TouchableOpacity
                onPress={handleAdd}
                className="bg-blue-500 p-2 rounded"
              >
                <Text className="text-white text-center">Add News</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleAddClose()}
                className="mt-4"
              >
                <Text className="text-center text-blue-500">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default NewListingScreen;
