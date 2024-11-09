import {
  useAddNew,
  useDeleteNew,
  useGetAllNews,
  useQueryNew,
  useUpdateNew,
} from '@/hooks/New';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

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
  const { profile } = useSelector((state) => state.userProfile);

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
                // console.log(`News deleted: ${selectedNews.name}`);
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
        // console.log(`News updated: ${updatedNews.name}`);
        setEditModalVisible(false);
        setModalVisible(false);
        Alert.alert('Success', 'News update successfully!', [{ text: 'OK' }]);
      },
      onError: (error) => {
        console.error('Error updating news:', error);
      },
    });
    // console.log('data', updatedNews);
  };
  const handleAdd = () => {
    const newNews = {
      name: addNews.name,
      views: Number(addNews.views),
      createdAt: new Date().toISOString(),
    };

    addNew(newNews, {
      onSuccess: () => {
        // console.log(`News added: ${addNews.name}`);
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
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-gray-600 text-lg">Loading news...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-red-500 text-lg">
          Error loading news: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold">News List</Text>
        <TouchableOpacity onPress={() => setSearchModalVisible(true)}>
          <Ionicons name="search" size={24} color="#3b82f6" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => setAddModalVisible(true)}
        className="bg-blue-500 p-2 rounded m-2"
        style={{
          display: profile.role === 'admin' ? 'flex' : 'none',
        }}
      >
        <Text className="text-white text-center font-semibold">Add News</Text>
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
            className="bg-white shadow-md rounded-lg p-4 m-2 flex flex-row items-center border border-gray-200"
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
            <View className="flex-1 justify-center items-center bg-black/60 backdrop-blur-sm">
              <View className="bg-gradient-to-r from-purple-50 via-white to-blue-50 p-8 rounded-3xl w-4/5 shadow-2xl shadow-gray-800 border border-gray-200">
                {/* Title */}
                <Text className="text-2xl font-bold text-gray-800 text-center mb-6">
                  News Options
                </Text>

                {/* View Details */}
                <TouchableOpacity
                  onPress={() => handleDetail(selectedNews._id)}
                  className="flex flex-row items-center justify-center py-3 mb-3 rounded-xl bg-blue-100 hover:bg-blue-200"
                >
                  <Text className="text-lg font-semibold text-blue-600 mr-2">
                    View Details
                  </Text>
                  <Text className="text-blue-600">👁️</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDelete}
                  className="my-2"
                  style={{
                    display: profile.role === 'admin' ? 'flex' : 'none',
                  }}
                >
                  <Text className="text-lg text-black">Delete News</Text>
                </TouchableOpacity>

                {/* Edit News */}
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
                  style={{
                    display: profile.role === 'admin' ? 'flex' : 'none',
                  }}
                >
                  <Text className="text-lg font-semibold text-green-600 mr-2">
                    Edit News
                  </Text>
                  <Text className="text-green-600">✏️</Text>
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
          <View className="flex-1 justify-center items-center bg-black/60 backdrop-blur-sm">
            <View className="bg-gradient-to-br from-gray-100 to-gray-50 p-6 rounded-3xl w-4/5 shadow-xl shadow-gray-700 border border-gray-300">
              {/* Title */}
              <Text className="text-2xl font-bold text-gray-800 text-center mb-6">
                🔍 Search News
              </Text>

              {/* Search Input */}
              <View className="flex flex-row items-center border border-gray-300 rounded-lg p-3 mb-4 bg-slate-500">
                <Text className="text-gray-800 mr-2"></Text>
                <TextInput
                  placeholder="Search News..."
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                  className="flex-1 text-lg text-gray-700"
                />
              </View>

              {/* Search Button */}
              <TouchableOpacity
                onPress={() => setSearchTerm('')}
                className="bg-blue-500 py-3 rounded-lg mb-2 flex flex-row justify-center items-center"
              >
                <Text className="text-white text-lg font-semibold mr-2">
                  Search
                </Text>
                <Text className="text-white"></Text>
              </TouchableOpacity>

              {/* Cancel Button */}
              <TouchableOpacity
                onPress={() => setSearchModalVisible(false)}
                className="mt-2"
              >
                <Text className="text-center text-blue-600 font-semibold">
                  Cancel ❌
                </Text>
              </TouchableOpacity>

              {/* Searching Indicator */}
              {isSearching && (
                <View className="mt-4 flex items-center">
                  <ActivityIndicator size="large" color="#0000ff" />
                  <Text className="text-gray-500 mt-2">
                    Searching for: {searchTerm}
                  </Text>
                </View>
              )}

              {/* Error Message */}
              {isSearchError && (
                <View className="mt-4">
                  <Text className="text-center text-red-500">
                    ⚠️ Error fetching search results.
                  </Text>
                </View>
              )}

              {/* Search Results */}
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
                      className="bg-gray-100 shadow-sm rounded-lg p-4 m-2 flex-row items-center hover:bg-gray-200"
                    >
                      <Text className="text-indigo-600 mr-2">📰</Text>
                      <Text className="text-lg font-semibold text-indigo-700">
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <View className="mt-4">
                  <Text className="text-center text-gray-500">
                    No results found 🙁
                  </Text>
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
          <View className="flex-1 justify-center items-center bg-black/80 backdrop-blur-lg">
            <View className="bg-gradient-to-br from-blue-500 to-indigo-600 p-12 rounded-3xl w-4/5 shadow-3xl shadow-gray-900 border border-gray-200">
              {/* Title */}
              <Text className="text-3xl font-extrabold text-white text-center mb-8">
                ✏️ Update News
              </Text>

              {/* Title Name */}
              <Text className="text-2xl font-semibold text-white mb-4">
                Title Name
              </Text>
              <TextInput
                placeholder="Enter News Title"
                value={editedNews.name}
                onChangeText={(text) =>
                  setEditedNews({ ...editedNews, name: text })
                }
                className="border-2 border-blue-300 rounded-lg p-4 mb-6 text-lg text-white bg-blue-400 focus:ring-4 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-300"
              />

              {/* Views */}
              <Text className="text-2xl font-semibold text-white mb-4">
                Views
              </Text>
              <TextInput
                placeholder="Enter Views"
                value={String(editedNews.views || '')}
                onChangeText={(text) => {
                  const numericValue = Number(text);
                  setEditedNews({
                    ...editedNews,
                    views: isNaN(numericValue) ? 0 : numericValue,
                  });
                }}
                className="border-2 border-blue-300 rounded-lg p-4 mb-6 text-lg text-white bg-blue-400 focus:ring-4 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-300"
                keyboardType="numeric"
              />

              {/* Update Button */}
              <TouchableOpacity
                onPress={handleEdit}
                className="bg-blue-700 py-4 rounded-lg mb-4 flex justify-center items-center shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Text className="text-white text-xl font-semibold">
                  Update News
                </Text>
              </TouchableOpacity>

              {/* Cancel Button */}
              <TouchableOpacity
                onPress={() => setEditModalVisible(false)}
                className="mt-6"
              >
                <Text className="text-center text-blue-300 font-semibold text-lg hover:text-white transition-colors duration-300">
                  Cancel ❌
                </Text>
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
          <View className="flex-1 justify-center items-center bg-black/70 backdrop-blur-lg">
            <View className="bg-gradient-to-br from-blue-500 to-indigo-600 p-12 rounded-3xl w-4/5 shadow-xl shadow-gray-800 border border-gray-300">
              {/* Title */}
              <Text className="text-3xl font-extrabold text-white text-center mb-8">
                ➕ Add News
              </Text>

              {/* Title Name */}
              <Text className="text-xl font-medium text-white mb-4">
                Title Name
              </Text>
              <TextInput
                placeholder="Enter News Title"
                value={addNews.name}
                onChangeText={(text) => setAddNews({ ...addNews, name: text })}
                className="border-2 border-blue-300 rounded-lg p-4 mb-6 text-lg text-white bg-blue-400 focus:ring-4 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-300"
              />

              {/* Views */}
              <Text className="text-xl font-medium text-white mb-4">Views</Text>
              <TextInput
                placeholder="Enter Views"
                value={String(addNews.views || '')}
                onChangeText={(text) => {
                  const numericValue = Number(text);
                  setAddNews({
                    ...addNews,
                    views: isNaN(numericValue) ? 0 : numericValue,
                  });
                }}
                className="border-2 border-blue-300 rounded-lg p-4 mb-6 text-lg text-white bg-blue-400 focus:ring-4 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-300"
                keyboardType="numeric"
              />

              {/* Add Button */}
              <TouchableOpacity
                onPress={handleAdd}
                className="bg-blue-700 py-4 rounded-lg mb-4 flex justify-center items-center shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Text className="text-white text-xl font-semibold">
                  Add News
                </Text>
              </TouchableOpacity>

              {/* Cancel Button */}
              <TouchableOpacity
                onPress={() => handleAddClose()}
                className="mt-6"
              >
                <Text className="text-center text-blue-300 font-semibold text-lg hover:text-white transition-colors duration-300">
                  Cancel ❌
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default NewListingScreen;
