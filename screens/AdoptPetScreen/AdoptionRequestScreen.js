import React, { useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Modal,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  useGetAllAdoptionRequests,
  useUpdateAdoptionRequestStatus,
} from '@/hooks/AdoptionRequest';

const AdoptionRequestsScreen = () => {
  const { adoptionRequests, isLoading, error } = useGetAllAdoptionRequests();
  const {
    mutate: updateStatus,
    isLoading: isUpdating,
    error: updateError,
  } = useUpdateAdoptionRequestStatus();

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#4f46e5" className="mt-10" />;
  }

  if (error) {
    return (
      <Text className="text-red-500 text-center mt-5">
        Error loading adoption requests.
      </Text>
    );
  }

  const handleStatusChange = () => {
    if (selectedRequestId && selectedStatus) {
      // Show an alert to confirm status change
      Alert.alert(
        'Confirm Status Change',
        `Are you sure you want to change the status to ${selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}?`,
        [
          {
            text: 'Cancel',
            onPress: () => setModalVisible(false), // Close modal if canceled
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              // If confirmed, update the status
              updateStatus(
                { id: selectedRequestId, status: selectedStatus },
                {
                  onSuccess: () => {
                    setModalVisible(false); // Close the modal after the update
                  },
                },
              );
            },
          },
        ],
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600';
      case 'rejected':
        return 'text-red-600';
      case 'done':
        return 'text-green-600';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <View className="flex-1">
      <FlatList
        data={adoptionRequests?.data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View className="p-5 m-3 bg-white rounded-lg border border-gray-300 shadow-lg">
            <Text className="text-lg font-semibold text-gray-800 mb-1">
              Name:{' '}
              <Text className="font-normal text-gray-600">{item.name}</Text>
            </Text>
            <Text className="text-gray-700 mb-1">Address: {item.address}</Text>
            <Text className="text-gray-700 mb-1">
              Phone: {item.phoneNumber}
            </Text>
            <Text className="text-gray-700 mb-1">CCCD: {item.cccd}</Text>

            <Text
              className={`text-md mt-3 font-medium ${getStatusColor(item.status)}`}
            >
              Status:{' '}
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>

            <TouchableOpacity
              onPress={() => {
                setSelectedRequestId(item._id);
                setModalVisible(true);
              }}
              className="mt-3 bg-blue-500 p-2 rounded-md text-white text-center"
            >
              <Text>Change Status</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-800 bg-opacity-50">
          <View className="bg-white p-5 rounded-lg w-3/4">
            <Text className="text-xl font-semibold mb-4">Change Status</Text>

            <View className="mb-4">
              {['done', 'pending', 'rejected'].map((status) => (
                <TouchableOpacity
                  key={status}
                  onPress={() => setSelectedStatus(status)}
                  className={`mb-2 p-2 rounded border border-gray-300 ${
                    selectedStatus === status
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-black'
                  }`}
                >
                  <Text className="text-lg">
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Button title="Confirm" onPress={handleStatusChange} />
            <Button
              title="Cancel"
              onPress={() => setModalVisible(false)}
              color="gray"
              className="mt-3"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AdoptionRequestsScreen;
