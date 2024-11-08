import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useGetUserDetails } from '@/hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: '',
    phoneNumber: '',
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [activeSection, setActiveSection] = useState('info'); // 'info' or 'password'

  const { profile } = useSelector((state) => state.userProfile);
  const { getUserDetailsData, isLoading, error } = useGetUserDetails(
    profile.id,
  );

  useEffect(() => {
    if (getUserDetailsData?.data) {
      const userDetails = getUserDetailsData.data;
      setFormData({
        username: userDetails.username || '',
        email: userDetails.email || '',
        address: userDetails.address || '',
        phoneNumber: userDetails.phoneNumber?.toString() || '',
      });
    }
  }, [getUserDetailsData]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', 'Failed to load user details');
    }
  }, [error]);

  const handleInputChange = (field, value) =>
    setFormData({ ...formData, [field]: value });
  const handlePasswordChange = (field, value) =>
    setPasswordData({ ...passwordData, [field]: value });

  const handlePasswordReset = () => {
    const { oldPassword, newPassword, confirmPassword } = passwordData;
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }
    if (!oldPassword || !newPassword) {
      Alert.alert('Error', 'Please fill in all password fields');
      return;
    }
    Alert.alert('Success', 'Password reset successfully');
  };

  return (
    <View className="flex-1 bg-indigo-100 p-5">
      <View className="flex items-center justify-center">
        <Ionicons name="paw-outline" size={80} color="indigo" />
        <Text className="text-4xl font-bold text-indigo-500 mt-4 mb-3">
          PawFund
        </Text>
      </View>
      <View className="flex-row justify-around mb-5">
        <TouchableOpacity
          style={{
            backgroundColor: activeSection === 'info' ? '#4f46e5' : '#c7d2fe',
            paddingVertical: 10,
            flex: 1,
          }}
          onPress={() => setActiveSection('info')}
        >
          <Text
            style={{
              color: activeSection === 'info' ? '#fff' : '#4f46e5',
              fontWeight: 'bold',
              textAlign: 'center', // Center text within the button
            }}
          >
            Info
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor:
              activeSection === 'password' ? '#4f46e5' : '#c7d2fe',
            paddingVertical: 10,
            flex: 1,
          }}
          onPress={() => setActiveSection('password')}
        >
          <Text
            style={{
              color: activeSection === 'password' ? '#fff' : '#4f46e5',
              fontWeight: 'bold',
              textAlign: 'center', // Center text within the button
            }}
          >
            Password Reset
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#4B0082" />
      ) : activeSection === 'info' ? (
        <>
          <Text className="text-lg font-bold text-indigo-700 mb-3">
            User Information
          </Text>
          <TextInput
            value={formData.username}
            onChangeText={(text) => handleInputChange('username', text)}
            placeholder="Username"
            className="border border-indigo-500 p-3 rounded-lg mb-3 bg-white text-slate-800"
          />
          <TextInput
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            placeholder="Email"
            className="border border-indigo-500 p-3 rounded-lg mb-3 bg-white text-slate-800"
          />
          <TextInput
            value={formData.address}
            onChangeText={(text) => handleInputChange('address', text)}
            placeholder="Address"
            className="border border-indigo-500 p-3 rounded-lg mb-3 bg-white text-slate-800"
          />
          <TextInput
            value={formData.phoneNumber}
            onChangeText={(text) => handleInputChange('phoneNumber', text)}
            placeholder="Phone Number"
            keyboardType="numeric"
            className="border border-indigo-500 p-3 rounded-lg mb-3 bg-white text-slate-800"
          />
        </>
      ) : (
        <>
          <Text className="text-lg font-bold text-indigo-700 mb-3">
            Password Reset
          </Text>
          <TextInput
            value={passwordData.oldPassword}
            onChangeText={(text) => handlePasswordChange('oldPassword', text)}
            placeholder="Old Password"
            secureTextEntry
            className="border border-indigo-500 p-3 rounded-lg mb-3 bg-white text-slate-800"
          />
          <TextInput
            value={passwordData.newPassword}
            onChangeText={(text) => handlePasswordChange('newPassword', text)}
            placeholder="New Password"
            secureTextEntry
            className="border border-indigo-500 p-3 rounded-lg mb-3 bg-white text-slate-800"
          />
          <TextInput
            value={passwordData.confirmPassword}
            onChangeText={(text) =>
              handlePasswordChange('confirmPassword', text)
            }
            placeholder="Confirm New Password"
            secureTextEntry
            className="border border-indigo-500 p-3 rounded-lg mb-3 bg-white text-slate-800"
          />
          <TouchableOpacity
            className="bg-indigo-700 p-4 rounded-lg mt-3"
            onPress={handlePasswordReset}
          >
            <Text className="text-white font-bold text-center">
              Reset Password
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ProfileScreen;
