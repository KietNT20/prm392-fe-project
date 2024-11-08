import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  useGetUserDetails,
  useLogout,
  useUpdateUserInfo,
} from '@/hooks/useAuth';

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
  const [passwordVisible, setPasswordVisible] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [activeSection, setActiveSection] = useState('info');

  const { profile } = useSelector((state) => state.userProfile);
  const { getUserDetailsData, isLoading, error } = useGetUserDetails(
    profile?.id,
  );
  const updateUserMutation = useUpdateUserInfo();
  const { logout } = useLogout();

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

  const handleUpdateUserInfo = () => {
    updateUserMutation.mutate(
      { userId: profile.id, updatedUserData: formData },
      {
        onSuccess: () => {
          Alert.alert('Success', 'User information updated successfully');
        },
        onError: (error) => {
          Alert.alert(
            'Error',
            error.message || 'Failed to update user information',
          );
        },
      },
    );
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisible((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: logout,
      },
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-indigo-100 p-5">
      <View className="flex items-center justify-center">
        <Ionicons name="paw-outline" size={80} color="indigo" />
        <Text className="text-4xl font-bold text-indigo-500 mt-4 mb-3">
          PawFund
        </Text>
      </View>
      <Text className="text-2xl  font-bold text-indigo-700 mb-3">
        {profile?.role}
      </Text>
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
              textAlign: 'center',
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
              textAlign: 'center',
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
          <TouchableOpacity
            onPress={handleUpdateUserInfo}
            style={{
              backgroundColor: '#4f46e5',
              paddingVertical: 12,
              borderRadius: 8,
              marginTop: 10,
            }}
            disabled={updateUserMutation.isLoading}
          >
            <Text
              style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}
            >
              {updateUserMutation.isLoading ? 'Updating...' : 'Update Info'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        // Your Password Reset Section remains here
        <>
          <Text className="text-lg font-bold text-indigo-700 mb-3">
            Password Reset
          </Text>

          {/* Old Password Field */}
          <View className="relative">
            <TextInput
              value={passwordData.oldPassword}
              onChangeText={(text) => handlePasswordChange('oldPassword', text)}
              placeholder="Old Password"
              secureTextEntry={!passwordVisible.oldPassword}
              className="border border-indigo-500 p-3 rounded-lg mb-3 bg-white text-slate-800"
            />
            <TouchableOpacity
              onPress={() => togglePasswordVisibility('oldPassword')}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: [{ translateY: -12 }],
              }}
            >
              <Ionicons
                name={passwordVisible.oldPassword ? 'eye-off' : 'eye'}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          {/* New Password Field */}
          <View className="relative">
            <TextInput
              value={passwordData.newPassword}
              onChangeText={(text) => handlePasswordChange('newPassword', text)}
              placeholder="New Password"
              secureTextEntry={!passwordVisible.newPassword}
              className="border border-indigo-500 p-3 rounded-lg mb-3 bg-white text-slate-800"
            />
            <TouchableOpacity
              onPress={() => togglePasswordVisibility('newPassword')}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: [{ translateY: -12 }],
              }}
            >
              <Ionicons
                name={passwordVisible.newPassword ? 'eye-off' : 'eye'}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm New Password Field */}
          <View className="relative">
            <TextInput
              value={passwordData.confirmPassword}
              onChangeText={(text) =>
                handlePasswordChange('confirmPassword', text)
              }
              placeholder="Confirm New Password"
              secureTextEntry={!passwordVisible.confirmPassword}
              className="border border-indigo-500 p-3 rounded-lg mb-3 bg-white text-slate-800"
            />
            <TouchableOpacity
              onPress={() => togglePasswordVisibility('confirmPassword')}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: [{ translateY: -12 }],
              }}
            >
              <Ionicons
                name={passwordVisible.confirmPassword ? 'eye-off' : 'eye'}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          {/* Reset Password Button */}
          <TouchableOpacity
            className="bg-indigo-700 p-4 rounded-lg mt-3"
            onPress={handleUpdateUserInfo}
          >
            <Text className="text-white font-bold text-center">
              Reset Password
            </Text>
          </TouchableOpacity>
        </>
      )}
      <View className="mt-3">
        <TouchableOpacity
          className="bg-indigo-300 p-4 rounded-lg"
          onPress={handleLogout}
        >
          <Text className="text-white text-center font-bold">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
